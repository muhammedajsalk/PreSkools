'use client';
import React, { useMemo } from 'react';
import { Card, CardContent, Box, Typography, Stack, alpha } from '@mui/material';
import { DAYS, getDaysInMonth, getFirstDayOfMonth, isSameDay, getEventsForDate, COLORS, EVENT_TYPE_CONFIGS, CalendarEvent } from './CalendarConfig';

interface Props { currentMonth: Date; selectedDate: Date; events: CalendarEvent[]; onDateSelect: (date: Date) => void; }

export default function CalendarGrid({ currentMonth, selectedDate, events, onDateSelect }: Props) {
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

  const calendarDays = useMemo(() => {
    const days = [];
    // Prev Month
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const prevDaysCount = getDaysInMonth(prevMonth);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) days.push({ date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevDaysCount - i), isCurrent: false });
    // Current Month
    for (let i = 1; i <= daysInMonth; i++) days.push({ date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i), isCurrent: true });
    // Next Month
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    for (let i = 1; i <= totalCells - days.length; i++) days.push({ date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i), isCurrent: false });
    return days;
  }, [currentMonth, daysInMonth, firstDayOfMonth, totalCells]);

  return (
    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: COLORS.divider, overflow: 'hidden' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
          {DAYS.map((day) => <Box key={day} sx={{ textAlign: 'center', py: 1 }}><Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{day}</Typography></Box>)}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {calendarDays.map(({ date, isCurrent }, index) => {
            const isToday = isSameDay(date, new Date());
            const isSelected = isSameDay(date, selectedDate);
            const dayEvents = getEventsForDate(date, events);
            const eventTypes = [...new Set(dayEvents.map((e) => e.type))].slice(0, 3);
            
            return (
              <Box key={index} onClick={() => isCurrent && onDateSelect(date)} sx={{ position: 'relative', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 2, cursor: isCurrent ? 'pointer' : 'default', bgcolor: isSelected ? COLORS.primary : isToday ? alpha(COLORS.primary, 0.1) : 'transparent', transition: 'all 0.2s', '&:hover': isCurrent ? { bgcolor: isSelected ? COLORS.primaryDark : alpha(COLORS.primary, 0.08) } : {} }}>
                <Typography variant="body2" fontWeight={isToday || isSelected ? 700 : 500} sx={{ color: isSelected ? 'white' : isCurrent ? (isToday ? COLORS.primary : COLORS.textPrimary) : COLORS.textSecondary, opacity: isCurrent ? 1 : 0.4, fontSize: '0.875rem' }}>{date.getDate()}</Typography>
                {dayEvents.length > 0 && isCurrent && <Stack direction="row" spacing={0.25} sx={{ position: 'absolute', bottom: 4 }}>{eventTypes.map((type, i) => <Box key={i} sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: isSelected ? 'white' : EVENT_TYPE_CONFIGS[type].color }} />)}</Stack>}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}