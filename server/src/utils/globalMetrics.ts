// File: server/src/utils/globalMetrics.ts

// Stores real-time counters for API usage across the Node.js process
export const GLOBAL_API_METRICS = {
    totalRequests: 0,
    successResponses: 0,
    errorResponses: 0,
    errors4xx: 0,
    errors5xx: 0,
    // You could also add response time arrays here for Avg Latency calculation
};

/**
 * Resets API metrics (useful for testing or periodic cleanup in production).
 */
export const resetMetrics = () => {
    GLOBAL_API_METRICS.totalRequests = 0;
    GLOBAL_API_METRICS.successResponses = 0;
    GLOBAL_API_METRICS.errorResponses = 0;
    GLOBAL_API_METRICS.errors4xx = 0;
    GLOBAL_API_METRICS.errors5xx = 0;
};