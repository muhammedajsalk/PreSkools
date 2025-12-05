// File: server/src/modules/parent/controller/parent.controller.ts

import { Request, Response } from "express";
import { catchAsync } from "../../../middleware/catchAsync";
import * as Service from "../service/parent.service";
import { AppError } from "../../../utils/AppError";

export const getMyChildren = catchAsync(async (req: Request, res: Response) => {
    // Pass the Parent's User ID (req.user!.id) and School ID
    const children = await Service.getMyChildrenService({
        parentUserId: req.user!.id,
        schoolId: req.user!.school_id!
    });

    if (children.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No children linked to this account.",
            data: []
        });
    }

    res.status(200).json({
        success: true,
        count: children.length,
        data: children
    });
});


export const getQuickStats = catchAsync(async (req: Request, res: Response) => {
    const { studentId } = req.query;

    if (!studentId) {
        throw new AppError("Student ID is required", 400);
    }

    const stats = await Service.getQuickStatsService(
        studentId as string,
        req.user!.school_id!
    );

    res.status(200).json({ success: true, data: stats });
});
