// File: client/src/components/admin/monitor/SystemSummary.tsx

import React from 'react';
import { Box, Typography, Stack, Chip, Divider, Paper, useTheme, alpha } from '@mui/material';
// Assuming these are imported from MonitorConfig or StatCards
import { ServerMetrics, DatabaseMetrics, ApiMetrics } from './MonitorConfig'; 

interface SystemSummaryProps { 
    server: ServerMetrics | null | undefined; 
    database: DatabaseMetrics | null | undefined; 
    api: ApiMetrics | null | undefined; 
    overallStatus: { label: string; color: 'success' | 'warning' | 'error' }; 
}

export const SystemSummary: React.FC<SystemSummaryProps> = ({ 
    server, 
    database, 
    api, 
    overallStatus 
}) => {
  const theme = useTheme();
  
  // 1. Defensively assign safe objects (CRITICAL FIX)
  const safeServer = server || {} as ServerMetrics;
  const safeDatabase = database || {} as DatabaseMetrics;
  const safeApi = api || { totalCalls: 0, errors5xx: 0, errors4xx: 0, errorCount: 0, errorRatio: 0 } as ApiMetrics;

  // 2. Safely calculate derived API metrics
  const successRate = 100 - (safeApi.errorRatio || 0);

  const summaryItems = [
    { 
      label: 'Server Status', 
      // Use fallback string 'N/A' if status is missing
      value: safeServer.status?.toUpperCase() || 'N/A', 
      color: safeServer.status === 'operational' ? 'success' : 'error' 
    },
    { 
      label: 'Database', 
      value: safeDatabase.connectionStatus?.toUpperCase() || 'N/A', 
      color: safeDatabase.connectionStatus === 'up' ? 'success' : 'error' 
    },
    { 
      label: 'API Success Rate', 
      // Use successRate calculation
      value: `${successRate.toFixed(1)}%`, 
      color: successRate >= 99 ? 'success' : successRate >= 95 ? 'warning' : 'error' 
    },
    { 
      label: 'Total Calls (24h)', 
      value: safeApi.totalCalls.toLocaleString() || '0', 
      color: 'info' 
    },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)` }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        System Summary
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Stack spacing={2}>
        {summaryItems.map((item) => (
          <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
            <Chip 
              size="small" 
              label={item.value} 
              color={item.color as 'success' | 'warning' | 'error' | 'info'} 
              sx={{ fontWeight: 600, minWidth: 90 }} 
            />
          </Stack>
        ))}

        <Divider />

        <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: alpha(theme.palette[overallStatus.color].main, 0.08), textAlign: 'center', border: `1px solid ${alpha(theme.palette[overallStatus.color].main, 0.2)}` }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5, letterSpacing: 1.5 }}>
            Overall Platform Status
          </Typography>
          <Typography variant="h5" fontWeight={700} color={`${overallStatus.color}.main`}>
            {overallStatus.label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};