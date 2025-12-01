import { Router } from "express";
import {
    createSchool,
    getMySchool,
    getSchools,
    getSchoolById,
    updateSchool,
    deleteSchool
} from "../controller/school.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { createSchoolValidation, querySchoolValidation, updateSchoolValidation } from "../validation/school.validation";

const router = Router();

router.post("/", protect, restrictTo("SUPER_ADMIN"), validate(createSchoolValidation), createSchool);
router.get("/", protect, restrictTo("SUPER_ADMIN"), validate(querySchoolValidation), getSchools);
router.get("/me", protect, restrictTo("SCHOOL_ADMIN"), getMySchool);
router.get("/:id", protect, restrictTo("SUPER_ADMIN"), getSchoolById);
router.put("/:id", protect, restrictTo("SUPER_ADMIN"), validate(updateSchoolValidation), updateSchool);
router.delete("/:id", protect, restrictTo("SUPER_ADMIN"), deleteSchool);

export default router;
