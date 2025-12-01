import { Request, Response, NextFunction } from "express";
import {
  createClassService,
  getClassesService,
  updateClassService,
  deleteClassService,
} from "../service/class.service";

export const createClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createClassService(req.user!.school_id!, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getClassesService(req.user!.school_id!);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateClassService(req.user!.school_id!, req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteClassService(req.user!.school_id!, req.params.id);
    res.status(200).json({ success: true, message: "Class deleted" });
  } catch (err) {
    next(err);
  }
};
