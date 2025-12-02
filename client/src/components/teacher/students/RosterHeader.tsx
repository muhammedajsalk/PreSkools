'use client';
import React from 'react';
import { Box, Stack, Typography, Chip, TextField, InputAdornment, ToggleButtonGroup, ToggleButton, Tooltip, alpha } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { COLORS, CLASS_INFO, ViewMode } from './RosterConfig';

const StatsCard = ({ icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.08), minWidth: 120 }}>
    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(color, 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</Box>
    <Box><Typography variant="h6" fontWeight={700} color="text.primary">{value}</Typography><Typography variant="caption" color="text.secondary">{label}</Typography></Box>
  </Box>
);

interface Props {
  stats: { present: number; absent: number; boys: number; girls: number };
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
}

export default function RosterHeader({ stats, searchQuery, setSearchQuery, viewMode, setViewMode }: Props) {
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" fontWeight={700} color="text.primary">My Classroom</Typography>
            <Chip label={`${CLASS_INFO.name}-${CLASS_INFO.section}`} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 600 }} />
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={0.5}>Total Students: {CLASS_INFO.totalStudents}</Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1, mx: -2, px: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
        <StatsCard icon={<GroupsIcon />} label="Present Today" value={stats.present} color={COLORS.success} />
        <StatsCard icon={<PersonIcon />} label="Absent" value={stats.absent} color={COLORS.error} />
        <StatsCard icon={<MaleIcon />} label="Boys" value={stats.boys} color={COLORS.male} />
        <StatsCard icon={<FemaleIcon />} label="Girls" value={stats.girls} color={COLORS.female} />
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField fullWidth size="small" placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: COLORS.textSecondary }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: COLORS.background, '&.Mui-focused': { bgcolor: 'white' } } }} />
          <ToggleButtonGroup value={viewMode} exclusive onChange={(_, m) => m && setViewMode(m)} size="small" sx={{ bgcolor: COLORS.background }}>
            <ToggleButton value="grid"><Tooltip title="Grid View"><GridViewIcon /></Tooltip></ToggleButton>
            <ToggleButton value="list"><Tooltip title="List View"><ViewListIcon /></Tooltip></ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
}