'use client';
import React, { useState, useEffect } from 'react'; // 1. Import Hooks
import { Card, CardContent, Box, Stack, Avatar, Typography, Tooltip, IconButton, Button, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { brandColors, MOCK_DATA } from './DashboardConfig';

const getGreeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
};

export default function WelcomeBanner() {
  // 2. Create state for the date string
  const [currentDate, setCurrentDate] = useState<string>('');

  // 3. Set the date ONLY on the client side
  useEffect(() => {
    const dateStr = new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setCurrentDate(dateStr);
  }, []);

  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 4, background: brandColors.primary.gradient, overflow: 'hidden', position: 'relative' }}>
      <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.08)', top: -60, right: -40 }} />
      <Box sx={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.06)', bottom: -30, right: 100 }} />
      
      <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={3}>
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Avatar sx={{ width: { xs: 56, md: 72 }, height: { xs: 56, md: 72 }, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, border: '3px solid rgba(255, 255, 255, 0.3)' }}>{MOCK_DATA.principal.avatar}</Avatar>
            <Box>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, letterSpacing: '-0.5px', fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>{getGreeting()}, {MOCK_DATA.principal.name}! 👋</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.85)', mt: 0.5 }}>Welcome back to {MOCK_DATA.principal.schoolName}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                <CalendarMonthIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' }} />
                
                {/* 4. Render the state variable instead of new Date() */}
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', minHeight: '20px' }}>
                  {currentDate || 'Loading...'} 
                </Typography>

              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Tooltip title="Refresh"><IconButton sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' } }}><RefreshIcon /></IconButton></Tooltip>
            <Tooltip title="Settings"><IconButton sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' } }}><SettingsIcon /></IconButton></Tooltip>
            <Button variant="contained" startIcon={<NotificationsActiveIcon />} sx={{ bgcolor: brandColors.secondary.main, color: 'white', fontWeight: 700, borderRadius: 2.5, px: 3, '&:hover': { bgcolor: brandColors.secondary.dark } }}>Send Notice</Button>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, minWidth: 100 }}>📅 Coming Up:</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {MOCK_DATA.upcomingEvents.map((e) => (
              <Chip key={e.id} icon={<Box sx={{ color: 'inherit', display: 'flex' }}>{e.icon}</Box>} label={`${e.title} • ${e.date}`} size="small" sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', color: 'white', fontWeight: 500, border: '1px solid rgba(255, 255, 255, 0.2)', '& .MuiChip-icon': { color: 'inherit' } }} />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}