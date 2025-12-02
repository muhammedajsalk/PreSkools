'use client';
import React from 'react';
import { Box, alpha } from '@mui/material';
import { COLORS } from './ScheduleConfig';

interface Props { isFirst: boolean; isLast: boolean; isCurrent: boolean; isPast: boolean; color: string; }

export default function TimelineConnector({ isFirst, isLast, isCurrent, isPast, color }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
      <Box sx={{ width: 2, height: 20, bgcolor: isFirst ? 'transparent' : isPast ? COLORS.divider : alpha(color, 0.3) }} />
      <Box sx={{ width: isCurrent ? 16 : 12, height: isCurrent ? 16 : 12, borderRadius: '50%', bgcolor: isCurrent ? color : isPast ? COLORS.divider : alpha(color, 0.5), border: isCurrent ? `3px solid ${alpha(color, 0.3)}` : 'none', flexShrink: 0, boxShadow: isCurrent ? `0 0 0 4px ${alpha(color, 0.2)}` : 'none', animation: isCurrent ? 'pulseRing 2s infinite' : 'none', '@keyframes pulseRing': { '0%, 100%': { boxShadow: `0 0 0 4px ${alpha(color, 0.2)}` }, '50%': { boxShadow: `0 0 0 8px ${alpha(color, 0.1)}` } } }} />
      <Box sx={{ width: 2, flex: 1, minHeight: 40, bgcolor: isLast ? 'transparent' : COLORS.divider }} />
    </Box>
  );
}