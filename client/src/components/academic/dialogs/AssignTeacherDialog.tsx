'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Stack, Avatar, Typography, CircularProgress } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { toast } from 'sonner';
import { useGetTeachersQuery } from '@/src/store/api/teacherApiSlice';
import { useUpdateClassMutation } from '@/src/store/api/academicApiSlice'; // You'll need to create this mutation
import { COLORS, getInitials, getAvatarColor } from '../AcademicConfig';

interface Props {
  open: boolean;
  onClose: () => void;
  classId: string | null;
  currentTeacherId?: string;
}

export default function AssignTeacherDialog({ open, onClose, classId, currentTeacherId }: Props) {
  const [selectedTeacher, setSelectedTeacher] = useState(currentTeacherId || '');
  
  // Fetch Teachers
  const { data: teacherData } = useGetTeachersQuery('');
  const teachers = teacherData?.data || [];

  // Mutation (We need to add this to academicApiSlice)
  const [updateClass, { isLoading }] = useUpdateClassMutation();

  const handleSubmit = async () => {
    if (!classId) return;

    try {
      await updateClass({ 
        id: classId, 
        teacher_id: selectedTeacher 
      }).unwrap();
      
      toast.success("Class Teacher Updated!");
      onClose();
    } catch (err: any) {
      toast.error("Failed to assign teacher");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Assign Class Teacher</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Select Teacher</InputLabel>
          <Select 
            value={selectedTeacher} 
            label="Select Teacher" 
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {teachers.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: getAvatarColor(t.name) }}>{getInitials(t.name)}</Avatar>
                  <Typography variant="body2">{t.name}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading} sx={{ bgcolor: COLORS.primary }}>
          {isLoading ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}