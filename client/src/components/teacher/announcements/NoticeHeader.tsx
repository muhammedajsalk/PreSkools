'use client';
import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, alpha } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from './AnnouncementConfig';

export default function NoticeHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'grey.200' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(COLORS.teacher, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.teacher }}><CampaignIcon /></Box>
        <Box sx={{ flexGrow: 1 }}><Typography variant="h5" color="grey.900" fontWeight={700}>Notice Board</Typography><Typography variant="body2" color="grey.500">Announcements</Typography></Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd} sx={{ bgcolor: COLORS.teacher, fontWeight: 600 }}>Post</Button>
      </Toolbar>
    </AppBar>
  );
}