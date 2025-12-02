'use client';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, alpha } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { COLORS } from './AnnouncementConfig';

interface Props { open: boolean; onClose: () => void; onConfirm: () => void; }

export default function DeleteDialog({ open, onClose, onConfirm }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(COLORS.urgent, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.urgent }}><DeleteIcon /></Box>
        <Typography variant="h6" fontWeight={700}>Delete Notice?</Typography>
      </DialogTitle>
      <DialogContent><Typography color="text.secondary">This action cannot be undone.</Typography></DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm} sx={{ bgcolor: COLORS.urgent, '&:hover': { bgcolor: '#DC2626' } }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}