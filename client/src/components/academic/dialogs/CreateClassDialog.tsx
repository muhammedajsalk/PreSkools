'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Avatar, SelectChangeEvent } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import { COLORS, CreateClassFormData, mockTeachers, getAvatarColor, getInitials } from '../AcademicConfig';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClassFormData) => void;
}

export default function CreateClassDialog({ open, onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState<CreateClassFormData>({ name: '', section: '', teacherId: '', capacity: 25 });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ name: '', section: '', teacherId: '', capacity: 25 });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ClassIcon sx={{ color: COLORS.primary }} />
          <Typography variant="h6" fontWeight={600}>Create New Classroom</Typography>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Class Name" placeholder="e.g., LKG" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <TextField label="Section" placeholder="e.g., A" fullWidth value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} />
          </Stack>
          <FormControl fullWidth>
            <InputLabel>Assign Teacher</InputLabel>
            <Select value={formData.teacherId} label="Assign Teacher" onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}>
              {mockTeachers.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: getAvatarColor(t.name), fontSize: '0.75rem' }}>{getInitials(t.name)}</Avatar>
                    <Typography>{t.name}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Capacity" type="number" fullWidth value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: COLORS.textSecondary }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!formData.name || !formData.section} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark } }}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}