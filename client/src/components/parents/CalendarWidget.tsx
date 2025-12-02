'use client';
import React from 'react';
import { Card, CardActionArea, CardContent, Stack, Box, Typography, alpha } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { COLORS } from './ParentConfig';

export default function CalendarWidget() {
  const router = useRouter();

  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden', 
        border: '1px solid', 
        borderColor: COLORS.divider,
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
        color: 'white',
        mb: 3
      }}
    >
      <CardActionArea onClick={() => router.push('/parent/calendar')}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 3, 
                  bgcolor: alpha('#fff', 0.2), 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <CalendarMonthIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>School Calendar</Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>View events & holidays</Typography>
              </Box>
            </Stack>
            <ArrowForwardIcon sx={{ opacity: 0.8 }} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}