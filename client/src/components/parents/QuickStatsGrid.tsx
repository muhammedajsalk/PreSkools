'use client';
import React from 'react';
import { Box, Card, CardContent, Stack, Typography, alpha } from '@mui/material';
import { QuickStat, COLORS } from './ParentConfig';

export default function QuickStatsGrid({ stats }: { stats: QuickStat[] }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {stats.map((stat) => (
        <Card key={stat.id} elevation={0} sx={{ flex: '1 1 calc(50% - 8px)', minWidth: 140, border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, transition: 'all 0.2s ease', '&:hover': { borderColor: stat.color, transform: 'translateY(-2px)', boxShadow: `0 4px 12px ${alpha(stat.color, 0.15)}` } }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: alpha(stat.color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>{stat.icon}</Box>
              <Box><Typography variant="h6" fontWeight={700} color="text.primary">{stat.value}</Typography><Typography variant="caption" color="text.secondary">{stat.label}</Typography></Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}