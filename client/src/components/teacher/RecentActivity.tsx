'use client';
import React from 'react';
import { Box, Stack, Typography, Card, CardContent, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ChatIcon from '@mui/icons-material/Chat';
import { COLORS, RecentLog } from './TeacherConfig';

const getIcon = (type: string) => {
  if (type === 'meal') return <RestaurantIcon sx={{ color: COLORS.secondary }} />;
  if (type === 'photo') return <PhotoCameraIcon sx={{ color: COLORS.info }} />;
  if (type === 'attendance') return <HowToRegIcon sx={{ color: COLORS.primary }} />;
  return <ChatIcon sx={{ color: COLORS.purple }} />;
};

export default function RecentActivity({ logs }: { logs: RecentLog[] }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight={700}>Today's Activity</Typography>
        <Typography variant="body2" sx={{ color: COLORS.primary, display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>See All <ArrowForwardIcon sx={{ fontSize: 16 }} /></Typography>
      </Stack>
      <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3 }}>
        <CardContent sx={{ p: 2.5 }}>
          {logs.slice(0, 3).map((log, i) => (
            <Box key={log.id} sx={{ display: 'flex', gap: 2, pb: i === logs.length - 1 ? 0 : 2, mb: i === logs.length - 1 ? 0 : 2, borderBottom: i === logs.length - 1 ? 'none' : '1px solid', borderColor: COLORS.divider }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(COLORS.textSecondary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{getIcon(log.type)}</Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between"><Typography variant="subtitle2" fontWeight={600}>{log.title}</Typography><Typography variant="caption" color="text.secondary">{log.time}</Typography></Stack>
                <Typography variant="body2" color="text.secondary" noWrap>{log.description}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}