import { ClassModel } from "../model/class.model";
import { StudentModel } from "../model/student.model";
import { AppError } from "../../../utils/AppError";
import mongoose from "mongoose";
import User from "../../auth/model/user.model";


export const createStudentService = async (schoolId: string, data: any) => {
  console.log("Received Data:", data); // Debugging

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Validate Class
    const classObj = await ClassModel.findOne({ _id: data.class_id, school_id: schoolId }).session(session);
    if (!classObj) throw new AppError("Invalid Class ID", 400);

    // 2. Validate Unique Admission No
    const exists = await StudentModel.findOne({ admission_no: data.admission_no, school_id: schoolId }).session(session);
    if (exists) throw new AppError("Admission number already exists", 400);

    // ---------------------------------------------------------
    // 3. PARENT USER LOGIC
    // ---------------------------------------------------------
    // Use the flat parent_phone field sent from frontend
    let parentUser = await User.findOne({ phone: data.parent_phone }).session(session);

    if (!parentUser) {
      // Create Placeholder Parent User
      const [newParent] = await User.create([{
        name: data.parent_name,
        phone: `+${data.parent_phone}`,
        email: data.parent_email, // ✅ ADDED: Save Email to User Account
        role: "PARENT",
        school_id: schoolId,
        firebase_uid: undefined, // Will claim later via OTP
        isActive: false,
      }], { session });
      
      parentUser = newParent;
    } 
    
    // ---------------------------------------------------------
    // 4. CREATE STUDENT
    // ---------------------------------------------------------
    const [newStudent] = await StudentModel.create([{
      ...data, // This spreads the nested objects (parents, medical_info, etc.)
      school_id: schoolId,
      parent_ids: [parentUser._id], // Link User to Student
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
    { _id: studentId, school_id: schoolId }, // Ensure Tenant Isolation
    data,
    { 
      new: true,            // Return the updated document
      runValidators: true   // <--- CRITICAL: Enforce Schema Rules (e.g. Enum values)
    }
  );

  // <--- CRITICAL: Throw error if not found
  if (!updated) {
    throw new AppError("Student not found", 404);
  }

  return updated;
};

export const deleteStudentService = async (schoolId: string, studentId: string) => {
  const deleted = await StudentModel.findOneAndDelete({ _id: studentId, school_id: schoolId });
  if (!deleted) throw new AppError("Student not found", 404);

  return deleted;
};
