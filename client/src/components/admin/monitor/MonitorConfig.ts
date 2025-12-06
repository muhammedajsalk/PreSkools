// File: client/src/components/admin/monitor/MonitorConfig.ts

export interface ServerMetrics { cpuUsage: number; memoryUsed: number; memoryTotal: number; uptime: number; status: 'operational' | 'degraded' | 'down'; nodeVersion: string; platform: string; }
export interface DatabaseMetrics { connectionStatus: 'UP' | 'DOWN'; responseTime: number; poolStatus: { active: number; idle: number; total: number; waiting: number; }; dbName: string; dbVersion: string; }
export interface ApiMetrics { totalCalls: number; successCount: number; errorCount: number; errors5xx: number; errors4xx: number; avgResponseTime: number; requestsPerMinute: number; }
export interface SystemMetrics { server: ServerMetrics; database: DatabaseMetrics; api: ApiMetrics; lastUpdated: string; }
export interface TimelineDataPoint { time: string; hour: number; errors5xx: number; errors4xx: number; totalRequests: number; }

export const generateMockTimelineData = (): TimelineDataPoint[] => {
  const data: TimelineDataPoint[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    const isPeakHour = hour >= 9 && hour <= 17;
    const baseErrors5xx = isPeakHour ? 5 : 2;
    const baseErrors4xx = isPeakHour ? 25 : 10;
    const baseRequests = isPeakHour ? 1500 : 400;

    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      hour, errors5xx: Math.floor(Math.random() * 10) + baseErrors5xx,
      errors4xx: Math.floor(Math.random() * 30) + baseErrors4xx,
      totalRequests: Math.floor(Math.random() * 500) + baseRequests,
    });
  }
  return data;
};

export const formatUptime = (seconds: number): { value: string; unit: string }[] => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts: { value: string; unit: string }[] = [];
  if (days > 0) parts.push({ value: String(days), unit: 'days' });
  if (hours > 0) parts.push({ value: String(hours), unit: 'hrs' });
  if (minutes > 0 || parts.length === 0) parts.push({ value: String(minutes), unit: 'min' });

  return parts;
};

export const formatBytes = (mb: number | undefined | null): string => {
  // 1. Defensively check if 'mb' is a valid number, otherwise treat as 0
  const bytes = Number(mb) || 0; 
  
  if (bytes < 0) return '0 B'; // Safety check

  // 2. Perform conversion
  if (bytes >= 1024) {
    // Show in GB
    return `${(bytes / 1024).toFixed(2)} GB`;
  }
  // Show in MB
  return `${bytes.toFixed(0)} MB`;
};

export const getStatusColor = (
  value: number,
  thresholds: { warning: number; critical: number }
): 'success' | 'warning' | 'error' => {
  if (value >= thresholds.critical) return 'error';
  if (value >= thresholds.warning) return 'warning';
  return 'success';
};