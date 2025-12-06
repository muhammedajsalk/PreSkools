'use client';
import React from 'react';
import { Box, CircularProgress, Typography, useTheme, alpha, Stack, Card, CardContent } from '@mui/material';
import { MonitorHeart, Speed, Memory, Timer, TrendingUp, CheckCircleOutline, ErrorOutline, DataUsage } from '@mui/icons-material';
import { getStatusColor, formatBytes, formatUptime } from './MonitorConfig'; // Assuming these helpers exist

// ============================================================================
// 1. Loading Skeleton Component
// ============================================================================

export const LoadingSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: 3 }}>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress size={80} thickness={3} sx={{ color: alpha(theme.palette.primary.main, 0.2) }} />
        <CircularProgress size={80} thickness={3} sx={{ color: theme.palette.primary.main, position: 'absolute', left: 0, animationDuration: '1.5s' }} />
      </Box>
      <Stack spacing={1} alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Loading System Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fetching real-time platform health data...
        </Typography>
      </Stack>
    </Box>
  );
};

// ============================================================================
// 2. Reusable Stat Card Component
// ============================================================================

interface StatCardProps {
  title: string;
  value: string | number | null | undefined; // Updated type to accept null/undefined
  subtitle?: string;
  icon: React.ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  status = 'info',
  trend,
}) => {
  const theme = useTheme();

  // 🛑 FIX: Safely coerce the value to a string or number, defaulting to 'N/A' or 0
  const displayValue = value === null || value === undefined ? 'N/A' : value;
  
  // Use a fallback for color calculation
  const statusColors = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.primary.main,
  };

  const color = statusColors[status];

  // Logic to safely access number value for non-info statuses
  const numericValue = typeof value === 'string' ? parseFloat(value) : (value || 0);

  return (
    <Card elevation={0} sx={{ height: '100%', border: `1px solid ${theme.palette.divider}`, borderRadius: 3, transition: 'all 0.3s', '&:hover': { borderColor: alpha(color, 0.4), transform: 'translateY(-2px)', boxShadow: `0 8px 24px ${alpha(color, 0.12)}` } }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
              {title}
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: status !== 'info' ? color : 'text.primary' }}>
                {displayValue} {/* Display the safe value */}
              </Typography>
              {/* Trend logic remains the same */}
              {trend && (
                <Typography variant="caption" sx={{ color: trend.direction === 'up' ? theme.palette.success.main : theme.palette.error.main, fontWeight: 600 }}>
                  {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
                </Typography>
              )}
            </Stack>
            {subtitle && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{subtitle}</Typography>}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// --- COMPONENT: Section Header ---
interface SectionHeaderProps { title: string; icon: React.ReactNode; action?: React.ReactNode; }
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, action }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{ color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>{icon}</Box>
        <Typography variant="h6" fontWeight={600}>{title}</Typography>
      </Stack>
      {action}
    </Stack>
  );
};


interface CircularGaugeProps { 
  value: number; 
  label: string; 
  size?: number; 
  thickness?: number; 
  showPercentage?: boolean; 
  thresholds?: { warning: number; critical: number }; 
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({ 
  value, 
  label, 
  size = 140, 
  thickness = 6, 
  showPercentage = true, 
  thresholds = { warning: 70, critical: 90 } 
}) => {
  const theme = useTheme();

  // 1. Defensively convert the prop 'value' to a safe number (defaulting to 0)
  const safeValue = Number(value) || 0; 

  // Determine status color based on the safe value
  // NOTE: getStatusColor relies on a number input
  const status = getStatusColor(safeValue, thresholds); 

  const colorMap = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
  };
  const color = colorMap[status];

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        
        {/* Background circle (100%) */}
        <CircularProgress 
          variant="determinate" 
          value={100} 
          size={size} 
          thickness={thickness} 
          sx={{ color: alpha(color, 0.15) }} 
        />
        
        {/* Foreground circle (Actual Value) - Uses safeValue */}
        <CircularProgress 
          variant="determinate" 
          value={Math.min(safeValue, 100)} // Ensures value is capped at 100
          size={size} 
          thickness={thickness} 
          sx={{ 
            color, 
            position: 'absolute', 
            left: 0, 
            '& .MuiCircularProgress-circle': { 
              strokeLinecap: 'round', 
              transition: 'stroke-dashoffset 0.5s ease-in-out' 
            } 
          }} 
        />
        
        {/* Center content (where the crash happened) */}
        <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {showPercentage && (
            <Typography variant="h4" component="span" sx={{ fontWeight: 700, color, lineHeight: 1 }}>
              {/* 🛑 FIX 2: Round the safe value (Now guaranteed to be a number) */}
              {Math.round(safeValue)}
            </Typography>
          )}
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5 }}>
            {showPercentage ? '%' : label}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600, color: 'text.primary' }}>
        {label}
      </Typography>
    </Box>
  );
};