'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from './ChatConfig';

export default function TypingIndicator({ name }: { name: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1 }}>
      <Box sx={{ display: 'flex', gap: 0.5, p: 1.5, bgcolor: COLORS.receivedBubble, borderRadius: 3, borderTopLeftRadius: 6 }}>
        {[0, 1, 2].map((i) => <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS.textSecondary, animation: 'bounce 1.4s infinite', animationDelay: `${i * 0.2}s`, '@keyframes bounce': { '0%, 60%, 100%': { transform: 'translateY(0)' }, '30%': { transform: 'translateY(-4px)' } } }} />)}
      </Box>
      <Typography variant="caption" color="text.secondary">{name} is typing...</Typography>
    </Box>
  );
}