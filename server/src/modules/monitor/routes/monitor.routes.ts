// File: server/src/modules/monitor/monitor.routes.ts
import { Router } from "express";
import { protect, restrictTo } from "../../../middleware/auth";
import { getSystemHealth } from "../controller/monitor.controller";

const router = Router();

// 🔒 RESTRICTED to the highest administrative role (SUPER_ADMIN)
router.get("/health", protect, restrictTo("SUPER_ADMIN"), getSystemHealth);

export default router;

// Register in app.ts: app.use("/api/monitor", monitorRoutes);