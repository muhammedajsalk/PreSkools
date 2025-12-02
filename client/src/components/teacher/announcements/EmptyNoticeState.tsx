'use client';
import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { COLORS } from './AnnouncementConfig';

export default function EmptyNoticeState() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 8, 
        textAlign: 'center' 
      }}
    >
      <Box 
        sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          bgcolor: alpha(COLORS.teacher, 0.1), 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2,
          color: COLORS.teacher
        }}
      >
        <NotificationsOffIcon sx={{ fontSize: 40 }} />
      </Box>
      <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
        No Notices Yet
      </Typography>
      <Typography variant="body2" color="text.secondary" maxWidth={300}>
        There are no announcements to display at the moment. Check back later or create a new notice.
      </Typography>
    </Box>
  );
}