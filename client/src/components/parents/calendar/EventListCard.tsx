'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, alpha } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CalendarEvent, EVENT_TYPE_CONFIGS, COLORS, getDaysUntil, MONTHS } from './CalendarConfig';

export default function EventListCard({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  const config = EVENT_TYPE_CONFIGS[event.type];
  const daysUntil = getDaysUntil(event.date);
  const isPast = daysUntil < 0;

  return (
    <Card elevation={0} onClick={onClick} sx={{ borderRadius: 3, border: '1px solid', borderColor: COLORS.divider, opacity: isPast ? 0.6 : 1, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: config.color, boxShadow: `0 4px 20px ${alpha(config.color, 0.15)}`, transform: 'translateX(4px)' } }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" spacing={2} alignItems="stretch">
          <Box sx={{ width: 56, minHeight: 56, borderRadius: 2, bgcolor: config.bgColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Typography variant="h5" fontWeight={800} sx={{ color: config.color, lineHeight: 1 }}>{event.date.getDate()}</Typography>
            <Typography variant="caption" fontWeight={600} sx={{ color: config.color, textTransform: 'uppercase', fontSize: '0.6rem' }}>{MONTHS[event.date.getMonth()].slice(0, 3)}</Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
              <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ flex: 1, pr: 1 }}>{event.title}</Typography>
              <Chip icon={React.cloneElement(config.icon as React.ReactElement, { sx: { fontSize: 14 } })} label={config.label} size="small" sx={{ bgcolor: config.bgColor, color: config.color, fontWeight: 600, fontSize: '0.65rem', height: 24, '& .MuiChip-icon': { color: 'inherit' } }} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Stack direction="row" alignItems="center" spacing={0.5}><AccessTimeIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">{event.isAllDay ? 'All Day' : event.startTime}{event.endTime && ` - ${event.endTime}`}</Typography></Stack>
              {event.location && <Stack direction="row" alignItems="center" spacing={0.5}><LocationOnIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary" noWrap>{event.location}</Typography></Stack>}
            </Stack>
            {event.forClass && <Chip label={event.forClass} size="small" sx={{ mt: 1, height: 20, fontSize: '0.6rem', bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 600 }} />}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}