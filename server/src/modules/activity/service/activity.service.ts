import Activity from "../model/activity.model";

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