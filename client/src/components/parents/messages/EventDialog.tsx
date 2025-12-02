'use client';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Stack, Typography, IconButton, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocationIcon from '@mui/icons-material/LocationOn';
import { SchoolEvent, getEventTypeConfig } from './MessageConfig';

export default function EventDialog({ event, open, onClose }: { event: SchoolEvent | null; open: boolean; onClose: () => void }) {
  if (!event) return null;
  const typeConfig = getEventTypeConfig(event.eventType);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}>
      <Box sx={{ background: `linear-gradient(135deg, ${typeConfig.color} 0%, ${alpha(typeConfig.color, 0.8)} 100%)`, color: 'white', p: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: alpha('#fff', 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{React.cloneElement(typeConfig.icon as React.ReactElement, { sx: { fontSize: 28 } })}</Box>
            <Box><Typography variant="h6" fontWeight={700}>{event.title}</Typography><Typography variant="body2" sx={{ opacity: 0.9 }}>{event.date}</Typography></Box>
          </Stack>
          <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
        </Stack>
      </Box>
      <DialogContent sx={{ p: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>{event.description}</Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(typeConfig.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: typeConfig.color }}><TimeIcon /></Box><Box><Typography variant="caption" color="text.secondary">Time</Typography><Typography variant="body2" fontWeight={600}>{event.time}</Typography></Box></Stack>
          {event.location && <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(typeConfig.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: typeConfig.color }}><LocationIcon /></Box><Box><Typography variant="caption" color="text.secondary">Location</Typography><Typography variant="body2" fontWeight={600}>{event.location}</Typography></Box></Stack>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}><Button fullWidth variant="contained" sx={{ bgcolor: typeConfig.color }}>Add to Calendar</Button></DialogActions>
    </Dialog>
  );
}