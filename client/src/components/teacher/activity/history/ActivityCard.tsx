'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Chip, alpha, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// Import ACTIVITY_CONFIG
import { ActivityLog, ACTIVITY_CONFIG, COLORS } from './HistoryConfig';

export default function ActivityCard({ activity, isLast }: { activity: ActivityLog; isLast: boolean }) {
  
  // 1. FIX: Add a Safety Fallback
  // If the activity type is unknown (e.g. "HYGIENE" if not defined in config), default to NOTE
  const config = ACTIVITY_CONFIG[activity.type] || ACTIVITY_CONFIG['NOTE'];
  
  // 2. Safety check for Icon (Just in case NOTE is also missing)
  const Icon = config ? config.icon : PersonIcon;
  const color = config ? config.color : COLORS.primary;
  const bgColor = config ? config.bgColor : alpha(COLORS.primary, 0.1);
  const label = config ? config.label : activity.type;

  return (
    <Fade in timeout={300}>
      <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 } }}>
        
        {/* Time */}
        <Box sx={{ minWidth: { xs: 55, sm: 70 }, textAlign: 'right', pt: 1.5 }}>
          <Typography variant="caption" fontWeight={700} sx={{ color: color }}>
            {activity.time}
          </Typography>
        </Box>

        {/* Connector */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 36, height: 36, borderRadius: '50%', 
              bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', 
              border: '3px solid', borderColor: 'white', boxShadow: 1, zIndex: 1 
            }}
          >
            <Icon sx={{ fontSize: 18, color: color }} />
          </Box>
          {!isLast && <Box sx={{ width: 2, flex: 1, bgcolor: alpha(COLORS.primary, 0.15), minHeight: 20 }} />}
        </Box>

        {/* Card */}
        <Box sx={{ flex: 1, pb: 3 }}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: alpha(color, 0.2) }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(color, 0.15), fontSize: 12, color: color }}>
                  {activity.studentName ? activity.studentName[0] : '?'}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>{activity.studentName}</Typography>
                  <Chip 
                    label={label} 
                    size="small" 
                    sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, bgcolor: bgColor, color: color }} 
                  />
                </Box>
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>{activity.description}</Typography>
              
              {activity.details && (
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', bgcolor: alpha('#000', 0.03), p: 1.5, borderRadius: 2 }}>
                  {activity.details}
                </Typography>
              )}
              
              {activity.imageUrl && (
                <Box component="img" src={activity.imageUrl} sx={{ width: '100%', borderRadius: 2.5, mt: 1.5 }} />
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2, pt: 1.5, borderTop: '1px dashed', borderColor: 'divider' }}>
                <PersonIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.secondary">
                  Logged by <b>{activity.loggedBy}</b>
                </Typography>
              </Box>

            </CardContent>
          </Card>
        </Box>
      </Box>
    </Fade>
  );
}