// File: server/src/modules/parent/parent.routes.ts

import { Router } from "express";
import { getMyChildren, getQuickStats } from "../controller/parent.controller";
import { protect, restrictTo } from "../../../middleware/auth";
import validate from "../../../middleware/validate";
import { getQuickStatsSchema } from "../validation/parent.validation";

const router = Router();

// Endpoint: GET /api/parent/children
router.get("/children", protect, restrictTo("PARENT"), getMyChildren);

router.get(
  "/quick-stats", 
  protect, 
  restrictTo("PARENT"), 
  validate(getQuickStatsSchema, "query"), 
  getQuickStats
);

export default router;