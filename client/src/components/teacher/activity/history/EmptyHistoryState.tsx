'use client';
import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import { Dayjs } from 'dayjs';
import { COLORS } from './HistoryConfig';

interface Props {
  date: Dayjs;
}

export default function EmptyHistoryState({ date }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          bgcolor: alpha(COLORS.primary, 0.1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <NotesIcon sx={{ fontSize: 48, color: COLORS.primary }} />
      </Box>
      
      <Typography
        variant="h6"
        fontWeight={700}
        color="text.primary"
        gutterBottom
      >
        No Activities Found
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
        There are no activities logged for <strong>{date.format('MMMM D, YYYY')}</strong>. 
        Any updates posted by teachers will appear here.
      </Typography>
    </Box>
  );
}