import { Request, Response } from "express";
import { catchAsync } from "../../../middleware/catchAsync";
import * as Service from "../service/activity.service";

export const createActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await Service.batchCreateActivityService({
    school_id: req.user!.school_id!,
    teacher_id: req.user!.id,
    ...req.body // Contains student_ids, type, data, class_id
  });

  res.status(201).json({
    success: true,
    message: `Activity logged for ${result.length} students`,
    data: result,
  });
});

export const getStudentFeed = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // TODO: Add security check (Is this parent linked to this student?)
  
  const result = await Service.getStudentFeedService(studentId, page, limit);

  res.status(200).json({
    success: true,
    data: result
  });
});