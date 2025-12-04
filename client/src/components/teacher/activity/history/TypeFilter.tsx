'use client';
import React from 'react';
import { Box, Stack, Typography, Chip, alpha } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WashIcon from '@mui/icons-material/Wash';
import NoteIcon from '@mui/icons-material/Note';

import { COLORS, FilterType } from './HistoryConfig';

export default function TypeFilter({ selected, onSelect }: { selected: FilterType; onSelect: (t: FilterType) => void }) {
  const options = [
    { value: 'all', label: 'All', icon: AllInclusiveIcon },
    { value: 'meals', label: 'Meals', icon: RestaurantIcon },
    { value: 'naps', label: 'Naps', icon: HotelIcon },
    { value: 'photos', label: 'Photos', icon: CameraAltIcon },
    // Add the new chips
    { value: 'learning', label: 'Learning', icon: MenuBookIcon }, 
    { value: 'hygiene', label: 'Hygiene', icon: WashIcon },
    { value: 'notes', label: 'Notes', icon: NoteIcon },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, px: 0.5 }}><FilterListIcon sx={{ fontSize: 18, color: 'text.secondary' }} /><Typography variant="caption" fontWeight={600} color="text.secondary">FILTER BY TYPE</Typography></Box>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {options.map((o) => {
          const isSelected = selected === o.value;
          return <Chip key={o.value} icon={<o.icon sx={{ fontSize: '18px !important' }} />} label={o.label} onClick={() => onSelect(o.value as FilterType)} sx={{ px: 1, fontWeight: 600, fontSize: '0.8rem', bgcolor: isSelected ? COLORS.primary : alpha(COLORS.primary, 0.08), color: isSelected ? 'white' : 'text.primary', '& .MuiChip-icon': { color: isSelected ? 'white' : COLORS.primary } }} />;
        })}
      </Stack>
    </Box>
  );
}