'use client';
import React from 'react';
import { Box, Stack, Typography, Badge, IconButton, Chip, alpha } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLORS, TeacherData, getGreeting } from './TeacherConfig';

export default function TeacherHeader({ teacher }: { teacher: TeacherData }) {
  const attendancePct = Math.round((teacher.presentStudents / teacher.totalStudents) * 100);

  return (
    <Box sx={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`, color: 'white', pt: { xs: 3, sm: 4 }, pb: { xs: 5, sm: 6 }, px: { xs: 2, sm: 3 }, borderRadius: '0 0 32px 32px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
            <WbSunnyIcon sx={{ fontSize: 20, color: COLORS.secondaryLight }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>{getGreeting()}</Typography>
          </Stack>
          <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>{teacher.firstName}! 👋</Typography>
        </Box>
        <Badge badgeContent={teacher.pendingTasks} color="error">
          <IconButton sx={{ bgcolor: alpha('#fff', 0.15), color: 'white', '&:hover': { bgcolor: alpha('#fff', 0.25) } }}><NotificationsIcon /></IconButton>
        </Badge>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ bgcolor: alpha('#fff', 0.15), borderRadius: 3, p: 2, backdropFilter: 'blur(10px)' }}>
        <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GroupsIcon sx={{ fontSize: 32, color: COLORS.primary }} /></Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight={700}>{teacher.className}-{teacher.section}</Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CheckCircleIcon sx={{ fontSize: 16, color: COLORS.successLight }} />
            <Typography variant="body2"><strong>{teacher.presentStudents}</strong>/{teacher.totalStudents} Present</Typography>
            <Chip label={`${attendancePct}%`} size="small" sx={{ ml: 1, height: 20, fontSize: '0.7rem', fontWeight: 700, bgcolor: attendancePct >= 90 ? COLORS.success : COLORS.warning, color: 'white' }} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}