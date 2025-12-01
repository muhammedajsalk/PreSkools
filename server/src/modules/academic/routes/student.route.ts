import { Router } from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controller/student.controller";

import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validation/student.validation";

import {querySchema} from "../validation/common.validaation"

const router = Router();

router.post(
  "/",
  protect,
  restrictTo("SCHOOL_ADMIN"),
  validate(createStudentSchema),
  createStudent
);

router.get(
  "/",
  protect,
  restrictTo("SCHOOL_ADMIN", "TEACHER"),
  validate(querySchema),
  getStudents
);

router.get(
  "/:id",
  protect,
  restrictTo("SCHOOL_ADMIN", "TEACHER"),
  getStudentById
);

router.put(
  "/:id",
  protect,
  restrictTo("SCHOOL_ADMIN"),
  validate(updateStudentSchema),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  restrictTo("SCHOOL_ADMIN"),
  deleteStudent
);

export default router;
