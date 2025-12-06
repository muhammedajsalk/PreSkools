import os from "os"; // Node.js built-in module for OS info
import mongoose from "mongoose";
import { AppError } from "../../../utils/AppError";
import { GLOBAL_API_METRICS } from "../../../utils/globalMetrics";

// Placeholder for future logic that tracks API requests/errors (e.g., using Redis or an actual log model)
let apiCallMetrics = {
    total: 1500, // Mock: 1500 calls since server start
    errors: 30,  // Mock: 30 total errors
};

export const getSystemMetricsService = async (schoolId: string) => {
    
    // --- 1. SERVER HEALTH (OS Metrics) ---
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const cpuUsage = os.loadavg()[0]; // Average load over 1 minute
    
    // Calculate Memory in MB
    const memoryUsageMB = Math.round(usedMemory / (1024 * 1024));
    const memoryTotalMB = Math.round(totalMemory / (1024 * 1024));
    const memoryPercent = Math.round((usedMemory / totalMemory) * 100);

    // --- 2. DATABASE HEALTH (MongoDB) ---
    let dbResponseTimeMs = 'N/A';
    let dbConnectionPool = '0';
    
    const isConnected = mongoose.connection.readyState === 1; 

    if (isConnected) {
        try {
            // Check connection time and status
            const startTime = Date.now();
            await mongoose.connection.db!.admin().ping();
            dbResponseTimeMs = `${Date.now() - startTime}ms`;
            dbConnectionPool = mongoose.connection.readyState.toString(); 
        } catch (error) {
            console.error("DB Ping Failed:", error);
            dbResponseTimeMs = 'DOWN';
        }
    } else {
        dbResponseTimeMs = 'DOWN'; 
    }

    // --- 3. API METRICS (REAL-TIME COUNTERS) ---
    const totalCalls = GLOBAL_API_METRICS.totalRequests;
    const errorCount = GLOBAL_API_METRICS.errorResponses;
    const successCount = GLOBAL_API_METRICS.successResponses;

    // Calculate Error Ratios
    const errorRatio = totalCalls > 0 
        ? Math.round((errorCount / totalCalls) * 1000) / 10 // Convert to percentage, e.g., 2.5%
        : 0;

    return {
        lastUpdated: new Date().toISOString(), // Current time for frontend display
        
        // Server Stats
        server: {
            cpuUsage: cpuUsage, // Number (1-minute load average)
            memoryUsed: memoryUsageMB, // MB
            memoryTotal: memoryTotalMB, // MB
            memoryPercent, // Percentage
            uptime: process.uptime(), // Seconds
            // Mock other required fields if needed by the frontend
            platform: os.platform(),
            nodeVersion: process.version,
        },
        
        // API Stats (REAL-TIME COUNTS)
        api: {
            totalCalls: totalCalls,
            successCount: successCount,
            errorCount: errorCount,
            errorRatio: errorRatio,
            errors5xx: GLOBAL_API_METRICS.errors5xx, // Read from global store
            errors4xx: GLOBAL_API_METRICS.errors4xx,
            
            // Mocked/calculated performance data
            avgResponseTime: 85, 
            requestsPerMinute: 60,
        },
        
        // Database Stats
        database: {
            connectionStatus: dbResponseTimeMs === 'DOWN' ? 'DOWN' : 'UP',
            responseTime: dbResponseTimeMs,
            poolStatus: { active: 5, idle: 10, total: 20, waiting: 0 }, // Mock Pool Status
            dbName: mongoose.connection.db?.databaseName || 'N/A',
            dbVersion: '5.0+', 
        },
        
        errorTimeline: [],
    };
};