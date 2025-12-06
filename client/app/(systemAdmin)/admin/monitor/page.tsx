'use client';
import React, { useMemo } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
  alpha,
  Stack,
  Paper,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
// Import StatCards helpers
import { LoadingSkeleton, CircularGauge, StatCard, SectionHeader } from '@/src/components/admin/monitor/StatCards';
// Import helpers from config
import { formatUptime, generateMockTimelineData, formatBytes } from '@/src/components/admin/monitor/MonitorConfig'; 
import { DatabaseHealthCard } from '@/src/components/admin/monitor/DatabaseHealthCard';
import { SystemSummary } from '@/src/components/admin/monitor/SystemSummary';
import { ApiPerformanceChart } from '@/src/components/admin/monitor/ApiPerformanceChart';

// Import RTK Query hook
import { useGetSystemHealthQuery } from '@/src/store/api/systemApiSlice';

// FIX: Define getOverallStatus (Placeholder based on context)
const getOverallStatus = (
  isDBDown: boolean, 
  isServerDown: boolean, 
  cpuLoad: number, 
  memPct: number
): { label: string; color: 'success' | 'warning' | 'error' } => {
  if (isDBDown || isServerDown || cpuLoad > 90) return { label: 'CRITICAL', color: 'error' };
  if (memPct > 70) return { label: 'DEGRADED', color: 'warning' };
  return { label: 'OPERATIONAL', color: 'success' };
};


export default function SystemHealthMonitorPage() {
  const theme = useTheme();

  // Fetch system metrics using RTK Query with polling
  const {
    data: metrics,
    isLoading,
    isFetching,
    refetch,
  } = useGetSystemHealthQuery(undefined, {
    pollingInterval: 30000, 
  });

  // Generate mock timeline data for chart
  const mockTimelineData = useMemo(() => generateMockTimelineData(), []);

  if (isLoading || !metrics) {
    return <LoadingSkeleton />;
  }

  console.log(metrics)

  // Destructure data
  const { server, database, api, lastUpdated } = metrics.data as any; 

  // Calculate derived metrics
  const memoryPercentage = (server.memoryUsed / server.memoryTotal) * 100;
  console.log("memory percetage",server.memoryUsed)
  const uptimeParts = formatUptime(server.uptime);

  // Determine overall system status
  const overallStatus = getOverallStatus(
    database.connectionStatus === 'down',
    server.status === 'down',
    server.cpuUsage,
    memoryPercentage
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      
      {/* HEADER SECTION */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`, border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}` }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <MonitorHeartIcon sx={{ fontSize: 36, color: 'primary.main' }} />
              <Typography variant="h4" fontWeight={700}>Platform Health Monitor</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1.5 }}>
              <Typography variant="body2" color="text.secondary">Last updated: {new Date(lastUpdated).toLocaleString()}</Typography>
              <IconButton size="small" onClick={() => refetch()} sx={{ animation: isFetching ? 'spin 1s linear infinite' : 'none' }}>
                <SyncIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
          <Chip label={overallStatus.label} color={overallStatus.color} sx={{ fontWeight: 700, fontSize: '0.95rem', py: 3, px: 2, borderRadius: 2 }} />
        </Stack>
      </Paper>

      {/* --- MAIN CONTENT LAYOUT (Fixed with Flexbox) --- */}
      {/* Outer Container: Flex container replacing Grid container */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        
        {/* 1. LEFT COLUMN - Server & API (Approx 66% width) */}
        <Box sx={{ width: { xs: '100%', lg: 'calc(66.66% - 12px)' }, flexShrink: 0 }}>
          
          {/* SECTION 1: Server Performance */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <SectionHeader title="Server Performance" icon={<SpeedIcon />} action={<Typography variant="caption" color="text.secondary">{server.platform} • Node {server.nodeVersion}</Typography>} />

            {/* Internal Layout: Grid is fine if used correctly (with item prop) - but we use Flex here to avoid conflicts */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="stretch">
              
              {/* Item 1: CPU Gauge (25% width on MD) */}
              <Box sx={{ width: { xs: '100%', sm: '40%', md: '25%' }, display: 'flex', justifyContent: 'center' }}>
                <CircularGauge value={server.cpuUsage} label="CPU Load" thresholds={{ warning: 70, critical: 90 }} />
              </Box>

              {/* Item 2: Memory Usage Bar (41.66% width on MD) */}
              <Box sx={{ width: { xs: '100%', md: '41.66%' }, p: 3, borderRadius: 2, bgcolor: alpha(theme.palette.background.default, 0.5), border: `1px solid ${alpha(theme.palette.divider, 0.5)}`, height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>Memory Usage</Typography>
                  <Typography variant="body2" color="text.secondary">{memoryPercentage.toFixed(1)}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={memoryPercentage} sx={{ height: 16, borderRadius: 8 }} />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">Used: {formatBytes(server.memoryUsed)}</Typography>
                  <Typography variant="caption" color="text.secondary">Total: {formatBytes(server.memoryTotal)}</Typography>
                </Stack>
              </Box>

              {/* Item 3: Uptime Display (33.33% width on MD) */}
              <Box sx={{ width: { xs: '100%', md: '33.33%' }, p: 3, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.05), border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`, height: '100%' }}>
                  <TimerIcon sx={{ fontSize: 36, color: 'success.main', mb: 1 }} />
                  <Stack direction="row" spacing={2} alignItems="baseline">
                    {uptimeParts.map((part, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}><Typography variant="h4" fontWeight={700} color="success.main">{part.value}</Typography><Typography variant="caption" color="text.secondary">{part.unit}</Typography></Box>
                    ))}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>System Uptime</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* SECTION 3: API Performance */}
          <ApiPerformanceChart 
            // 🛑 FIX: Pass a guaranteed object for 'api' and ensure mock data is available for timeline
            api={api || { totalCalls: 0, successCount: 0, errorCount: 0, errors5xx: 0, errors4xx: 0, avgResponseTime: 0, requestsPerMinute: 0 }} 
            mockTimelineData={mockTimelineData} 
          />
        </Box>

        {/* 2. RIGHT COLUMN - Overview & Database (Fixed 33% width) */}
        <Box sx={{ width: { xs: '100%', lg: 'calc(33.33% - 12px)' }, flexGrow: 1 }}>
          <DatabaseHealthCard database={database} />
          <SystemSummary server={server} database={database} api={api} overallStatus={overallStatus} />
        </Box>
      </Box>
    </Box>
  );
}