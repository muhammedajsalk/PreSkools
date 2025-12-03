import User from "../../auth/model/user.model";
import { AppError } from "../../../utils/AppError";

interface CreateTeacherInput {
  fullName: string;
  phone: string;
  email: string;
  qualification: string;
  joiningDate: Date;
  experience?: string;
}

export const createTeacherService = async (schoolId: string, data: CreateTeacherInput) => {
  const existingUser = await User.findOne({ phone: data.phone });
  if (existingUser) {
    throw new AppError("User with this phone number already exists.", 409);
  }

  const teacher = await User.create({
    name: data.fullName,
    phone: `+91${data.phone}`,
    email: data.email,
    role: "TEACHER",
    school_id: schoolId,
    qualification: data.qualification,
    joiningDate: data.joiningDate,
    experience: "New Joiner",
    isActive: true, 
    firebase_uid: undefined,
  });

  return teacher;
};

export const getAllTeachersService = async (schoolId: string, query: any) => {
  const { search } = query;
  
  const filter: any = { 
    school_id: schoolId,
    role: "TEACHER"
  };

  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') }
    ];
  }

  const teachers = await User.find(filter).sort({ createdAt: -1 });
  
  return teachers;
};

export const getTeacherByIdService = async (schoolId: string, teacherId: string) => {
  const teacher = await User.findOne({
    _id: teacherId,
    school_id: schoolId,
    role: "TEACHER",
  });

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  return teacher;
};


export const updateTeacherService = async (schoolId: string, teacherId: string, data: any) => {
  if (data.phone) {
    const existing = await User.findOne({ phone: data.phone, _id: { $ne: teacherId } });
    if (existing) {
      throw new AppError("Phone number already in use by another user", 409);
    }
  }

  const updateData = { ...data };
  if (data.fullName) updateData.name = data.fullName;

  const teacher = await User.findOneAndUpdate(
    { _id: teacherId, school_id: schoolId, role: "TEACHER" },
    updateData,
    { new: true, runValidators: true }
  );

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  return teacher;
};

export const deleteTeacherService = async (schoolId: string, teacherId: string) => {
  const teacher = await User.findOneAndDelete({
    _id: teacherId,
    school_id: schoolId,
    role: "TEACHER",
  });

  if (!teacher) {
    throw new AppError("Teacher not found", 404);
  }

  return teacher;
};