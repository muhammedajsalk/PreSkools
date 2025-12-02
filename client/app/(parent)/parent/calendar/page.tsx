'use client';
import React, { useState, useMemo } from 'react';
import { Box, Stack, Typography, ToggleButtonGroup, ToggleButton, IconButton, Button, Card, useMediaQuery, useTheme } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import { COLORS, MOCK_EVENTS, ViewType, CalendarEvent, MONTHS, isSameDay, getEventsForMonth, getEventsForDate } from '../../../../src/components/parents/calendar/CalendarConfig';
import CalendarGrid from '../../../../src/components/parents/calendar/CalendarGrid';
import NextUpCard from '../../../../src/components/parents/calendar/NextUpCard';
import EventListCard from '../../../../src/components/parents/calendar/EventListCard';
import EventDialog from '../../../../src/components/parents/calendar/EventDialog';
import EventLegend from '../../../../src/components/parents/calendar/EventLegend';
import BottomNav from '../../../../src/components/parents/BottomNav';

export default function ParentCalendarPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const upcomingEvent = useMemo(() => MOCK_EVENTS.filter(e => e.date >= new Date()).sort((a, b) => a.date.getTime() - b.date.getTime())[0], []);
  const monthEvents = useMemo(() => getEventsForMonth(currentMonth, MOCK_EVENTS), [currentMonth]);
  const selectedDateEvents = useMemo(() => getEventsForDate(selectedDate, MOCK_EVENTS), [selectedDate]);

  const handleEventClick = (e: CalendarEvent) => { setSelectedEvent(e); setDialogOpen(true); };

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 12 }}>
      <Box sx={{ bgcolor: COLORS.cardBg, position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid', borderColor: COLORS.divider }}>
        <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h5" fontWeight={700} color="text.primary">School Calendar</Typography>
            <ToggleButtonGroup value={view} exclusive onChange={(_, v) => v && setView(v)} size="small" sx={{ bgcolor: COLORS.background }}>
              <ToggleButton value="month"><CalendarMonthIcon sx={{ fontSize: 18, mr: 0.5 }} />{!isMobile && 'Month'}</ToggleButton>
              <ToggleButton value="agenda"><ViewAgendaIcon sx={{ fontSize: 18, mr: 0.5 }} />{!isMobile && 'Agenda'}</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <IconButton onClick={() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))} size="small"><ChevronLeftIcon /></IconButton>
            <Stack direction="row" alignItems="center" spacing={1}><Typography variant="h6" fontWeight={600} color="text.primary">{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</Typography><Button size="small" startIcon={<TodayIcon />} onClick={() => { const t = new Date(); setCurrentMonth(t); setSelectedDate(t); }} sx={{ textTransform: 'none', color: COLORS.primary, fontWeight: 600 }}>Today</Button></Stack>
            <IconButton onClick={() => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))} size="small"><ChevronRightIcon /></IconButton>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, md: 3 }, py: 2, maxWidth: 800, mx: 'auto' }}>
        {upcomingEvent && <Box sx={{ mb: 3 }}><NextUpCard event={upcomingEvent} onClick={() => handleEventClick(upcomingEvent)} /></Box>}

        {view === 'month' && (
          <>
            <Box sx={{ mb: 2 }}><CalendarGrid currentMonth={currentMonth} selectedDate={selectedDate} events={MOCK_EVENTS} onDateSelect={setSelectedDate} /></Box>
            <EventLegend />
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>{isSameDay(selectedDate, new Date()) ? "TODAY'S EVENTS" : `EVENTS ON ${selectedDate.toLocaleDateString()}`}</Typography>
              {selectedDateEvents.length > 0 ? <Stack spacing={1.5}>{selectedDateEvents.map(e => <EventListCard key={e.id} event={e} onClick={() => handleEventClick(e)} />)}</Stack> : <Card elevation={0} sx={{ borderRadius: 3, border: '1px dashed', borderColor: COLORS.divider, p: 4, textAlign: 'center' }}><EventIcon sx={{ fontSize: 48, color: COLORS.textSecondary, opacity: 0.5, mb: 1 }} /><Typography color="text.secondary">No events on this date</Typography></Card>}
            </Box>
          </>
        )}

        {view === 'agenda' && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>{monthEvents.length} EVENTS IN {MONTHS[currentMonth.getMonth()].toUpperCase()}</Typography>
            {monthEvents.length > 0 ? <Stack spacing={1.5}>{monthEvents.map(e => <EventListCard key={e.id} event={e} onClick={() => handleEventClick(e)} />)}</Stack> : <Card elevation={0} sx={{ borderRadius: 3, border: '1px dashed', borderColor: COLORS.divider, p: 4, textAlign: 'center' }}><CalendarMonthIcon sx={{ fontSize: 48, color: COLORS.textSecondary, opacity: 0.5, mb: 1 }} /><Typography color="text.secondary">No events this month</Typography></Card>}
          </Box>
        )}
      </Box>

      <EventDialog event={selectedEvent} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <BottomNav />
    </Box>
  );
}