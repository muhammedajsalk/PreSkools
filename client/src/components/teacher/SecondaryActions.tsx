'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Box, Typography, Stack, Card, CardActionArea, Badge, alpha } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BarChartIcon from '@mui/icons-material/BarChart'; // New Analytics Icon
import TimelineIcon from '@mui/icons-material/Timeline'; // New History Icon

import { COLORS } from './TeacherConfig';

export default function SecondaryActions() {
  const router = useRouter();

  // Define actions within useMemo to ensure COLORS is fully resolved
  const actions = useMemo(() => {
    // Note: The color reference is now safe
    const rawActions = [
      { 
        id: 'studentList', 
        label: 'View Student Roster', 
        icon: VisibilityIcon, 
        path: '/schoolAdmin/students', 
        color: COLORS.primary 
      },
      { 
        id: 'schedule', 
        label: "Today's Schedule", 
        icon: ScheduleIcon, 
        path: '/teacher/schedule', 
        color: COLORS.secondary 
      },
      { 
        id: 'announcements', 
        label: 'School Announcements', 
        icon: AnnouncementIcon, 
        path: '/teacher/messages', 
        color: COLORS.purple, 
        badge: 2 // Mock data
      },
      { 
        id: 'analytics', 
        label: 'Attendance Analytics', 
        icon: BarChartIcon, 
        path: '/teacher/attendance/analytics', 
        color: COLORS.info 
      },
      { 
        id: 'history', 
        label: 'Activity History', 
        icon: TimelineIcon, 
        path: '/teacher/activity/history', 
        color: COLORS.primaryDark 
      },
    ];

    // Map and calculate the final structure
    return rawActions.map(action => ({
      ...action,
      // Calculate background color safely
      bg: alpha(action.color, 0.1),
      onClick: () => router.push(action.path)
    }));
  }, [router]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={2}>
        More Options
      </Typography>
      
      <Stack spacing={1.5}>
        
        {actions.map((act) => {
          const Icon = act.icon;
          
          return (
            <Card key={act.id} elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, transition: 'all 0.2s', '&:hover': { borderColor: act.color } }}>
              
              <CardActionArea onClick={act.onClick} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  
                  {/* Icon Box */}
                  <Badge badgeContent={act.badge || 0} color="error" overlap="circular">
                    <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: act.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Using React.cloneElement to safely inject icon props is a good alternative here */}
                      {React.cloneElement(Icon as React.ReactElement, { sx: { color: act.color } })}
                    </Box>
                  </Badge>
                  
                  {/* Text */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{act.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {act.id === 'analytics' ? 'View performance charts' : 
                         act.id === 'history' ? 'Review daily logs' :
                         act.id === 'schedule' ? 'View class timetable' : 
                         act.id === 'announcements' ? `${act.badge} new alerts from admin` : 
                         act.id === 'studentList' ? 'See all students in your class' : ''}
                    </Typography>
                  </Box>
                  
                  <ArrowForwardIcon sx={{ color: COLORS.textSecondary }} />
                </Stack>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}