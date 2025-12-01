import { ClassModel } from "../model/class.model";
import { StudentModel } from "../model/student.model";
import { AppError } from "../../../utils/AppError";


export const createStudentService = async (schoolId: string, data: any) => {
  const classObj = await ClassModel.findOne({ _id: data.class_id, school_id: schoolId });
  if (!classObj) throw new AppError("Invalid Class ID", 400);

  const exists = await StudentModel.findOne({ admission_no: data.admission_no, school_id: schoolId });
  if (exists) throw new AppError("Admission number already exists", 400);

  return await StudentModel.create({ ...data, school_id: schoolId });
};

export const getAllStudentsService = async (schoolId: string, queryParams: any) => {
  const { page, limit, search, class_id } = queryParams;
  const skip = (page - 1) * limit;

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
      .populate("class_id", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),
    StudentModel.countDocuments(query),
  ]);

  return { students, total, page, totalPages: Math.ceil(total / limit) };
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
