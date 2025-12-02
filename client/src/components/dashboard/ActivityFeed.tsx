'use client';
import React from 'react';
import { Card, CardHeader, CardContent, Stack, Avatar, Box, Typography, Chip, List, ListItem, ListItemAvatar, ListItemText, Divider, Button } from '@mui/material';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BrushIcon from '@mui/icons-material/Brush';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { brandColors, ClassroomActivity } from './DashboardConfig';

const getIcon = (type: string) => {
  if (type === 'lunch') return <RestaurantIcon sx={{ fontSize: 20 }} />;
  if (type === 'photo') return <PhotoCameraIcon sx={{ fontSize: 20 }} />;
  if (type === 'attendance') return <CheckCircleIcon sx={{ fontSize: 20 }} />;
  if (type === 'milestone') return <EmojiEventsIcon sx={{ fontSize: 20 }} />;
  return <BrushIcon sx={{ fontSize: 20 }} />;
};

const getColor = (type: string) => {
  if (type === 'lunch') return brandColors.stats.orange.main;
  if (type === 'photo') return brandColors.stats.blue.main;
  if (type === 'attendance') return brandColors.stats.green.main;
  if (type === 'milestone') return brandColors.stats.pink.main;
  return brandColors.stats.purple.main;
};

export default function ActivityFeed({ activities }: { activities: ClassroomActivity[] }) {
  return (
    <Card elevation={0} sx={{ flex: { lg: 4 }, borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 40, height: 40, bgcolor: `${brandColors.stats.blue.main}15`, color: brandColors.stats.blue.main }}><LocalActivityIcon sx={{ fontSize: 22 }} /></Avatar><Box><Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Live Classroom Feed</Typography><Typography variant="caption" sx={{ color: '#6B7280' }}>Real-time updates</Typography></Box></Stack>}
        action={<Chip label="Live" size="small" icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: brandColors.stats.green.main, animation: 'pulse 2s infinite' }} />} sx={{ bgcolor: brandColors.stats.green.light, color: brandColors.stats.green.dark, fontWeight: 700, fontSize: '0.7rem' }} />}
      />
      <CardContent sx={{ pt: 2, flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {activities.map((act, i) => (
            <React.Fragment key={act.id}>
              <ListItem sx={{ px: 2, py: 1.5, borderRadius: 2, '&:hover': { bgcolor: '#F9FAFB' } }}>
                <ListItemAvatar><Avatar sx={{ width: 40, height: 40, bgcolor: `${getColor(act.type)}15`, color: getColor(act.type) }}>{getIcon(act.type)}</Avatar></ListItemAvatar>
                
                {/* --- FIXED COMPONENT BELOW --- */}
                <ListItemText 
                  primary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip label={act.classroom} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: brandColors.primary.light, color: brandColors.primary.dark }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{act.activity}</Typography>
                    </Stack>
                  } 
                  secondary={
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 12, color: '#9CA3AF' }} />
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>{act.timestamp} • {act.teacher}</Typography>
                    </Stack>
                  } 
                  secondaryTypographyProps={{ component: 'div' }} // <--- THIS FIXES THE ERROR
                />
                
              </ListItem>
              {i < activities.length - 1 && <Divider sx={{ mx: 2 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}><Button fullWidth variant="text" endIcon={<ArrowForwardIcon />} sx={{ color: brandColors.primary.main, fontWeight: 600 }}>View All Activities</Button></Box>
    </Card>
  );
}