import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import { COLORS } from './StudentConfig';

export default function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, px: 3, textAlign: 'center' }}>
      <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <GroupsIcon sx={{ fontSize: 50, color: COLORS.primary }} />
      </Box>
      <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>No Students Found</Typography>
      <Typography variant="body2" color="text.secondary" maxWidth={400}>
        {searchQuery ? `No students match your search "${searchQuery}".` : 'No students match the current filters.'}
      </Typography>
    </Box>
  );
}