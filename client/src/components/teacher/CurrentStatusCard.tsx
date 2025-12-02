'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, LinearProgress, alpha } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { COLORS, ClassStatus } from './TeacherConfig';

const getConfig = (status: string) => {
  if (status === 'nap') return { color: COLORS.napTime, icon: <HotelIcon sx={{ fontSize: 32 }} />, emoji: '😴' };
  if (status === 'play') return { color: COLORS.playTime, icon: <DirectionsRunIcon sx={{ fontSize: 32 }} />, emoji: '🎮' };
  if (status === 'learn') return { color: COLORS.learnTime, icon: <MenuBookIcon sx={{ fontSize: 32 }} />, emoji: '📚' };
  if (status === 'meal') return { color: COLORS.mealTime, icon: <RestaurantIcon sx={{ fontSize: 32 }} />, emoji: '🍽️' };
  return { color: COLORS.textSecondary, icon: <ChildCareIcon sx={{ fontSize: 32 }} />, emoji: '🌟' };
};

export default function CurrentStatusCard({ status }: { status: ClassStatus }) {
  const config = getConfig(status.current);
  return (
    <Card elevation={0} sx={{ border: '2px solid', borderColor: config.color, borderRadius: 4, bgcolor: alpha(config.color, 0.1) }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 1 }}><Typography variant="h3">{config.emoji}</Typography></Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700} sx={{ color: config.color }}>{status.label}</Typography>
            <Typography variant="body2" color="text.secondary">{status.startTime} - {status.endTime}</Typography>
            <Box sx={{ mt: 1.5 }}>
              <LinearProgress variant="determinate" value={status.progress} sx={{ height: 8, borderRadius: 4, bgcolor: alpha(config.color, 0.2), '& .MuiLinearProgress-bar': { bgcolor: config.color, borderRadius: 4 } }} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{status.progress}% complete</Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}