import { Request, Response, NextFunction } from "express";
import { createSchoolService, deleteSchoolService, getAllSchoolsService, getMySchoolService, getSchoolByIdService, updateSchoolService } from "../service/school.service";

export const createSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const school = await createSchoolService(req.body);
        res.status(201).json({ success: true, data: school });
    } catch (error) {
        next(error);
    }
};

export const getMySchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const school = await getMySchoolService(req.user!.school_id);
        res.status(200).json({ success: true, data: school });
    } catch (error) {
        next(error);
    }
};

export const getSchools = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

export const getSchoolById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const school = await getSchoolByIdService(req.params.id);
        res.status(200).json({ success: true, data: school });
    } catch (error) {
        next(error);
    }
};

export const updateSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await updateSchoolService(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

export const deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteSchoolService(req.params.id);
        res.status(200).json({ success: true, message: "School deleted" });
    } catch (error) {
        next(error);
    }
};

