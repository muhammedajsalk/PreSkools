import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../middleware/catchAsync";
import * as Service from "../service/teacher.service";

export const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const teacher = await Service.createTeacherService(req.user!.school_id!, req.body);
  
  res.status(201).json({
    success: true,
    message: "Teacher added successfully",
    data: teacher,
  });
});

export const getTeachers = catchAsync(async (req: Request, res: Response) => {
  const teachers = await Service.getAllTeachersService(req.user!.school_id!, req.query);
  
  res.status(200).json({
    success: true,
    data: teachers,
  });
});

export const getTeacherById = catchAsync(async (req: Request, res: Response) => {
  const teacher = await Service.getTeacherByIdService(req.user!.school_id!, req.params.id);
  res.status(200).json({ success: true, data: teacher });
});

export const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const teacher = await Service.updateTeacherService(req.user!.school_id!, req.params.id, req.body);
  res.status(200).json({ success: true, data: teacher });
});

export const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  await Service.deleteTeacherService(req.user!.school_id!, req.params.id);
  res.status(200).json({ success: true, message: "Teacher deleted successfully" });
});