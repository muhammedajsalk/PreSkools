'use client';
import React from 'react';
import { Card, CardActionArea, CardContent, Stack, Box, Typography, Chip, alpha } from '@mui/material';
import { ScheduleActivity, ACTIVITY_TYPE_CONFIGS, COLORS, calculateDuration } from './ScheduleConfig';

interface Props { activity: ScheduleActivity; isCurrent: boolean; isPast: boolean; onClick: () => void; }

export default function ActivityCard({ activity, isCurrent, isPast, onClick }: Props) {
  const config = ACTIVITY_TYPE_CONFIGS[activity.type];
  const duration = calculateDuration(activity.startTime, activity.endTime);

  return (
    <Card elevation={isCurrent ? 3 : 0} sx={{ border: isCurrent ? `2px solid ${config.color}` : '1px solid', borderColor: isCurrent ? config.color : COLORS.divider, borderRadius: 3, overflow: 'visible', position: 'relative', opacity: isPast && !isCurrent ? 0.6 : 1, transition: 'all 0.3s', bgcolor: isCurrent ? alpha(config.color, 0.04) : COLORS.cardBg, '&:hover': { borderColor: config.color, transform: 'translateX(4px)', boxShadow: `0 4px 20px ${alpha(config.color, 0.2)}` } }}>
      {isCurrent && <Chip label="NOW" size="small" sx={{ position: 'absolute', top: -10, right: 12, bgcolor: config.color, color: 'white', fontWeight: 700, fontSize: '0.65rem', height: 20 }} />}
      <CardActionArea onClick={onClick} sx={{ p: 0 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: config.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color, flexShrink: 0 }}>{config.icon}</Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={600}>{activity.title}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <Chip label={config.label} size="small" sx={{ bgcolor: config.bgColor, color: config.color, fontWeight: 600, fontSize: '0.65rem', height: 22 }} />
                <Typography variant="caption" color="text.secondary">{duration}</Typography>
              </Stack>
              {activity.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{activity.description}</Typography>}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}