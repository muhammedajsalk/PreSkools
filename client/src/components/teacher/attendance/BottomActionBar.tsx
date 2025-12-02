'use client';
import React from 'react';
import { Paper, Stack, Chip, Button, Typography, CircularProgress, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SaveIcon from '@mui/icons-material/Save';
import { COLORS } from './AttendanceConfig';

interface Props {
  stats: { present: number; absent: number; late: number; unmarked: number };
  onSave: () => void;
  saving: boolean;
}

export default function BottomActionBar({ stats, onSave, saving }: Props) {
  const isAllMarked = stats.unmarked === 0;

  return (
    <Paper elevation={8} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, borderRadius: '24px 24px 0 0', bgcolor: COLORS.cardBg, zIndex: 100 }}>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ pb: 1 }}>
          <Chip icon={<CheckCircleIcon sx={{ fontSize: 16 }} />} label={`${stats.present} Present`} size="small" sx={{ bgcolor: COLORS.presentBg, color: COLORS.present, fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }} />
          <Chip icon={<CancelIcon sx={{ fontSize: 16 }} />} label={`${stats.absent} Absent`} size="small" sx={{ bgcolor: COLORS.absentBg, color: COLORS.absent, fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }} />
          <Chip icon={<AccessTimeIcon sx={{ fontSize: 16 }} />} label={`${stats.late} Late`} size="small" sx={{ bgcolor: COLORS.lateBg, color: COLORS.late, fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }} />
        </Stack>

        <Button fullWidth variant="contained" size="large" startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} onClick={onSave} disabled={saving} sx={{ py: 1.75, borderRadius: 3, bgcolor: isAllMarked ? COLORS.primary : COLORS.textSecondary, fontSize: '1.1rem', fontWeight: 700, textTransform: 'none', boxShadow: isAllMarked ? `0 4px 14px ${alpha(COLORS.primary, 0.4)}` : 'none', '&:hover': { bgcolor: isAllMarked ? COLORS.primaryDark : COLORS.textSecondary } }}>
          {saving ? 'Saving...' : isAllMarked ? 'Save Attendance' : `${stats.unmarked} Students Remaining`}
        </Button>

        {!isAllMarked && <Typography variant="caption" color="text.secondary" textAlign="center">Please mark all students before saving</Typography>}
      </Stack>
    </Paper>
  );
}