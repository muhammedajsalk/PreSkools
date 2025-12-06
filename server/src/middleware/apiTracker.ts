// File: server/src/middleware/apiTracker.ts

import { Request, Response, NextFunction } from 'express';
import { GLOBAL_API_METRICS } from '../utils/globalMetrics';

/**
 * Tracks request counts and categorizes response status codes (2xx, 4xx, 5xx).
 */
export const apiTracker = (req: Request, res: Response, next: NextFunction) => {
    // 1. Increment total requests immediately
    GLOBAL_API_METRICS.totalRequests++;

    // 2. Listen for the 'finish' event (when the response headers/body are sent)
    res.on('finish', () => {
        const statusCode = res.statusCode;

        if (statusCode >= 200 && statusCode < 400) {
            GLOBAL_API_METRICS.successResponses++;
        } else if (statusCode >= 400) {
            GLOBAL_API_METRICS.errorResponses++;
            
            if (statusCode >= 500) {
                GLOBAL_API_METRICS.errors5xx++;
            } else if (statusCode >= 400) {
                GLOBAL_API_METRICS.errors4xx++;
            }
        }
    });

    next();
};