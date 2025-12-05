import { Request, Response } from "express";
import { catchAsync } from "../../../middleware/catchAsync";
import * as Service from "../service/monitor.service";

// @desc    Get comprehensive system health metrics (For Super Admin)
// @route   GET /api/monitor/health
// @access  Private (SUPER_ADMIN)
export const getSystemHealth = catchAsync(async (req: Request, res: Response) => {
    // Note: We don't need schoolId here, but we pass it for context
    const metrics = await Service.getSystemMetricsService(req.user!.school_id!); 
    
    res.status(200).json({
        success: true,
        data: metrics
    });
});