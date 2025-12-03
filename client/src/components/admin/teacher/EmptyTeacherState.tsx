'use client';
import React from 'react';
import { Paper, Avatar, Typography, Button } from '@mui/material';
import { Search, Groups, PersonAdd } from '@mui/icons-material';
import { COLORS } from './TeacherConfig';

interface Props { searchQuery: string; onAdd: () => void; }

export default function EmptyTeacherState({ searchQuery, onAdd }: Props) {
  return (
    <Paper elevation={0} sx={{ p: 8, textAlign: 'center', borderRadius: 4, border: '2px dashed', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Avatar sx={{ width: 80, height: 80, bgcolor: COLORS.tealLight, color: COLORS.tealDark, mx: 'auto', mb: 3 }}>{searchQuery ? <Search sx={{ fontSize: 40 }} /> : <Groups sx={{ fontSize: 40 }} />}</Avatar>
      <Typography variant="h5" fontWeight={600} gutterBottom>{searchQuery ? 'No teachers found' : 'No teachers added yet'}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>{searchQuery ? `No matches for "${searchQuery}"` : 'Start building your team.'}</Typography>
      {!searchQuery && <Button variant="outlined" size="large" startIcon={<PersonAdd />} onClick={onAdd} sx={{ borderColor: COLORS.teal, color: COLORS.teal, borderWidth: 2, '&:hover': { borderColor: COLORS.tealDark, bgcolor: COLORS.tealLighter, borderWidth: 2 } }}>Add Your First Teacher</Button>}
    </Paper>
  );
}