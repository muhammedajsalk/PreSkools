'use client';
import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Box, Stack, Typography, IconButton, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { CalendarEvent, EVENT_TYPE_CONFIGS, getDaysUntil, formatDate, COLORS } from './CalendarConfig';

export default function EventDialog({ event, open, onClose }: { event: CalendarEvent | null; open: boolean; onClose: () => void }) {
  if (!event) return null;
  const config = EVENT_TYPE_CONFIGS[event.type];
  const daysUntil = getDaysUntil(event.date);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}>
      <Box sx={{ background: `linear-gradient(135deg, ${config.color} 0%, ${alpha(config.color, 0.8)} 100%)`, color: 'white', p: 3 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: alpha('#fff', 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{React.cloneElement(config.icon as React.ReactElement, { sx: { fontSize: 28 } })}</Box>
            <Box><Typography variant="caption" sx={{ bgcolor: alpha('#fff', 0.2), px: 1, py: 0.5, borderRadius: 1, fontWeight: 700 }}>{config.label}</Typography><Typography variant="h6" fontWeight={700} mt={0.5}>{event.title}</Typography></Box>
          </Stack>
          <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
        </Stack>
      </Box>
      <DialogContent sx={{ p: 3 }}>
        {daysUntil >= 0 && <Box sx={{ textAlign: 'center', p: 2, mb: 3, borderRadius: 3, bgcolor: alpha(config.color, 0.08) }}><Typography variant="h4" fontWeight={800} color={config.color}>{daysUntil === 0 ? "It's Today!" : `${daysUntil} Days`}</Typography><Typography variant="body2" color="text.secondary">{daysUntil === 0 ? 'Happening now' : 'until this event'}</Typography></Box>}
        <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, mb: 3 }}>{event.description}</Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(config.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color }}><CalendarMonthIcon /></Box><Box><Typography variant="caption" color="text.secondary">Date</Typography><Typography variant="body1" fontWeight={600}>{formatDate(event.date)}</Typography></Box></Stack>
          <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(config.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color }}><AccessTimeIcon /></Box><Box><Typography variant="caption" color="text.secondary">Time</Typography><Typography variant="body1" fontWeight={600}>{event.isAllDay ? 'All Day' : `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ''}`}</Typography></Box></Stack>
          {event.location && <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(config.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color }}><LocationOnIcon /></Box><Box><Typography variant="caption" color="text.secondary">Location</Typography><Typography variant="body1" fontWeight={600}>{event.location}</Typography></Box></Stack>}
          {event.forClass && <Stack direction="row" spacing={2} alignItems="center"><Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha(config.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color }}><SchoolIcon /></Box><Box><Typography variant="caption" color="text.secondary">For</Typography><Typography variant="body1" fontWeight={600}>{event.forClass}</Typography></Box></Stack>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}><Stack direction="row" spacing={1.5} sx={{ width: '100%' }}><Button fullWidth variant="outlined" startIcon={<NotificationsIcon />} sx={{ borderRadius: 2, fontWeight: 600, borderColor: COLORS.divider, color: COLORS.textSecondary }}>Remind Me</Button><Button fullWidth variant="contained" startIcon={<CalendarMonthIcon />} sx={{ borderRadius: 2, fontWeight: 600, bgcolor: config.color, '&:hover': { bgcolor: alpha(config.color, 0.9) } }}>Add to Calendar</Button></Stack></DialogActions>
    </Dialog>
  );
}