'use client';
import React from 'react';
import { Paper, Stack, Avatar, Typography, Button, CircularProgress, alpha } from '@mui/material';
import { MOCK_STUDENTS, getAvatarColor, getInitials, COLORS } from './ActivityConfig';

interface Props {
  selectedStudents: string[];
  onSubmit: () => void;
  saving: boolean;
  canSubmit: boolean;
  activityLabel: string;
  activityIcon: React.ReactNode;
  color: string;
}

export default function BottomActionBar({ selectedStudents, onSubmit, saving, canSubmit, activityLabel, activityIcon, color }: Props) {
  return (
    <Paper elevation={8} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, borderRadius: '24px 24px 0 0', bgcolor: COLORS.cardBg, zIndex: 100 }}>
      <Stack spacing={1.5}>
        {selectedStudents.length > 0 && (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Stack direction="row" spacing={-1}>
              {selectedStudents.slice(0, 5).map((id) => {
                const s = MOCK_STUDENTS.find((st) => st.id === id)!;
                return <Avatar key={id} sx={{ width: 28, height: 28, fontSize: '0.7rem', bgcolor: getAvatarColor(s.name, s.gender), border: '2px solid white' }}>{getInitials(s.name)}</Avatar>;
              })}
              {selectedStudents.length > 5 && <Avatar sx={{ width: 28, height: 28, fontSize: '0.65rem', bgcolor: COLORS.textSecondary, border: '2px solid white' }}>+{selectedStudents.length - 5}</Avatar>}
            </Stack>
            <Typography variant="caption" color="text.secondary">{selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected</Typography>
          </Stack>
        )}

        <Button fullWidth variant="contained" size="large" startIcon={saving ? <CircularProgress size={20} color="inherit" /> : activityIcon} onClick={onSubmit} disabled={!canSubmit || saving} sx={{ py: 1.75, borderRadius: 3, bgcolor: canSubmit ? color : COLORS.textSecondary, fontSize: '1.1rem', fontWeight: 700, textTransform: 'none', boxShadow: canSubmit ? `0 4px 14px ${alpha(color, 0.4)}` : 'none', '&:hover': { bgcolor: canSubmit ? alpha(color, 0.9) : COLORS.textSecondary }, '&.Mui-disabled': { bgcolor: alpha(color, 0.3), color: 'white' } }}>
          {saving ? 'Logging...' : selectedStudents.length === 0 ? 'Select Students' : `Log ${activityLabel} for ${selectedStudents.length} Student${selectedStudents.length > 1 ? 's' : ''}`}
        </Button>
      </Stack>
    </Paper>
  );
}