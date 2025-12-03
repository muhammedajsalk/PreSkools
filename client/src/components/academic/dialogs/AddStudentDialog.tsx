'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Divider, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Chip, CircularProgress ,Box} from '@mui/material';
import { PersonAdd, Phone, Male, Female } from '@mui/icons-material';
import { toast } from 'sonner';
import { useCreateStudentMutation } from '@/src/store/api/academicApiSlice';
import { COLORS } from '../AcademicConfig';

interface Props {
  open: boolean;
  onClose: () => void;
  className: string;
  classId: string | null; // Important!
}

export default function AddStudentDialog({ open, onClose, className, classId }: Props) {
  const [formData, setFormData] = useState({ name: '', admissionNo: '', gender: 'Male', parentName: '', parentPhone: '', dateOfBirth: '' });
  
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const handleSubmit = async () => {
    if (!classId) return toast.error("No class selected!");
    if (!formData.name || !formData.admissionNo) return toast.error("Missing required fields");

    try {
      await createStudent({
        name: formData.name,
        admission_no: formData.admissionNo,
        gender: formData.gender,
        parent_name: formData.parentName,
        parent_phone: formData.parentPhone,
        dob: formData.dateOfBirth,
        class_id: classId,
      }).unwrap();

      toast.success("Student Added Successfully!");
      setFormData({ name: '', admissionNo: '', gender: 'Male', parentName: '', parentPhone: '', dateOfBirth: '' });
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add student");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonAdd sx={{ color: COLORS.secondary }} />
          <Box><Typography variant="h6" fontWeight={600}>Add New Student</Typography><Typography variant="caption" color="text.secondary">to {className}</Typography></Box>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          <TextField label="Full Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Admission No" fullWidth value={formData.admissionNo} onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })} required />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select value={formData.gender} label="Gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <MenuItem value="Male"><Stack direction="row" spacing={1}><Male sx={{ color: COLORS.male }} /><span>Male</span></Stack></MenuItem>
                <MenuItem value="Female"><Stack direction="row" spacing={1}><Female sx={{ color: COLORS.female }} /><span>Female</span></Stack></MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField label="Date of Birth" type="date" fullWidth value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} InputLabelProps={{ shrink: true }} />
          <Divider><Chip label="Parent Details" size="small" /></Divider>
          <TextField label="Parent Name" fullWidth value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} />
          <TextField label="Parent Phone" fullWidth value={formData.parentPhone} onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })} InputProps={{ startAdornment: <InputAdornment position="start"><Phone fontSize="small" /></InputAdornment> }} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: COLORS.textSecondary }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{ bgcolor: COLORS.secondary, '&:hover': { bgcolor: COLORS.secondaryDark } }}>
            {isLoading ? <CircularProgress size={24} color="inherit"/> : "Add Student"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}