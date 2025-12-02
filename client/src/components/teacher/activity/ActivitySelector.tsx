'use client';
import React from 'react';
import { Box, Stack, Chip, alpha } from '@mui/material';
import { ACTIVITY_CONFIGS, ActivityType } from './ActivityConfig';

interface Props {
  selectedActivity: ActivityType;
  onSelect: (id: ActivityType) => void;
}

export default function ActivitySelector({ selectedActivity, onSelect }: Props) {
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, pb: 2, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <Stack direction="row" spacing={1}>
        {ACTIVITY_CONFIGS.map((config) => {
          const isSelected = selectedActivity === config.id;
          return (
            <Chip
              key={config.id}
              icon={<Box sx={{ display: 'flex', color: isSelected ? 'white' : config.color }}>{config.icon}</Box>}
              label={config.label}
              onClick={() => onSelect(config.id)}
              sx={{ px: 1, py: 2.5, borderRadius: 3, fontSize: '0.9rem', fontWeight: 600, border: '2px solid', borderColor: isSelected ? config.color : 'transparent', bgcolor: isSelected ? config.color : config.bgColor, color: isSelected ? 'white' : config.color, '&:hover': { bgcolor: isSelected ? config.color : alpha(config.color, 0.2) }, '& .MuiChip-icon': { marginLeft: '8px' } }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}