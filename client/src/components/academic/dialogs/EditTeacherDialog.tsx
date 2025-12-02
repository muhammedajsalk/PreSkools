'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Avatar, Box, SelectChangeEvent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { COLORS, mockTeachers, getAvatarColor, getInitials } from '../AcademicConfig';

interface Props {
  open: boolean;
  onClose: () => void;
  currentTeacherId: string;
  onSubmit: (teacherId: string) => void;
  className: string;
}

export default function EditTeacherDialog({ open, onClose, currentTeacherId, onSubmit, className }: Props) {
  const [selectedId, setSelectedId] = useState(currentTeacherId);

  useEffect(() => setSelectedId(currentTeacherId), [currentTeacherId]);

  const handleSubmit = () => {
    onSubmit(selectedId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EditIcon sx={{ color: COLORS.primary }} />
          <Box><Typography variant="h6" fontWeight={600}>Change Teacher</Typography><Typography variant="caption" color="text.secondary">{className}</Typography></Box>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Teacher</InputLabel>
          <Select value={selectedId} label="Select Teacher" onChange={(e) => setSelectedId(e.target.value)}>
            {mockTeachers.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: getAvatarColor(t.name), fontSize: '0.8rem' }}>{getInitials(t.name)}</Avatar>
                  <Box><Typography variant="body2">{t.name}</Typography><Typography variant="caption" color="text.secondary">{t.email}</Typography></Box>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: COLORS.textSecondary }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark } }}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}