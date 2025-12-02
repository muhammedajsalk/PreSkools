import React from 'react';
import { Box, Typography, alpha } from '@mui/material';

export default function EmptyState({ icon, title, subtitle, color }: { icon: any; title: string; subtitle: string; color: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, textAlign: 'center' }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: alpha(color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color, mb: 2 }}>{icon}</Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>{title}</Typography>
      <Typography variant="body2" color="text.secondary" maxWidth={300}>{subtitle}</Typography>
    </Box>
  );
}