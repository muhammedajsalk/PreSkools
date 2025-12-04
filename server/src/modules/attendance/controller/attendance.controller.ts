import { Request, Response } from "express";
import { catchAsync } from "../../../middleware/catchAsync";
import * as Service from "../services/attendance.service";

export const markAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await Service.markAttendanceService({
    school_id: req.user!.school_id!,
    teacher_id: req.user!.id,
    ...req.body
  });

  res.status(200).json({
    success: true,
    message: "Attendance marked successfully",
    data: result,
  });
});

export const getAttendance = catchAsync(async (req: Request, res: Response) => {
  const { class_id, date } = req.query;
  
  const data = await Service.getAttendanceByClassService(
    req.user!.school_id!, 
    class_id as string, 
    date as string
  );

  res.status(200).json({ success: true, data });
});