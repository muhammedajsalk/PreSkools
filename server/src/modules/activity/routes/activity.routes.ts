import { Router } from "express";
import { createActivity, getStudentFeed } from "../controller/activity.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { createActivitySchema } from "../validation/activity.validation"

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

export default router;