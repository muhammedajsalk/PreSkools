'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Stack, Typography, Button, Chip, IconButton, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodayIcon from '@mui/icons-material/Today';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { COLORS, MOCK_SCHEDULE, ScheduleActivity, ActivityFormData, isCurrentSlot, isPastSlot, formatTime, generateId, ACTIVITY_TYPE_CONFIGS } from '../../../../src/components/teacher/schedule/ScheduleConfig';
import TimelineConnector from '../../../../src/components/teacher/schedule/TimelineConnector';
import ActivityCard from '../../../../src/components/teacher/schedule/ActivityCard';
import ActivityDialog from '../../../../src/components/teacher/schedule/ActivityDialog';
import EmptyScheduleState from '../../../../src/components/teacher/schedule/EmptyScheduleState';

export default function TeacherSchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleActivity[]>(MOCK_SCHEDULE);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ScheduleActivity | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 2. Add State for the formatted date string
  const [dateDisplay, setDateDisplay] = useState('');

  // 3. Update the date string ONLY on the client
  useEffect(() => {
    setDateDisplay(selectedDate.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }));
  }, [selectedDate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const sortedSchedule = useMemo(() => [...schedule].sort((a, b) => a.startTime.localeCompare(b.startTime)), [schedule]);
  
  // Use a safe check for "Is Today" to avoid hydration mismatch
  const [isToday, setIsToday] = useState(true);
  useEffect(() => {
    setIsToday(selectedDate.toDateString() === new Date().toDateString());
  }, [selectedDate]);

  const handleSave = (data: ActivityFormData) => {
    if (editingActivity) setSchedule(p => p.map(a => a.id === editingActivity.id ? { ...a, ...data } : a));
    else setSchedule(p => [...p, { id: generateId(), ...data }]);
    setDialogOpen(false); setEditingActivity(null);
  };

  const handleDelete = () => {
    if (editingActivity) setSchedule(p => p.filter(a => a.id !== editingActivity.id));
    setDialogOpen(false);
  };

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 4 }}>
      <Box sx={{ bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider, position: 'sticky', top: 0, zIndex: 10 }}>
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="h5" fontWeight={700}>{isToday ? "Today's Schedule" : 'Schedule'}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <TodayIcon sx={{ fontSize: 16, color: COLORS.textSecondary }} />
                
                {/* 4. Use the state variable instead of direct function call */}
                <Typography variant="body2" color="text.secondary">
                  {dateDisplay || 'Loading...'}
                </Typography>

              </Stack>
            </Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditingActivity(null); setDialogOpen(true); }} sx={{ bgcolor: COLORS.primary, fontWeight: 600, '&:hover': { bgcolor: COLORS.primaryDark } }}>Add</Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mt={2}>
            <IconButton onClick={() => setSelectedDate(d => new Date(d.setDate(d.getDate() - 1)))} size="small"><ChevronLeftIcon /></IconButton>
            <Button variant={isToday ? 'contained' : 'outlined'} size="small" onClick={() => setSelectedDate(new Date())} sx={{ bgcolor: isToday ? COLORS.primary : 'transparent', borderColor: COLORS.primary, color: isToday ? 'white' : COLORS.primary }}>Today</Button>
            <IconButton onClick={() => setSelectedDate(d => new Date(d.setDate(d.getDate() + 1)))} size="small"><ChevronRightIcon /></IconButton>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, sm: 3 }, mt: 2 }}>
        {sortedSchedule.length === 0 ? <EmptyScheduleState onAdd={() => setDialogOpen(true)} /> : (
          <Stack spacing={0}>
            {sortedSchedule.map((activity, index) => {
              const config = ACTIVITY_TYPE_CONFIGS[activity.type];
              // Safe check for current slot
              const isCurrent = isToday && isCurrentSlot(activity.startTime, activity.endTime);
              const isPast = isToday && isPastSlot(activity.endTime) && !isCurrent;
              return (
                <Stack key={activity.id} direction="row" spacing={2}>
                  <Box sx={{ width: 65, flexShrink: 0, pt: 2, textAlign: 'right' }}><Typography variant="caption" fontWeight={isCurrent ? 700 : 500} color={isCurrent ? config.color : isPast ? 'text.disabled' : 'text.secondary'}>{formatTime(activity.startTime)}</Typography></Box>
                  <TimelineConnector isFirst={index === 0} isLast={index === sortedSchedule.length - 1} isCurrent={isCurrent} isPast={isPast} color={config.color} />
                  <Box sx={{ flex: 1, pb: 2 }}><ActivityCard activity={activity} isCurrent={isCurrent} isPast={isPast} onClick={() => { setEditingActivity(activity); setDialogOpen(true); }} /></Box>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Box>

      <ActivityDialog open={dialogOpen} activity={editingActivity} onClose={() => setDialogOpen(false)} onSave={handleSave} onDelete={handleDelete} />
    </Box>
  );
}