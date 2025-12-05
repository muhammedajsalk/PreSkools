import os from "os"; // Node.js built-in module for OS info
import mongoose from "mongoose";
import { AppError } from "../../../utils/AppError";

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
    
    // Convert bytes to MB/GB and calculate percentage
    const memoryPercent = Math.round((usedMemory / totalMemory) * 100);
    const memoryUsageMB = Math.round(usedMemory / (1024 * 1024));

    // --- 2. DATABASE HEALTH (MongoDB) ---
    let dbResponseTimeMs = 'N/A';
    let dbConnectionPool = 'N/A';
    
    // Check if the readyState is 1 (CONNECTED)
    const isConnected = mongoose.connection.readyState === 1; 

    if (isConnected) {
        try {
            // FIX: Use non-null assertion '!' to tell TypeScript that 'db' is defined here
            const startTime = Date.now();
            await mongoose.connection.db!.admin().ping(); // <-- FIX APPLIED
            dbResponseTimeMs = `${Date.now() - startTime}ms`;
            
            // Connection Pool size check
            dbConnectionPool = mongoose.connection.readyState.toString(); 
        } catch (error) {
            console.error("DB Ping Failed:", error);
            dbResponseTimeMs = 'DOWN';
        }
    } else {
        dbResponseTimeMs = 'DOWN'; // Set status to down if not connected
        dbConnectionPool = '0';
    }

    // --- 3. SYNTHESIS ---
    
    // Calculate Error Ratios
    const errorRatio = apiCallMetrics.total > 0 
        ? Math.round((apiCallMetrics.errors / apiCallMetrics.total) * 1000) / 10 
        : 0;

    return {
        // Server Stats
        server: {
            cpuLoad: `${cpuUsage.toFixed(2)}%`,
            memoryUsed: `${memoryUsageMB}MB`,
            memoryPercent,
            uptime: process.uptime(), // Seconds since server started
        },
        
        // API Stats (MOCKING historical/error data based on future logging)
        api: {
            totalCalls: apiCallMetrics.total,
            errorCount: apiCallMetrics.errors,
            successRatio: 100 - errorRatio,
            errorRatio: errorRatio,
        },
        
        // Database Stats
        database: {
            status: dbResponseTimeMs === 'DOWN' ? 'DOWN' : 'UP',
            responseTime: dbResponseTimeMs,
            connectionStatus: dbConnectionPool,
        },
        
        // Mocked performance data for frontend charts (e.g., last 24 hours)
        errorTimeline: [ /* Array of errors over time */ ]
    };
};