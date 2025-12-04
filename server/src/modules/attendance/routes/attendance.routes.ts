import { Router } from "express";
import { markAttendance, getAttendance, getAnalytics } from "../controller/attendance.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { getAnalyticsSchema, markAttendanceSchema } from "../validation/attendance.validation";

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

router.get(
  "/analytics", 
  restrictTo("TEACHER", "SCHOOL_ADMIN"), 
  validate(getAnalyticsSchema), 
  getAnalytics
);

export default router;