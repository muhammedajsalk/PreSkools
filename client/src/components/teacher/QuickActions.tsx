'use client';
import React from 'react';
import { Box, Typography, Card, CardActionArea, Badge, alpha } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChatIcon from '@mui/icons-material/Chat';
import { COLORS } from './TeacherConfig';

const actions = [
  { id: 'attendance', label: 'Attendance', icon: <HowToRegIcon sx={{ fontSize: 32 }} />, color: COLORS.primary, bg: alpha(COLORS.primary, 0.1) },
  { id: 'activity', label: 'Log Activity', icon: <RestaurantIcon sx={{ fontSize: 32 }} />, color: COLORS.secondary, bg: alpha(COLORS.secondary, 0.1) },
  { id: 'photo', label: 'Upload Photo', icon: <PhotoCameraIcon sx={{ fontSize: 32 }} />, color: COLORS.info, bg: alpha(COLORS.info, 0.1) },
  { id: 'message', label: 'Message', icon: <ChatIcon sx={{ fontSize: 32 }} />, color: COLORS.purple, bg: alpha(COLORS.purple, 0.1), badge: 5 },
];

export default function QuickActions() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>Quick Actions</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {actions.map((act) => (
          <Box key={act.id} sx={{ width: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' }, minWidth: 140 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, '&:hover': { borderColor: act.color } }}>
              <CardActionArea onClick={() => console.log(act.id)} sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Badge badgeContent={act.badge} color="error">
                  <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: act.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, color: act.color }}>{act.icon}</Box>
                </Badge>
                <Typography variant="subtitle1" fontWeight={600} align="center">{act.label}</Typography>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}