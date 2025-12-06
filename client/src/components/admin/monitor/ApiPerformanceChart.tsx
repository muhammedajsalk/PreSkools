// File: client/src/components/admin/monitor/ApiPerformanceChart.tsx

import React from 'react';
import { Box, Typography, Stack, Chip, useTheme, alpha, Paper, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// ✅ FIX 1: Import Missing Icons (assuming named imports are safer)
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// Placeholder for StatCard component (assuming it's reusable)
import { StatCard } from './StatCards'; 

interface ApiChartProps { api: any; mockTimelineData: any[]; }

export const ApiPerformanceChart: React.FC<ApiChartProps> = ({ api, mockTimelineData }) => {
  const theme = useTheme();
  
  // Calculate derived metrics
  const successRate = api.totalCalls > 0
    ? ((api.successCount / api.totalCalls) * 100)
    : 100;
  const errorRate = api.totalCalls > 0
    ? ((api.errorCount / api.totalCalls) * 100)
    : 0;

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, mb: 3 }}>
      <Box sx={{ mb: 4 }}><Typography variant="h6" fontWeight={600}>API Error Trends</Typography></Box>

      {/* ✅ FIX 2: Replaced Grid Item Layout with Flexbox/Box structure */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        
        {/* Total API Calls */}
        <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 6px)' } }}>
          <StatCard title="Total API Calls" value={api.totalCalls.toLocaleString()} icon={<TimelineIcon />} status="info" subtitle="Last 24 hours" />
        </Box>
        
        {/* Success Rate */}
        <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 6px)' } }}>
          <StatCard title="Success Rate" value={`${successRate.toFixed(1)}%`} icon={<CheckCircleOutlineIcon />} status={successRate >= 99 ? 'success' : successRate >= 95 ? 'warning' : 'error'} subtitle={`${api.successCount?.toLocaleString() || '0'} successful`} />
        </Box>
        
        {/* Error Rate */}
        <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 6px)' } }}>
          <StatCard title="Error Rate" value={`${errorRate.toFixed(2)}%`} icon={<ErrorOutlineIcon />} status={errorRate <= 1 ? 'success' : errorRate <= 5 ? 'warning' : 'error'} subtitle={`${api.errorCount.toLocaleString()} errors`} />
        </Box>
        
        {/* Avg Response Time */}
        <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 6px)' } }}>
          <StatCard title="Avg Response Time" value={`${api.avgResponseTime} ms`} icon={<DataUsageIcon />} status={api.avgResponseTime < 300 ? 'success' : api.avgResponseTime < 500 ? 'warning' : 'error'} subtitle="Average latency" />
        </Box>
      </Box>
      
      {/* Error Trend Chart */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>Error Timeline (5xx & 4xx)</Typography>
        <Box sx={{ height: 320, width: '100%', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.background.default, 0.5), border: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTimelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradient5xx" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.3} /><stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0} /></linearGradient>
                <linearGradient id="gradient4xx" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.palette.warning.main} stopOpacity={0.3} /><stop offset="95%" stopColor={theme.palette.warning.main} stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.4)} vertical={false} />
              <XAxis dataKey="time" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} tickLine={false} axisLine={{ stroke: theme.palette.divider }} interval="preserveStartEnd" />
              <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} tickLine={false} axisLine={false} width={40} />
              <Tooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 12, boxShadow: theme.shadows[8] }} labelStyle={{ color: theme.palette.text.primary, fontWeight: 600, marginBottom: 8 }} itemStyle={{ padding: '4px 0' }} />
              <Legend wrapperStyle={{ paddingTop: 20 }} iconType="circle" iconSize={10} />
              <Area type="monotone" dataKey="errors5xx" name="5xx Errors" stroke={theme.palette.error.main} strokeWidth={2} fill="url(#gradient5xx)" dot={false} />
              <Area type="monotone" dataKey="errors4xx" name="4xx Errors" stroke={theme.palette.warning.main} strokeWidth={2} fill="url(#gradient4xx)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Error breakdown chips */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Chip size="small" label={`5xx Errors: ${api.errors5xx}`} sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', fontWeight: 600 }} />
        <Chip size="small" label={`4xx Errors: ${api.errors4xx}`} sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main', fontWeight: 600 }} />
      </Stack>
    </Paper>
  );
};