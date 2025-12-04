import { Router } from "express";
import { markAttendance, getAttendance } from "../controller/attendance.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { markAttendanceSchema } from "../validation/attendance.validation";

const router = Router();

router.use(protect);

router.post(
  "/", 
  restrictTo("TEACHER", "SCHOOL_ADMIN"), 
  validate(markAttendanceSchema), 
  markAttendance
);

router.get(
  "/", 
  restrictTo("TEACHER", "SCHOOL_ADMIN"), 
  getAttendance
);

export default router;