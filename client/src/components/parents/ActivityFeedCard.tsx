'use client';
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  Stack, 
  Avatar, 
  Box, 
  Typography, 
  Chip, 
  IconButton, 
  alpha, 
  LinearProgress, 
  Button 
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimeIcon from '@mui/icons-material/AccessTime';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CheckInIcon from '@mui/icons-material/CheckCircle';
import LocationIcon from '@mui/icons-material/LocationOn';
import TempIcon from '@mui/icons-material/Thermostat';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import HeartFilledIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close'; // Used for camera icon fallback
import { ActivityFeedItem, COLORS, getActivityTypeConfig, getInitials } from './ParentConfig';

export default function ActivityFeedCard({ activity, onLike, onComment, onShare }: { activity: ActivityFeedItem; onLike: () => void; onComment: () => void; onShare: () => void; }) {
  const typeConfig = getActivityTypeConfig(activity.type);
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = activity.description && activity.description.length > 150;
  const displayText = shouldTruncate && !expanded ? activity.description?.substring(0, 150) + '...' : activity.description;

  return (
    <Card elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: COLORS.divider, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 40px ${alpha(COLORS.primary, 0.12)}`, borderColor: alpha(typeConfig.color, 0.3) } }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ p: 2, pb: 1.5 }}>
        <Avatar sx={{ width: 44, height: 44, background: COLORS.gradientPrimary, fontSize: '1rem', fontWeight: 600 }}>{getInitials(activity.teacherName)}</Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight={600}>{activity.teacherName}</Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}><TimeIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">{activity.time}</Typography></Stack>
        </Box>
        <Chip icon={React.cloneElement(typeConfig.icon as React.ReactElement, { sx: { fontSize: 16 } })} label={typeConfig.label} size="small" sx={{ bgcolor: typeConfig.bgColor, color: typeConfig.color, fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }} />
        <IconButton size="small" sx={{ color: COLORS.textSecondary }}><MoreHorizIcon /></IconButton>
      </Stack>

      {activity.type === 'photo' && activity.images && (
        <Box sx={{ px: 2 }}><Box sx={{ width: '100%', height: 300, bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}><CameraIcon sx={{ fontSize: 60, color: COLORS.primary, opacity: 0.5 }} /></Box></Box>
      )}

      {(activity.type === 'checkin' || activity.type === 'checkout') && (
        <Box sx={{ px: 2, pb: 1 }}><Box sx={{ p: 2, borderRadius: 3, background: activity.type === 'checkin' ? COLORS.gradientPrimary : COLORS.divider, color: activity.type === 'checkin' ? 'white' : COLORS.textPrimary }}><Stack direction="row" alignItems="center" spacing={2}><Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: alpha(activity.type === 'checkin' ? '#fff' : COLORS.textSecondary, 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activity.type === 'checkin' ? <CheckInIcon sx={{ fontSize: 28 }} /> : <LocationIcon sx={{ fontSize: 28 }} />}</Box><Box><Typography variant="h6" fontWeight={700}>{activity.time}</Typography><Typography variant="body2" sx={{ opacity: 0.9 }}>{activity.description}</Typography></Box></Stack></Box></Box>
      )}

      {activity.type === 'health' && activity.healthInfo && (
        <Box sx={{ px: 2 }}><Card elevation={0} sx={{ bgcolor: alpha(COLORS.error, 0.05), borderRadius: 3, border: '1px solid', borderColor: alpha(COLORS.error, 0.1) }}><CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}><Stack direction="row" spacing={3}><Box sx={{ textAlign: 'center' }}><Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}><TempIcon sx={{ fontSize: 20, color: COLORS.error }} /><Typography variant="h5" fontWeight={700} color={COLORS.error}>{activity.healthInfo.temperature}</Typography></Stack><Typography variant="caption" color="text.secondary">Temperature</Typography></Box><Box sx={{ flex: 1 }}><Typography variant="subtitle2" fontWeight={600}>Mood: {activity.healthInfo.mood}</Typography>{activity.healthInfo.notes && <Typography variant="body2" color="text.secondary">{activity.healthInfo.notes}</Typography>}</Box></Stack></CardContent></Card></Box>
      )}

      {(activity.type === 'activity' || activity.type === 'photo') && (
        <Box sx={{ px: 2, pt: 1.5 }}><Typography variant="subtitle1" fontWeight={600}>{activity.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6 }}>{displayText}{shouldTruncate && <Typography component="span" onClick={() => setExpanded(!expanded)} sx={{ color: COLORS.primary, cursor: 'pointer', fontWeight: 600, ml: 0.5, '&:hover': { textDecoration: 'underline' } }}>{expanded ? 'less' : 'more'}</Typography>}</Typography></Box>
      )}

    </Card>
  );
}