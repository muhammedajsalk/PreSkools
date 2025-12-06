// File: client/src/components/admin/monitor/DatabaseHealthCard.tsx

import React from 'react';
import { Grid, Box, Typography, Stack, Card, CardContent, LinearProgress, useTheme, alpha, Paper } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DatabaseMetrics } from './MonitorConfig';
import { StatCard, SectionHeader } from './StatCards'; // Import StatCard

interface DatabaseHealthCardProps { database: DatabaseMetrics; }

// Define a minimal, safe default for the pool status to prevent crashes
const SAFE_POOL_STATUS = { active: 0, total: 0, waiting: 0, idle: 0 };

export const DatabaseHealthCard: React.FC<DatabaseHealthCardProps> = ({ database }) => {
  const theme = useTheme();
  const isConnected = database.connectionStatus === 'UP';

  // ✅ FIX 1: Safely access poolStatus, defaulting to SAFE_POOL_STATUS if undefined
  const poolStatus = database.poolStatus || SAFE_POOL_STATUS;
  
  // ✅ FIX 2: Calculate utilization safely (|| 0 handles division by zero if total is 0)
  const poolUtilization = (poolStatus.active / poolStatus.total) * 100 || 0; 

  // Helper component for Pool Stat Items (Extracted from component body)
  const PoolStatItem = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <Box sx={{ width: '25%', textAlign: 'center' }}>
      <Typography variant="h5" fontWeight={700} color={color}>{value}</Typography>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
      <SectionHeader title="Database Health" icon={<StorageIcon />} />

      <Stack spacing={2.5}>
        {/* Connection Status Card (Unchanged) */}
        <Card elevation={0} sx={{ border: `1px solid ${alpha(isConnected ? theme.palette.success.main : theme.palette.error.main, 0.3)}`, bgcolor: alpha(isConnected ? theme.palette.success.main : theme.palette.error.main, 0.04), borderRadius: 2 }}>
          <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>Connection Status</Typography>
                <Typography variant="h5" fontWeight={700} color={isConnected ? 'success.main' : 'error.main'}>{isConnected ? 'CONNECTED' : 'DISCONNECTED'}</Typography>
                <Typography variant="caption" color="text.secondary">{database.dbName} v{database.dbVersion}</Typography>
              </Box>
              <Box sx={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha(isConnected ? theme.palette.success.main : theme.palette.error.main, 0.1) }}>
                {isConnected ? <CloudDoneIcon sx={{ fontSize: 28, color: 'success.main' }} /> : <ErrorOutlineIcon sx={{ fontSize: 28, color: 'error.main' }} />}
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Response Time (Unchanged) */}
        <StatCard title="Response Time" value={database.responseTime} subtitle={database.responseTime < 50 ? 'Excellent performance' : 'Good performance'} icon={<SpeedIcon />} status={database.responseTime < 50 ? 'success' : 'warning'} />

        {/* Connection Pool Card (FIX APPLIED HERE) */}
        <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>Connection Pool</Typography>
            
            {/* Display Stats using the safe poolStatus variable */}
            <Stack direction="row" spacing={2} justifyContent="space-around" sx={{ mt: 1 }}>
              <PoolStatItem label="Active" value={poolStatus.active} color="primary.main" />
              <PoolStatItem label="Idle" value={poolStatus.idle} color="text.secondary" />
              <PoolStatItem label="Waiting" value={poolStatus.waiting} color="warning.main" />
              <PoolStatItem label="Total" value={poolStatus.total} color="success.main" />
            </Stack>

            {/* Pool Utilization Bar */}
            <Box sx={{ mt: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Pool Utilization</Typography>
                {/* Use poolUtilization for display */}
                <Typography variant="caption" fontWeight={600} color={poolUtilization > 80 ? 'error.main' : 'success.main'}>{poolUtilization.toFixed(0)}%</Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={poolUtilization} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5, 
                  bgcolor: alpha(theme.palette.primary.main, 0.1), 
                  '& .MuiLinearProgress-bar': { 
                    borderRadius: 5, 
                    bgcolor: poolUtilization > 80 ? 'error.main' : 'success.main' 
                  } 
                }} 
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Paper>
  );
};