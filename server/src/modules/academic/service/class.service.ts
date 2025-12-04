
import { ClassModel } from "../model/class.model";
import { StudentModel } from "../model/student.model";
import { AppError } from "../../../utils/AppError";

export const createClassService = async (schoolId: string, data: any) => {
  console.log(data)
  const exists = await ClassModel.findOne({name:data.name, section: data.section, school_id: schoolId });
  if (exists) throw new AppError("Class with this name already exists", 400);

  return await ClassModel.create({ ...data, school_id: schoolId });
};

export const getClassesService = async (schoolId: string) => {
  return await ClassModel.find({ school_id: schoolId })
    .populate("teacher_id", "name phone")
    .lean();
};

export const updateClassService = async (schoolId: string, classId: string, data: any) => {
  const updated = await ClassModel.findOneAndUpdate(
    { _id: classId, school_id: schoolId },
    data,
    { new: true }
  );

  if (!updated) throw new AppError("Class not found", 404);
  return updated;
};

export const deleteClassService = async (schoolId: string, classId: string) => {
  const hasStudents = await StudentModel.findOne({ class_id: classId });
  if (hasStudents) throw new AppError("Cannot delete class with active students", 400);

  const deleted = await ClassModel.findOneAndDelete({ _id: classId, school_id: schoolId });
  if (!deleted) throw new AppError("Class not found", 404);

  return deleted;
};
