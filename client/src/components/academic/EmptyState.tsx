import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { COLORS } from './AcademicConfig';

export default function EmptyState() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 400, p: 4, textAlign: 'center' }}>
      <Box sx={{ width: 120, height: 120, borderRadius: '50%', bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <SchoolIcon sx={{ fontSize: 60, color: COLORS.primary }} />
      </Box>
      <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>Select a Classroom</Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={300}>Choose a classroom from the list on the left to view student details.</Typography>
    </Box>
  );
}