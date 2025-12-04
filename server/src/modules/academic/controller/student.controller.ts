import { Request, Response, NextFunction } from "express";
import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "../service/student.service";
import { catchAsync } from "../../../middleware/catchAsync";

export const createStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await createStudentService(req.user!.school_id!, req.body);
    res.status(201).json({ success: true, data });
});

export const getStudents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllStudentsService(req.user!.school_id!, req.query);
    res.status(200).json({ success: true, ...result });
});

export const getStudentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await getStudentByIdService(req.user!.school_id!, req.params.id);
    res.status(200).json({ success: true, data });
});

export const updateStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const data = await updateStudentService(req.user!.school_id!, req.params.id, req.body);
    res.status(200).json({ success: true, data });
});

export const deleteStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await deleteStudentService(req.user!.school_id!, req.params.id);
    res.status(200).json({ success: true, message: "Student deleted" });
});
