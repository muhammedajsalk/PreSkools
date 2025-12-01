import { Router } from "express";
import {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
} from "../controller/class.controller";

import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { createClassSchema, updateClassSchema } from "../validation/class.validation";

const router = Router();


router.post(
  "/",
  protect,
  restrictTo("SCHOOL_ADMIN"),
  validate(createClassSchema),
  createClass
);

router.get(
  "/",
  protect,
  restrictTo("SCHOOL_ADMIN", "TEACHER"),
  getClasses
);

router.put(
  "/:id",
  protect,
  restrictTo("SCHOOL_ADMIN"),
  validate(updateClassSchema),
  updateClass
);

router.delete(
  "/:id",
  protect,
  restrictTo("SCHOOL_ADMIN"),
  deleteClass
);

export default router;
