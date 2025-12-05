import { AppError } from "../../../utils/AppError";
import { ClassModel } from "../../academic/model/class.model";
import Activity from "../model/activity.model";
import Attendance from "../../attendance/model/attendance.model";
import dayjs from "dayjs";

interface CreateActivityInput {
  school_id: string;
  teacher_id: string;
  class_id: string;
  student_ids: string[];
  type: string;
  data: any;
  date?: string;
}

export const batchCreateActivityService = async (input: CreateActivityInput) => {
  // Prepare array of documents
  const activities = input.student_ids.map((studentId) => ({
    school_id: input.school_id,
    teacher_id: input.teacher_id,
    class_id: input.class_id,
    student_id: studentId,
    type: input.type,
    data: input.data,
    date: input.date || new Date(),
  }));

  // Insert all at once (Efficient)
  const result = await Activity.insertMany(activities);
  
  return result;
};

export const getStudentFeedService = async (studentId: string, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  
  
  const feed = await Activity.find({ student_id: studentId })
    .populate("teacher_id", "name") // Show teacher name
    .sort({ date: -1, createdAt: -1 }) // Newest first
    .skip(skip)
    .limit(limit);


  const total = await Activity.countDocuments({ student_id: studentId });

  return { 
    feed, 
    total, 
    page,
    totalPages: Math.ceil(total / limit) 
  };
};




export const getClassHistoryService = async (user: any, query: any) => {
    
  // 1. Resolve Class ID (Same as before)
  let classId = query.class_id;
  if (user.role === "TEACHER") {
    const teacherClass = await ClassModel.findOne({ teacher_id: user.id });
    if (!teacherClass) throw new AppError("You are not assigned to any class.", 400);
    classId = teacherClass._id;
  }
  if (!classId && user.role === "SCHOOL_ADMIN") {
    throw new AppError("Class ID is required.", 400);
  }

  // 2. Build Filter
  const filter: any = {
    school_id: user.school_id,
    class_id: classId,
  };

  // Date Filter
  if (query.date) {
    const startOfDay = dayjs(query.date).startOf("day").toDate();
    const endOfDay = dayjs(query.date).endOf("day").toDate();
    filter.date = { $gte: startOfDay, $lte: endOfDay };
  }

  // Student Filter
  if (query.student_id && query.student_id !== "all") {
    filter.student_id = query.student_id;
  }

  // 3. ✅ UPDATED: Activity Type Filter (Support ALL Types)
  if (query.type && query.type !== "all") {
    const typeMapping: Record<string, string[]> = {
      // Basic
      meals: ["MEAL", "DRINK"],
      naps: ["NAP"],
      photos: ["PHOTO"],
      
      // Added New Types
      hygiene: ["HYGIENE"],    // Maps to 'hygiene' chip
      learning: ["LEARNING"],  // Maps to 'learning' chip
      notes: ["NOTE"],         // Maps to 'notes' chip
    };

    // If the query matches a key (e.g., 'learning'), use the array
    if (typeMapping[query.type]) {
      filter.type = { $in: typeMapping[query.type] };
    } else {
      // Fallback: If they sent a raw ENUM like "MEAL" directly
      filter.type = query.type;
    }
  }

  // 4. Execute Query
  const activities = await Activity.find(filter)
    .populate("student_id", "name avatar gender")
    .populate("teacher_id", "name")
    .sort({ createdAt: -1 });

  return activities;
};



export const getTodayOverviewService = async (studentId: string, schoolId: string) => {
    const startOfDay = dayjs().startOf('day').toDate();
    const endOfDay = dayjs().endOf('day').toDate();

    // 1. Get Attendance Status (Latest Check-in/out for the day)
    const attendanceRecord = await Attendance.findOne({
        school_id: schoolId,
        "records.student_id": studentId,
        date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: -1 }).lean(); 

    const studentAttendance = attendanceRecord?.records.find((r: any) => r.student_id.toString() === studentId);
    
    // 2. Get Latest Activity
    const latestActivity = await Activity.findOne({
        school_id: schoolId,
        student_id: studentId,
        date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: -1 }).lean(); // Get the newest one

    // 3. Synthesize Result
    return {
        checkInTime: studentAttendance ? dayjs(attendanceRecord!.createdAt).format('h:mm A') : 'N/A',
        attendanceStatus: studentAttendance?.status?.toLowerCase() || 'absent',
        currentActivity: latestActivity?.data?.title || latestActivity?.type || 'Free Play',
        nextActivity: "Lunch Time", // MOCK
        nextActivityTime: "12:00 PM", // MOCK
        mood: "Happy", // MOCK
        temperature: "98.6°F", // MOCK
    };
};