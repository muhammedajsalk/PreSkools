'use client';
import React from 'react';
import { Card, CardContent, Box, Typography, Stack, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { adminTheme, StatData } from './AdminConfig';

export default function StatCard({ data }: { data: StatData }) {
  const { title, value, trend, icon, color, subtitle, status } = data;

  return (
    <Card elevation={0} sx={{ height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.06)', position: 'relative', overflow: 'hidden', '&:hover': { boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)', transform: 'translateY(-4px)', borderColor: `${color}30` }, '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${color}, ${color}80)` } }}>
      <CardContent sx={{ p: 3, pt: 3.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.75px', fontSize: '0.7rem', mb: 1.5 }}>{title}</Typography>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: adminTheme.background.dark, letterSpacing: '-1px', fontSize: { xs: '1.75rem', sm: '2rem' } }}>{value}</Typography>
              {subtitle && <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>{subtitle}</Typography>}
            </Stack>
            
            {trend && (
              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', backgroundColor: trend.direction === 'up' ? `${adminTheme.status.success}15` : `${adminTheme.status.error}15` }}>
                  {trend.direction === 'up' ? <TrendingUpIcon sx={{ fontSize: 16, color: adminTheme.status.success }} /> : <TrendingDownIcon sx={{ fontSize: 16, color: adminTheme.status.error }} />}
                </Box>
                <Typography variant="body2" sx={{ color: trend.direction === 'up' ? adminTheme.status.success : adminTheme.status.error, fontWeight: 700, fontSize: '0.85rem' }}>{trend.value}</Typography>
                <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '0.8rem' }}>{trend.label}</Typography>
              </Stack>
            )}
            
            {status && (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: adminTheme.status.success, boxShadow: `0 0 12px ${adminTheme.status.success}`, animation: 'pulse 2s infinite' }} />
                <Typography variant="body2" sx={{ color: adminTheme.status.success, fontWeight: 600, fontSize: '0.8rem' }}>All Systems Operational</Typography>
              </Stack>
            )}
          </Box>
          <Avatar sx={{ width: 60, height: 60, backgroundColor: `${color}12`, color: color, '& .MuiSvgIcon-root': { fontSize: 28 } }}>{icon}</Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}