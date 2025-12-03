'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Box, Typography, IconButton, Avatar, InputAdornment, Alert, Fade } from '@mui/material';
import { Edit, Close, Phone, Email, School, Badge, Save, Cancel } from '@mui/icons-material';
import { Teacher, EditTeacherForm, FormErrors, COLORS } from './TeacherDetailsConfig';

interface Props { open: boolean; onClose: () => void; teacher: Teacher; onSave: (data: EditTeacherForm) => void; }

export default function EditTeacherDialog({ open, onClose, teacher, onSave }: Props) {
  const [form, setForm] = useState<EditTeacherForm>({ fullName: teacher.fullName, phone: teacher.phone, email: teacher.email, qualification: teacher.qualification });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => { if (open) setForm({ fullName: teacher.fullName, phone: teacher.phone, email: teacher.email, qualification: teacher.qualification }); }, [open, teacher]);

  const handleSubmit = () => {
    if (!form.fullName || !form.phone || !form.email || !form.qualification) return;
    onSave(form); onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Fade} PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Avatar sx={{ bgcolor: COLORS.orangeLight, color: COLORS.orangeDark }}><Edit /></Avatar><Box><Typography variant="h5" fontWeight={700}>Edit Profile</Typography><Typography variant="body2" color="text.secondary">Update {teacher.fullName}</Typography></Box></Box>
        <IconButton onClick={onClose}><Close /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 1 }}>
        {form.phone !== teacher.phone && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>Changing phone number affects login credentials.</Alert>}
        <Stack spacing={3}>
          <TextField label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Badge sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
          <TextField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 12) })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: 'text.secondary' }} /><Typography sx={{ ml: 1 }}></Typography></InputAdornment> }} />
          <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
          <TextField label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><School sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} startIcon={<Cancel />} sx={{ color: 'text.secondary' }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} startIcon={<Save />} sx={{ bgcolor: COLORS.orange, '&:hover': { bgcolor: COLORS.orangeDark } }}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}