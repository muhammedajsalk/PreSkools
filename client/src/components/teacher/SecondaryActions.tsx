'use client';
import React from 'react';
import { Box, Typography, Stack, Card, CardActionArea, Badge, alpha } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnnouncementIcon from '@mui/icons-material/Announcement'; // or CampaignIcon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLORS } from './TeacherConfig';

export default function SecondaryActions() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={2}>
        More Options
      </Typography>
      
      <Stack spacing={1.5}>
        
        {/* Action 1: View Student List */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, transition: 'all 0.2s', '&:hover': { borderColor: COLORS.primary } }}>
          <CardActionArea onClick={() => console.log('Open Student List')} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <VisibilityIcon sx={{ color: COLORS.primary }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>View Student List</Typography>
                <Typography variant="caption" color="text.secondary">See all students in your class</Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: COLORS.textSecondary }} />
            </Stack>
          </CardActionArea>
        </Card>

        {/* Action 2: Daily Schedule */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, transition: 'all 0.2s', '&:hover': { borderColor: COLORS.secondary } }}>
          <CardActionArea onClick={() => console.log('Open Schedule')} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(COLORS.secondary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ScheduleIcon sx={{ color: COLORS.secondary }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>Today's Schedule</Typography>
                <Typography variant="caption" color="text.secondary">View and manage class timetable</Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: COLORS.textSecondary }} />
            </Stack>
          </CardActionArea>
        </Card>

        {/* Action 3: Announcements */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, transition: 'all 0.2s', '&:hover': { borderColor: COLORS.purple } }}>
          <CardActionArea onClick={() => console.log('Open Announcements')} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Badge badgeContent={2} color="error">
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(COLORS.purple, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnnouncementIcon sx={{ color: COLORS.purple }} />
                </Box>
              </Badge>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>School Announcements</Typography>
                <Typography variant="caption" color="text.secondary">2 new announcements from admin</Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: COLORS.textSecondary }} />
            </Stack>
          </CardActionArea>
        </Card>

      </Stack>
    </Box>
  );
}