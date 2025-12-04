import Attendance from "../model/attendance.model";
import { AppError } from "../../../utils/AppError";
import dayjs from "dayjs";
import mongoose from "mongoose";
import {StudentModel} from '../../academic/model/student.model'

interface AttendanceInput {
  school_id: string;
  class_id: string;
  teacher_id: string;
  date: string;
  records: { student_id: string; status: string }[];
}

export const markAttendanceService = async (data: AttendanceInput) => {
  // Normalize date to midnight to avoid time mismatches
  const attendanceDate = new Date(data.date);
  attendanceDate.setHours(0, 0, 0, 0);

  // Upsert: Update if exists, Create if new
  const attendance = await Attendance.findOneAndUpdate(
    { 
      school_id: data.school_id,
      class_id: data.class_id,
      date: attendanceDate
    },
    {
      $set: {
        recorded_by: data.teacher_id,
        records: data.records
      }
    },
    { new: true, upsert: true, runValidators: true }
  );

  return attendance;
};

export const getAttendanceByClassService = async (schoolId: string, classId: string, date?: string) => {
  const query: any = { school_id: schoolId, class_id: classId };

  if (date) {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    query.date = targetDate;
  }

  return await Attendance.findOne(query).populate("records.student_id", "name admission_no");
};


export const getAttendanceAnalyticsService = async (schoolId: string, query: any) => {
  const { class_id, timeRange, startDate, endDate } = query;

  // 1. Determine Date Range
  let start = dayjs().startOf('day');
  let end = dayjs().endOf('day');

  switch (timeRange) {
    case 'today':
      // Defaults are already set to today
      break;
    case 'week':
      start = dayjs().subtract(7, 'day').startOf('day');
      break;
    case 'month':
      start = dayjs().subtract(30, 'day').startOf('day');
      break;
    case '3months':
      start = dayjs().subtract(3, 'month').startOf('day');
      break;
    case '6months':
      start = dayjs().subtract(6, 'month').startOf('day');
      break;
    case 'year':
      start = dayjs().subtract(1, 'year').startOf('day');
      break;
    case 'specific':
      if (startDate && endDate) {
        start = dayjs(startDate).startOf('day');
        end = dayjs(endDate).endOf('day');
      }
      break;
  }

  // 2. Build Match Filter
  const matchStage: any = {
    school_id: new mongoose.Types.ObjectId(schoolId),
    date: { $gte: start.toDate(), $lte: end.toDate() }
  };

  if (class_id && class_id !== 'all') {
    matchStage.class_id = new mongoose.Types.ObjectId(class_id);
  }

  // 3. Run Aggregation Pipeline
  const result = await Attendance.aggregate([
    { $match: matchStage },
    {
      $facet: {
        // --- A. Chart Data (Group by Date) ---
        chartData: [
          { $unwind: "$records" },
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              present: { $sum: { $cond: [{ $eq: ["$records.status", "PRESENT"] }, 1, 0] } },
              absent: { $sum: { $cond: [{ $eq: ["$records.status", "ABSENT"] }, 1, 0] } },
              late: { $sum: { $cond: [{ $eq: ["$records.status", "LATE"] }, 1, 0] } },
              total: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } } // Sort by date ascending
        ],

        // --- B. Student Performance (Group by Student) ---
        studentStats: [
          { $unwind: "$records" },
          {
            $group: {
              _id: "$records.student_id",
              daysPresent: { $sum: { $cond: [{ $eq: ["$records.status", "PRESENT"] }, 1, 0] } },
              daysAbsent: { $sum: { $cond: [{ $eq: ["$records.status", "ABSENT"] }, 1, 0] } },
              daysLate: { $sum: { $cond: [{ $eq: ["$records.status", "LATE"] }, 1, 0] } },
              totalDays: { $sum: 1 }
            }
          },
          {
            $addFields: {
              attendanceRate: {
                $multiply: [{ $divide: ["$daysPresent", "$totalDays"] }, 100]
              }
            }
          },
          // Only get students with low attendance (< 85%) to optimize payload
          { $match: { attendanceRate: { $lt: 85 } } },
          { $sort: { attendanceRate: 1 } }, // Worst attendance first
          { $limit: 20 } // Top 20 worst offenders
        ]
      }
    }
  ]);

  const data = result[0];

  // 4. Populate Student Details for the breakdown list
  // (Aggregation $lookup is complex, simpler to populate manually here since list is small)
  await StudentModel.populate(data.studentStats, { path: "_id", select: "name avatar" });

  // 5. Format Data for Frontend
  const chartData = data.chartData.map((d: any) => ({
    date: d._id,
    label: dayjs(d._id).format("MMM D"),
    present: d.present,
    absent: d.absent,
    late: d.late,
    total: d.total
  }));

  const students = data.studentStats.map((s: any) => ({
    id: s._id._id,
    name: s._id.name,
    avatar: s._id.avatar || "",
    attendanceRate: Math.round(s.attendanceRate),
    daysPresent: s.daysPresent,
    daysAbsent: s.daysAbsent,
    daysLate: s.daysLate,
    status: s.attendanceRate < 75 ? 'critical' : 'warning'
  }));

  // 6. Calculate Global Metrics
  const totalPresent = data.chartData.reduce((acc: number, curr: any) => acc + curr.present, 0);
  const totalLate = data.chartData.reduce((acc: number, curr: any) => acc + curr.late, 0);
  const totalAbsent = data.chartData.reduce((acc: number, curr: any) => acc + curr.absent, 0);
  const grandTotal = data.chartData.reduce((acc: number, curr: any) => acc + curr.total, 0);
  
  const avgAttendance = grandTotal > 0 
    ? Math.round(((totalPresent + totalLate) / grandTotal) * 100) 
    : 0;

  return {
    chartData,
    students,
    metrics: {
      avgAttendance,
      totalLate,
      totalAbsent,
      totalPresent
    }
  };
};