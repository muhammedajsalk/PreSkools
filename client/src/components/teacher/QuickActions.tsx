'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { Box, Typography, Card, CardActionArea, Badge, alpha } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChatIcon from '@mui/icons-material/Chat';
import { COLORS } from './TeacherConfig';

// Define the core actions structure with the navigation path
const rawActions = [
  { id: 'attendance', label: 'Attendance', path: '/teacher/attendance', icon: <HowToRegIcon sx={{ fontSize: 32 }} />, color: COLORS.primary, bg: alpha(COLORS.primary, 0.1), badge: 0 },
  { id: 'activity', label: 'Log Activity', path: '/teacher/activity', icon: <RestaurantIcon sx={{ fontSize: 32 }} />, color: COLORS.secondary, bg: alpha(COLORS.secondary, 0.1), badge: 0 },
  { id: 'photo', label: 'Upload Photo', path: '/teacher/activity?tab=photo', icon: <PhotoCameraIcon sx={{ fontSize: 32 }} />, color: COLORS.info, bg: alpha(COLORS.info, 0.1), badge: 0 },
  { id: 'message', label: 'Message', path: '/teacher/messages', icon: <ChatIcon sx={{ fontSize: 32 }} />, color: COLORS.purple, bg: alpha(COLORS.purple, 0.1), badge: 5 },
];

export default function QuickActions() {
  const router = useRouter();

  // 2. Map actions to include click handler logic
  const actions = useMemo(() => {
    return rawActions.map(action => ({
      ...action,
      // Placeholder for dynamic badge data (e.g., fetch real unread count)
      badge: action.id === 'message' ? 5 : 0, 
    }));
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>Quick Actions</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {actions.map((act) => (
          <Box key={act.id} sx={{ width: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' }, minWidth: 140 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, '&:hover': { borderColor: act.color } }}>
              {/* 3. Use router.push(path) in the onClick handler */}
              <CardActionArea 
                onClick={() => router.push(act.path)} 
                sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
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