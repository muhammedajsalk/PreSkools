import { Request, Response, NextFunction } from "express";
import { createSchoolService, deleteSchoolService, getAllSchoolsService, getMySchoolService, getSchoolByIdService, updateSchoolService } from "../service/school.service";
import { catchAsync } from "../../../middleware/catchAsync";

export const createSchool = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const school = await createSchoolService(req.body);
        res.status(201).json({ success: true, data: school })
});

export const getMySchool = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const school = await getMySchoolService(req.user!.school_id);
        res.status(200).json({ success: true, data: school });
});

export const getSchools = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const params = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: (req.query.search as string) || "",
            plan: (req.query.plan as string) || "",
            status: (req.query.status as string) || "",
            sortBy: (req.query.sortBy as string) || "createdAt",
            sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        };

        const result = await getAllSchoolsService(params);

        res.status(200).json({ success: true, ...result });
});

export const getSchoolById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const school = await getSchoolByIdService(req.params.id);
        res.status(200).json({ success: true, data: school });
});

export const updateSchool = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updated = await updateSchoolService(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
});

export const deleteSchool = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await deleteSchoolService(req.params.id);
        res.status(200).json({ success: true, message: "School deleted" });
});

