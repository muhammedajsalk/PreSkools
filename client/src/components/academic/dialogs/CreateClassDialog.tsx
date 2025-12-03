'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Avatar, SelectChangeEvent, CircularProgress } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import { COLORS, CreateClassFormData, mockTeachers, getAvatarColor, getInitials } from '../AcademicConfig';
import { useCreateClassMutation } from '@/src/store/api/academicApiSlice';
import { useGetTeachersQuery } from '@/src/store/api/teacherApiSlice'; // Reuse Teacher API!
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateClassDialog({ open, onClose }: Props) {
  const [formData, setFormData] = useState<CreateClassFormData>({ name: '', section: '', teacherId: '', capacity: 25 });

  const [createClass, { isLoading }] = useCreateClassMutation();
  const { data: teacherData } = useGetTeachersQuery(''); // Fetch all teachers
  const teachers = teacherData?.data || [];

  const handleSubmit = async () => {
    if (!formData.name || !formData.section) return;

    try {
      // 3. Call API
      await createClass({
        name: formData.name,
        section: formData.section,
        capacity: formData.capacity,
        teacher_id: formData.teacherId || undefined
      }).unwrap();

      toast.success("Classroom Created Successfully!");
      setFormData({ name: '', section: '', teacherId: '', capacity: 25 });
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create class");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
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
              <MenuItem value=""><em>None</em></MenuItem>
              {teachers.map((t: any) => (
                <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Capacity" type="number" fullWidth value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ color: COLORS.textSecondary }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading || !formData.name} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark } }}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}