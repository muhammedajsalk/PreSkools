import { Request, Response, NextFunction } from "express";
import {
  createClassService,
  getClassesService,
  updateClassService,
  deleteClassService,
} from "../service/class.service";
import { catchAsync } from "../../../middleware/catchAsync";

export const createClass = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await createClassService(req.user!.school_id!, req.body);
    res.status(201).json({ success: true, data });
});

export const getClasses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await getClassesService(req.user!.school_id!);
    res.status(200).json({ success: true, data });
});

export const updateClass = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await updateClassService(req.user!.school_id!, req.params.id, req.body);
    res.status(200).json({ success: true, data });
});

export const deleteClass = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await deleteClassService(req.user!.school_id!, req.params.id);
    res.status(200).json({ success: true, message: "Class deleted" });
});
