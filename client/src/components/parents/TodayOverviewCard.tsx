'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, Divider, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoodIcon from '@mui/icons-material/Mood';
import ActivityIcon from '@mui/icons-material/DirectionsRun';
import TempIcon from '@mui/icons-material/Thermostat';
import { COLORS, TodayOverview } from './ParentConfig';

export default function TodayOverviewCard({ overview, childName, isCompact = false }: { overview: TodayOverview; childName: string; isCompact?: boolean }) {
  return (
    <Card elevation={0} sx={{ borderRadius: 5, overflow: 'hidden', background: COLORS.gradientPrimary, color: 'white', boxShadow: `0 10px 40px ${alpha(COLORS.primary, 0.3)}` }}>
      <CardContent sx={{ p: isCompact ? 2.5 : 3 }}>
        <Stack spacing={isCompact ? 2 : 2.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1 }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</Typography>
              <Typography variant={isCompact ? 'h6' : 'h5'} fontWeight={700}>{childName}'s Day</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip icon={<MoodIcon sx={{ color: 'white !important', fontSize: 16 }} />} label="Happy" size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600, '& .MuiChip-icon': { color: 'white' } }} />
              <Chip icon={<CheckCircleIcon sx={{ color: 'white !important', fontSize: 16 }} />} label="Present" size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600, '& .MuiChip-icon': { color: 'white' } }} />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ bgcolor: alpha('#fff', 0.12), borderRadius: 3, p: 2 }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mb={0.5}><CheckCircleIcon sx={{ fontSize: 18, opacity: 0.8 }} /><Typography variant="caption" sx={{ opacity: 0.85 }}>Checked In</Typography></Stack>
              <Typography variant="h6" fontWeight={700}>{overview.checkInTime}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: alpha('#fff', 0.2) }} />
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mb={0.5}><ActivityIcon sx={{ fontSize: 18, opacity: 0.8 }} /><Typography variant="caption" sx={{ opacity: 0.85 }}>Currently</Typography></Stack>
              <Typography variant="h6" fontWeight={700}>{overview.currentActivity}</Typography>
            </Box>
          </Stack>

          <Box sx={{ bgcolor: alpha('#fff', 0.12), borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: alpha('#fff', 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AccessTimeIcon sx={{ fontSize: 20 }} /></Box>
              <Box><Typography variant="caption" sx={{ opacity: 0.8 }}>Coming Up Next</Typography><Typography variant="subtitle2" fontWeight={600}>{overview.nextActivity}</Typography></Box>
            </Stack>
            <Chip label={overview.nextActivityTime} size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 700 }} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}