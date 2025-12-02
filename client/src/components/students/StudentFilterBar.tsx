'use client';
import React from 'react';
import { Card, CardContent, Stack, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Box, Typography, Divider, Chip, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import FilterListIcon from '@mui/icons-material/FilterList';
import { COLORS, CLASS_OPTIONS, StatusType } from './StudentConfig';

interface Props {
  searchQuery: string; setSearchQuery: (q: string) => void;
  classFilter: string; setClassFilter: (c: string) => void;
  statusFilter: StatusType; setStatusFilter: (s: StatusType) => void;
  stats: { total: number; active: number; filtered: number };
}

export default function StudentFilterBar({ searchQuery, setSearchQuery, classFilter, setClassFilter, statusFilter, setStatusFilter, stats }: Props) {
  return (
    <Card elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: COLORS.divider, borderRadius: 2 }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
            <TextField placeholder="Search by name, admission no, or parent..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} size="small" sx={{ flex: { xs: 1, md: 2 }, minWidth: { sm: 300 }, '& .MuiOutlinedInput-root': { bgcolor: 'white' } }} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /></InputAdornment>) }} />
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Class</InputLabel>
              <Select value={classFilter} label="Class" onChange={(e: SelectChangeEvent) => setClassFilter(e.target.value)} sx={{ bgcolor: 'white' }}>
                <MenuItem value="all"><Stack direction="row" alignItems="center" spacing={1}><SchoolIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /><span>All Classes</span></Stack></MenuItem>
                {CLASS_OPTIONS.map((cls) => (<MenuItem key={cls.id} value={cls.id}>{cls.displayName}</MenuItem>))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value as StatusType)} sx={{ bgcolor: 'white' }}>
                <MenuItem value="all"><Stack direction="row" alignItems="center" spacing={1}><FilterListIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /><span>All Status</span></Stack></MenuItem>
                <MenuItem value="active"><Chip label="Active" size="small" sx={{ bgcolor: COLORS.successLight, color: COLORS.success, fontWeight: 500 }} /></MenuItem>
                <MenuItem value="alumni"><Chip label="Alumni" size="small" sx={{ bgcolor: COLORS.infoLight, color: COLORS.info, fontWeight: 500 }} /></MenuItem>
                <MenuItem value="dropped"><Chip label="Dropped" size="small" sx={{ bgcolor: COLORS.errorLight, color: COLORS.error, fontWeight: 500 }} /></MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ textAlign: 'center' }}><Typography variant="h5" fontWeight={700} color={COLORS.primary}>{stats.total}</Typography><Typography variant="caption" color="text.secondary">Total Students</Typography></Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: 'center' }}><Typography variant="h5" fontWeight={700} color={COLORS.success}>{stats.active}</Typography><Typography variant="caption" color="text.secondary">Active</Typography></Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: 'center' }}><Typography variant="h5" fontWeight={700} color={COLORS.secondary}>{stats.filtered}</Typography><Typography variant="caption" color="text.secondary">Showing</Typography></Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}