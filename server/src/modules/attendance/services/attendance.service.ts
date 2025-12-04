import Attendance from "../model/attendance.model";
import { AppError } from "../../../utils/AppError";

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