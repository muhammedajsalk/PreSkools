'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, IconButton, Divider, FormControl, InputLabel, Select, MenuItem, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CampaignIcon from '@mui/icons-material/Campaign';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import InfoIcon from '@mui/icons-material/Info';
import { Notice, NoticeFormData, COLORS } from './AnnouncementConfig';

interface Props { open: boolean; notice: Notice | null; onClose: () => void; onSave: (data: NoticeFormData) => void; }

export default function NoticeDialog({ open, notice, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<NoticeFormData>({ title: '', message: '', priority: 'normal' });

  useEffect(() => {
    if (open) setFormData(notice ? { title: notice.title, message: notice.message, priority: notice.priority } : { title: '', message: '', priority: 'normal' });
  }, [open, notice]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}><CampaignIcon sx={{ color: COLORS.teacher }} /><Typography variant="h6" fontWeight={700}>{notice ? 'Edit Notice' : 'Post Notice'}</Typography></Box>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} fullWidth required />
        <TextField label="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} fullWidth multiline rows={6} required />
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select value={formData.priority} label="Priority" onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'normal' | 'urgent' })}>
            <MenuItem value="normal"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><InfoIcon sx={{ color: COLORS.info }} />Normal</Box></MenuItem>
            <MenuItem value="urgent"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PriorityHighIcon sx={{ color: COLORS.urgent }} />Urgent</Box></MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(formData)} disabled={!formData.title || !formData.message} sx={{ bgcolor: COLORS.teacher }}>{notice ? 'Save' : 'Post'}</Button>
      </DialogActions>
    </Dialog>
  );
}