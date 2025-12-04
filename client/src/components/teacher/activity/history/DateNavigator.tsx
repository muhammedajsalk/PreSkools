'use client';
import React from 'react';
import { Box, IconButton, Typography, alpha } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Dayjs } from 'dayjs';
import { COLORS } from './HistoryConfig';

interface Props { selectedDate: Dayjs; onDateChange: (d: Dayjs) => void; onOpenPicker: () => void; }

export default function DateNavigator({ selectedDate, onDateChange, onOpenPicker }: Props) {
  const getDateLabel = () => {
    // Use type assertion or ensure plugins are loaded in page.tsx
    if ((selectedDate as any).isToday?.()) return 'Today';
    if ((selectedDate as any).isYesterday?.()) return 'Yesterday';
    return selectedDate.format('ddd, MMM D');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1 }}>
      <IconButton onClick={() => onDateChange(selectedDate.subtract(1, 'day'))} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1) }}><ChevronLeftIcon sx={{ color: COLORS.primary }} /></IconButton>
      <Box onClick={onOpenPicker} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, borderRadius: 3, bgcolor: alpha(COLORS.primary, 0.08), cursor: 'pointer', minWidth: 140, justifyContent: 'center' }}>
        <ScheduleIcon sx={{ fontSize: 18, color: COLORS.primary }} />
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: COLORS.primaryDark }}>{getDateLabel()}</Typography>
      </Box>
      <IconButton onClick={() => onDateChange(selectedDate.add(1, 'day'))} disabled={(selectedDate as any).isToday?.()} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1) }}><ChevronRightIcon sx={{ color: COLORS.primary }} /></IconButton>
    </Box>
  );
}