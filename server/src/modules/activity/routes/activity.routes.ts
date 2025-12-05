import { Router } from "express";
import { createActivity, getClassHistory, getStudentFeed, getTodayOverview } from "../controller/activity.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { createActivitySchema, getHistorySchema } from "../validation/activity.validation"

const router = Router();

router.use(protect);

// Teacher: Log Activity
router.post(
  "/",
  restrictTo("TEACHER", "SCHOOL_ADMIN"), 
  validate(createActivitySchema),
  createActivity
);

// Parent: Get Feed
router.get(
  "/feed/:studentId",
  restrictTo("PARENT", "SCHOOL_ADMIN", "TEACHER"),
  getStudentFeed
);

router.get(
  "/history",
  restrictTo("TEACHER", "SCHOOL_ADMIN"),
  validate(getHistorySchema,"query"), // Validate query params
  getClassHistory
);

router.get(
  '/overview',
  restrictTo("TEACHER", "SCHOOL_ADMIN","PARENT"),
  getTodayOverview
)

export default router;