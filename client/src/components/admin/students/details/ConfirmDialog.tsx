'use client';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@mui/material';

interface Props { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmText: string; confirmColor?: 'error' | 'warning' | 'primary'; isLoading?: boolean; }

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText, confirmColor = 'primary', isLoading = false }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 1 }}><Button onClick={onClose} disabled={isLoading} sx={{ textTransform: 'none' }}>Cancel</Button><Button onClick={onConfirm} variant="contained" color={confirmColor} disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null} sx={{ textTransform: 'none', fontWeight: 600 }}>{isLoading ? 'Processing...' : confirmText}</Button></DialogActions>
    </Dialog>
  );
}