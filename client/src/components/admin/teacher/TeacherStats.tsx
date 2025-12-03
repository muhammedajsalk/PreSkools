import React from 'react';
import { Stack, Chip } from '@mui/material';
import { Groups, CheckCircle, Warning } from '@mui/icons-material';
import { COLORS } from './TeacherConfig';

interface Props { total: number; active: number; unassigned: number; }

export default function TeacherStats({ total, active, unassigned }: Props) {
  return (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
      <Chip icon={<Groups style={{fontSize:18}} />} label={`Total: ${total}`} sx={{ bgcolor: COLORS.tealLight, color: COLORS.tealDark, fontWeight: 600 }} />
      <Chip icon={<CheckCircle style={{fontSize:18}} />} label={`Active: ${active}`} sx={{ bgcolor: COLORS.successLight, color: '#2E7D32', fontWeight: 600, '& .MuiChip-icon': { color: '#2E7D32' } }} />
      <Chip icon={<Warning style={{fontSize:18}} />} label={`Unassigned: ${unassigned}`} sx={{ bgcolor: COLORS.orangeLight, color: COLORS.orangeDark, fontWeight: 600, '& .MuiChip-icon': { color: COLORS.orangeDark } }} />
    </Stack>
  );
}