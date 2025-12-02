import React from 'react';
import { Box, Chip, alpha } from '@mui/material';
import { COLORS } from './ChatConfig';

export default function DateSeparator({ date }: { date: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      <Chip label={date} size="small" sx={{ bgcolor: alpha(COLORS.textSecondary, 0.1), color: COLORS.textSecondary, fontWeight: 500, fontSize: '0.7rem' }} />
    </Box>
  );
}