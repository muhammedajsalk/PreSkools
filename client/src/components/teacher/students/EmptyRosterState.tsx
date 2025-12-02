import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { COLORS } from './RosterConfig';

export default function EmptyRosterState() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, textAlign: 'center' }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <ChildCareIcon sx={{ fontSize: 40, color: COLORS.primary }} />
      </Box>
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>No Students Found</Typography>
      <Typography variant="body2" color="text.secondary">Try adjusting your search query</Typography>
    </Box>
  );
}