'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography, IconButton, Divider, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, SelectChangeEvent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteIcon from '@mui/icons-material/Delete';
import { ScheduleActivity, ActivityFormData, ACTIVITY_TYPE_CONFIGS, COLORS, ActivityType } from './ScheduleConfig';

interface Props { open: boolean; activity: ScheduleActivity | null; onClose: () => void; onSave: (data: ActivityFormData) => void; onDelete?: () => void; }

export default function ActivityDialog({ open, activity, onClose, onSave, onDelete }: Props) {
  const [formData, setFormData] = useState<ActivityFormData>({ title: '', startTime: '', endTime: '', type: 'academic', description: '' });

  useEffect(() => {
    if (open) setFormData(activity ? { title: activity.title, startTime: activity.startTime, endTime: activity.endTime, type: activity.type, description: activity.description || '' } : { title: '', startTime: '', endTime: '', type: 'academic', description: '' });
  }, [open, activity]);

  const handleChange = (field: keyof ActivityFormData) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [field]: e.target.value });
  const handleType = (e: SelectChangeEvent) => setFormData({ ...formData, type: e.target.value as ActivityType });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center"><ScheduleIcon sx={{ color: COLORS.primary }} /><Typography variant="h6" fontWeight={600}>{activity ? 'Edit' : 'Add'} Activity</Typography></Stack>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          <TextField label="Title" value={formData.title} onChange={handleChange('title')} fullWidth required />
          <Stack direction="row" spacing={2}>
            <TextField label="Start" type="time" value={formData.startTime} onChange={handleChange('startTime')} fullWidth required InputLabelProps={{ shrink: true }} />
            <TextField label="End" type="time" value={formData.endTime} onChange={handleChange('endTime')} fullWidth required InputLabelProps={{ shrink: true }} />
          </Stack>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} label="Type" onChange={handleType}>
              {Object.entries(ACTIVITY_TYPE_CONFIGS).map(([k, c]) => (
                <MenuItem key={k} value={k}><Stack direction="row" spacing={1} alignItems="center"><Box sx={{ width: 24, height: 24, borderRadius: 1, bgcolor: c.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>{c.icon}</Box><Typography>{c.label}</Typography></Stack></MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Description" value={formData.description} onChange={handleChange('description')} fullWidth multiline rows={3} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Box>{activity && onDelete && <Button color="error" startIcon={<DeleteIcon />} onClick={onDelete}>Delete</Button>}</Box>
        <Stack direction="row" spacing={1}>
          <Button onClick={onClose} sx={{ color: COLORS.textSecondary }}>Cancel</Button>
          <Button variant="contained" onClick={() => onSave(formData)} disabled={!formData.title} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark } }}>Save</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}