'use client';
import React from 'react';
import { Box, Typography, Button, Stack, Avatar, alpha } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhoneIcon from '@mui/icons-material/Phone';
import { COLORS } from './ParentConfig';

export default function EmptyActivityFeed() {
  return (
    <Box
      sx={{
        p: 5,
        mt: 2,
        borderRadius: 4,
        border: '2px dashed',
        borderColor: COLORS.divider,
        bgcolor: COLORS.cardBg,
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          bgcolor: alpha(COLORS.primary, 0.1),
          color: COLORS.primary,
          mx: 'auto',
          mb: 3,
        }}
      >
        <TimelineIcon sx={{ fontSize: 40 }} />
      </Avatar>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Feed is Empty
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        No activities have been logged for your child today.
      </Typography>
      
      <Stack spacing={1} alignItems="center">
        <Button
          variant="contained"
          size="large"
          startIcon={<RestaurantIcon />}
          sx={{
            bgcolor: COLORS.secondary,
            '&:hover': { bgcolor: COLORS.secondaryDark },
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Check Teacher Log Status
        </Button>
        <Typography variant="caption" color="text.secondary">
            Need an update? Message the teacher.
        </Typography>
      </Stack>
    </Box>
  );
}