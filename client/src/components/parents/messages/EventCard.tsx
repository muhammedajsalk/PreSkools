'use client';
import React from 'react';
import { Card, CardContent, Box, Stack, Typography, Chip, IconButton, alpha } from '@mui/material';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import TimeIcon from '@mui/icons-material/AccessTime';
import LocationIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { SchoolEvent, COLORS, getEventTypeConfig } from './MessageConfig';

export default function EventCard({ event, onClick }: { event: SchoolEvent; onClick: () => void }) {
  const typeConfig = getEventTypeConfig(event.eventType);

  return (
    <Card elevation={0} onClick={onClick} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: alpha(typeConfig.color, 0.3), bgcolor: event.isRead ? COLORS.cardBg : alpha(typeConfig.color, 0.03), cursor: 'pointer' }}>
      <Box sx={{ background: `linear-gradient(135deg, ${typeConfig.color} 0%, ${alpha(typeConfig.color, 0.8)} 100%)`, color: 'white', p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: alpha('#fff', 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{React.cloneElement(typeConfig.icon as React.ReactElement, { sx: { fontSize: 20 } })}</Box>
            <Box><Typography variant="subtitle1" fontWeight={700}>{event.title}</Typography><Stack direction="row" spacing={1} alignItems="center"><CalendarIcon sx={{ fontSize: 14 }} /><Typography variant="caption">{event.date}</Typography></Stack></Box>
          </Stack>
          {event.isUpcoming && <Chip label={event.daysUntil === 0 ? 'Today!' : `${event.daysUntil} days`} size="small" sx={{ bgcolor: alpha('#fff', 0.25), color: 'white', fontWeight: 700 }} />}
        </Stack>
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, overflow: 'hidden' }}>{event.description}</Typography>
        <Stack direction="row" spacing={2}><Stack direction="row" spacing={0.5}><TimeIcon sx={{ fontSize: 16, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">{event.time}</Typography></Stack>{event.location && <Stack direction="row" spacing={0.5}><LocationIcon sx={{ fontSize: 16, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">{event.location}</Typography></Stack>}</Stack>
      </CardContent>
    </Card>
  );
}