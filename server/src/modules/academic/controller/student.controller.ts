import { Request, Response, NextFunction } from "express";
import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "../service/student.service";

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createStudentService(req.user!.school_id!, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllStudentsService(req.user!.school_id!, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getStudentByIdService(req.user!.school_id!, req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateStudentService(req.user!.school_id!, req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteStudentService(req.user!.school_id!, req.params.id);
    res.status(200).json({ success: true, message: "Student deleted" });
  } catch (err) {
    next(err);
  }
};
