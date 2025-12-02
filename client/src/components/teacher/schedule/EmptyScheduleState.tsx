'use client';
import React from 'react';
import { Box, Typography, Button, alpha } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from './ScheduleConfig';

export default function EmptyScheduleState({ onAdd }: { onAdd: () => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, textAlign: 'center' }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <ScheduleIcon sx={{ fontSize: 40, color: COLORS.primary }} />
      </Box>
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>No Activities</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>Start building your daily schedule</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark } }}>Add First Activity</Button>
    </Box>
  );
}