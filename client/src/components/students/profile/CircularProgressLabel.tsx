import React from 'react';
import { Box, CircularProgress, Typography, alpha } from '@mui/material';
import { COLORS } from './ProfileConfig';

export default function CircularProgressWithLabel({ value }: { value: number }) {
  const color = value >= 90 ? COLORS.success : value >= 75 ? COLORS.warning : COLORS.error;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={100} size={80} thickness={4} sx={{ color: alpha(color, 0.15) }} />
      <CircularProgress variant="determinate" value={value} size={80} thickness={4} sx={{ color, position: 'absolute', left: 0 }} />
      <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" fontWeight={700} color="text.primary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}