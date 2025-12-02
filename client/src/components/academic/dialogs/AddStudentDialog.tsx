'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Divider, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Chip, SelectChangeEvent,Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { COLORS, AddStudentFormData } from '../AcademicConfig';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddStudentFormData) => void;
  className: string;
}

export default function AddStudentDialog({ open, onClose, onSubmit, className }: Props) {
  const [formData, setFormData] = useState<AddStudentFormData>({ name: '', admissionNo: '', gender: 'male', parentName: '', parentPhone: '', dateOfBirth: '' });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ name: '', admissionNo: '', gender: 'male', parentName: '', parentPhone: '', dateOfBirth: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon sx={{ color: COLORS.secondary }} />
          <Box><Typography variant="h6" fontWeight={600}>Add New Student</Typography><Typography variant="caption" color="text.secondary">to {className}</Typography></Box>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          <TextField label="Full Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Admission No" fullWidth value={formData.admissionNo} onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })} />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select value={formData.gender} label="Gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}>
                <MenuItem value="male"><Stack direction="row" spacing={1}><MaleIcon sx={{ color: COLORS.male }} /><span>Male</span></Stack></MenuItem>
                <MenuItem value="female"><Stack direction="row" spacing={1}><FemaleIcon sx={{ color: COLORS.female }} /><span>Female</span></Stack></MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField label="Date of Birth" type="date" fullWidth value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} InputLabelProps={{ shrink: true }} />
          <Divider><Chip label="Parent Details" size="small" /></Divider>
          <TextField label="Parent Name" fullWidth value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} />
          <TextField label="Parent Phone" fullWidth value={formData.parentPhone} onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment> }} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: COLORS.textSecondary }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!formData.name} sx={{ bgcolor: COLORS.secondary, '&:hover': { bgcolor: COLORS.secondaryDark } }}>Add Student</Button>
      </DialogActions>
    </Dialog>
  );
}