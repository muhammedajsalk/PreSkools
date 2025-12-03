import { ClassModel } from "../model/class.model";
import { StudentModel } from "../model/student.model";
import { AppError } from "../../../utils/AppError";
import mongoose from "mongoose";
import User from "../../auth/model/user.model";


export const createStudentService = async (schoolId: string, data: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const classObj = await ClassModel.findOne({ _id: data.class_id, school_id: schoolId }).session(session);
    if (!classObj) throw new AppError("Invalid Class ID", 400);

    const exists = await StudentModel.findOne({ admission_no: data.admission_no, school_id: schoolId }).session(session);
    if (exists) throw new AppError("Admission number already exists", 400);

    let parentUser = await User.findOne({ phone: data.parent_phone }).session(session);

    if (!parentUser) {
      const [newParent] = await User.create([{
        name: data.parent_name,
        phone: data.parent_phone,
        role: "PARENT",
        school_id: schoolId,
        firebase_uid: undefined,
        isActive: false,
      }], { session });
      
      parentUser = newParent;
    } else {
      
    }

    const [newStudent] = await StudentModel.create([{
      ...data,
      school_id: schoolId,
      parent_ids: [parentUser._id],
    }], { session });

    await session.commitTransaction();
    return newStudent;

  } catch (error) {

    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getAllStudentsService = async (schoolId: string, queryParams: any) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  const { search, class_id } = queryParams;

  const query: any = { school_id: schoolId };

  if (class_id) query.class_id = class_id;
  
  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { admission_no: new RegExp(search, "i") },
      { parent_phone: new RegExp(search, "i") }
    ];
  }

  const [students, total] = await Promise.all([
    StudentModel.find(query)
      .populate("class_id", "name section") 
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),
    StudentModel.countDocuments(query),
  ]);

  return { 
    students, 
    total, 
    page, 
    totalPages: Math.ceil(total / limit) 
  };
};

export const getStudentByIdService = async (schoolId: string, studentId: string) => {
  const student = await StudentModel.findOne({ _id: studentId, school_id: schoolId })
    .populate("class_id", "name");

  if (!student) throw new AppError("Student not found", 404);
  return student;
};

export const updateStudentService = async (schoolId: string, studentId: string, data: any) => {
  const updated = await StudentModel.findOneAndUpdate(
    { _id: studentId, school_id: schoolId },
    data,
    { new: true }
  );

  if (!updated) throw new AppError("Student not found", 404);
  return updated;
};

export const deleteStudentService = async (schoolId: string, studentId: string) => {
  const deleted = await StudentModel.findOneAndDelete({ _id: studentId, school_id: schoolId });
  if (!deleted) throw new AppError("Student not found", 404);

  return deleted;
};
