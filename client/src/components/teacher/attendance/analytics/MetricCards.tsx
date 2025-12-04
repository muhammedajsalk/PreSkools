'use client';
import React from 'react';
import { Card, CardContent, Box, Typography, CircularProgress, alpha } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { COLORS } from './AnalyticsConfig';

interface Props { 
  metrics: { avgAttendance: number; totalLate: number; totalAbsent: number; }; 
  periodLabel: string; 
}

const MetricCard = ({ title, value, subtitle, color, bgColor, icon, isPercentage = false }: any) => (
  <Card elevation={0} sx={{ height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 24px ${alpha(color, 0.2)}`, borderColor: color } }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>{title}</Typography>
          {isPercentage ? (
            <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2, mb: 1 }}>
              <CircularProgress variant="determinate" value={100} size={90} thickness={5} sx={{ color: alpha(color, 0.15) }} />
              <CircularProgress variant="determinate" value={Number(value)} size={90} thickness={5} sx={{ color, position: 'absolute', left: 0 }} />
              <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="h5" fontWeight={700} color={color}>{value}%</Typography></Box>
            </Box>
          ) : (
            <Typography variant="h3" fontWeight={800} sx={{ mt: 2, mb: 1, color, lineHeight: 1 }}>{value}</Typography>
          )}
          {subtitle && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{subtitle}</Typography>}
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{React.cloneElement(icon, { sx: { color, fontSize: 28 } })}</Box>
      </Box>
    </CardContent>
  </Card>
);

export default function MetricCards({ metrics, periodLabel }: Props) {
  return (
    // ✅ FIXED: Replaced Grid with CSS Grid Box Layout
    <Box 
      sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, // Responsive columns
        gap: 3, 
        mb: 3 
      }}
    >
      <MetricCard 
        title="Average Attendance" 
        value={metrics.avgAttendance} 
        subtitle={`Based on ${periodLabel}`} 
        color={COLORS.present} 
        bgColor={COLORS.presentLight} 
        icon={<TrendingUpIcon />} 
        isPercentage 
      />
      <MetricCard 
        title="Total Late" 
        value={metrics.totalLate} 
        subtitle="Students arrived late" 
        color={COLORS.late} 
        bgColor={COLORS.lateLight} 
        icon={<AccessTimeIcon />} 
      />
      <MetricCard 
        title="Total Absent" 
        value={metrics.totalAbsent} 
        subtitle="Absences recorded" 
        color={COLORS.absent} 
        bgColor={COLORS.absentLight} 
        icon={<PersonOffIcon />} 
      />
    </Box>
  );
}