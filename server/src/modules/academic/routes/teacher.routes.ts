import { Router } from "express";
import { createTeacher, deleteTeacher, getTeacherById, getTeachers, updateTeacher } from "../controller/teacher.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import { createTeacherSchema, updateTeacherSchema } from "../validation/teacher.validation";
import validate from "../../../middleware/validate";

const router = Router();

router.use(protect);
router.use(restrictTo("SCHOOL_ADMIN"));


router.post("/", validate(createTeacherSchema), createTeacher);
router.get("/", getTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", validate(updateTeacherSchema), updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;