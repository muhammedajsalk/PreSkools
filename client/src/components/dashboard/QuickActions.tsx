'use client';
import React from 'react';
import { Card, CardHeader, CardContent, Stack, Avatar, Box, Typography, Badge } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { brandColors, QuickAction } from './DashboardConfig';

export default function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
      <CardHeader title={<Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 40, height: 40, bgcolor: `${brandColors.secondary.main}15`, color: brandColors.secondary.main }}><MenuBookIcon sx={{ fontSize: 22 }} /></Avatar><Box><Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Quick Actions</Typography><Typography variant="caption" sx={{ color: '#6B7280' }}>Frequently used features</Typography></Box></Stack>} sx={{ bgcolor: '#FAFAFA', borderBottom: '1px solid #E5E7EB' }} />
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
          {actions.map((act) => (
            <Box key={act.id} sx={{ flex: 1, minWidth: { xs: 'calc(50% - 8px)', sm: 'calc(33.33% - 11px)', lg: 'calc(16.66% - 13px)' } }}>
              <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 24px ${act.color}20`, borderColor: act.color } }}>
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Badge badgeContent={act.badge} color="error"><Avatar sx={{ width: 56, height: 56, bgcolor: act.bgColor, color: act.color, mx: 'auto' }}>{act.icon}</Avatar></Badge>
                  <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600, color: '#374151' }}>{act.label}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}