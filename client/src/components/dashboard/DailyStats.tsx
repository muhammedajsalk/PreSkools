'use client';
import React from 'react';
import { Stack, Card, CardContent, Box, Typography, Chip, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { brandColors, DailyStat } from './DashboardConfig';

const StatCard = ({ stat }: { stat: DailyStat }) => (
  <Card elevation={0} sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(25% - 18px)' }, borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 28px ${stat.color}20`, borderColor: `${stat.color}40` }, '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: stat.color } }}>
    <CardContent sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: brandColors.background.dark, letterSpacing: '-1px', mt: 0.75, fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>{stat.value}</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.75rem' }}>{stat.subtitle}</Typography>
            {stat.trend && (
              <Chip size="small" icon={stat.trend.direction === 'up' ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />} label={stat.trend.value} sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, bgcolor: stat.trend.direction === 'up' ? brandColors.stats.green.light : brandColors.stats.orange.light, color: stat.trend.direction === 'up' ? brandColors.stats.green.dark : brandColors.stats.orange.dark, '& .MuiChip-icon': { color: 'inherit' } }} />
            )}
          </Stack>
        </Box>
        <Avatar sx={{ width: 52, height: 52, backgroundColor: stat.bgColor, color: stat.color }}>{stat.icon}</Avatar>
      </Stack>
    </CardContent>
  </Card>
);

export default function DailyStats({ stats }: { stats: DailyStat[] }) {
  return (
    <Stack direction="row" sx={{ mb: 3, flexWrap: 'wrap', gap: 2 }}>
      {stats.map((stat) => <StatCard key={stat.id} stat={stat} />)}
    </Stack>
  );
}