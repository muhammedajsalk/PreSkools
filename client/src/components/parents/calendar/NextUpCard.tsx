'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, alpha } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CalendarEvent, EVENT_TYPE_CONFIGS, getDaysUntil, getCountdownText } from './CalendarConfig';

export default function NextUpCard({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  const config = EVENT_TYPE_CONFIGS[event.type];
  const daysUntil = getDaysUntil(event.date);

  return (
    <Card elevation={0} onClick={onClick} sx={{ borderRadius: 4, overflow: 'hidden', background: `linear-gradient(135deg, ${config.color} 0%, ${alpha(config.color, 0.8)} 100%)`, color: 'white', cursor: 'pointer', transition: 'all 0.3s', boxShadow: `0 8px 32px ${alpha(config.color, 0.3)}`, '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 40px ${alpha(config.color, 0.4)}` } }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center" spacing={1}><TimerIcon sx={{ fontSize: 18, opacity: 0.9 }} /><Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1.5 }}>COMING UP NEXT</Typography></Stack>
          <Chip label={getCountdownText(daysUntil)} size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 700, fontSize: '0.7rem' }} />
        </Stack>
        <Typography variant="h6" fontWeight={700} gutterBottom>{event.title}</Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={0.5}><CalendarMonthIcon sx={{ fontSize: 16, opacity: 0.8 }} /><Typography variant="body2" sx={{ opacity: 0.9 }}>{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Typography></Stack>
          {!event.isAllDay && <Stack direction="row" alignItems="center" spacing={0.5}><AccessTimeIcon sx={{ fontSize: 16, opacity: 0.8 }} /><Typography variant="body2" sx={{ opacity: 0.9 }}>{event.startTime}</Typography></Stack>}
          {event.location && <Stack direction="row" alignItems="center" spacing={0.5}><LocationOnIcon sx={{ fontSize: 16, opacity: 0.8 }} /><Typography variant="body2" sx={{ opacity: 0.9 }} noWrap>{event.location}</Typography></Stack>}
        </Stack>
      </CardContent>
    </Card>
  );
}