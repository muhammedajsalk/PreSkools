import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { EVENT_TYPE_CONFIGS } from './CalendarConfig';

export default function EventLegend() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', py: 1 }}>
      {Object.entries(EVENT_TYPE_CONFIGS).map(([key, config]) => (
        <Stack key={key} direction="row" alignItems="center" spacing={0.5}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: config.color }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{config.label}</Typography>
        </Stack>
      ))}
    </Box>
  );
}