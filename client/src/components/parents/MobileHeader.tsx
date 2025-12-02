'use client';
import React from 'react';
import { Box, Stack, Avatar, Typography, IconButton, Badge, alpha } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { COLORS, Child, getInitials } from './ParentConfig';

interface Props { selectedChild: Child; onChildMenuOpen: (event: React.MouseEvent<HTMLElement>) => void; notificationCount: number; }

export default function MobileHeader({ selectedChild, onChildMenuOpen, notificationCount }: Props) {
  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', bgcolor: alpha(COLORS.cardBg, 0.9), borderBottom: '1px solid', borderColor: alpha(COLORS.divider, 0.5) }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} onClick={onChildMenuOpen} sx={{ cursor: 'pointer', p: 0.75, borderRadius: 3, transition: 'all 0.2s', '&:hover': { bgcolor: alpha(COLORS.primary, 0.05) } }}>
          <Avatar sx={{ width: 44, height: 44, background: COLORS.gradientPrimary, border: `3px solid ${alpha(COLORS.primary, 0.2)}`, fontSize: '1rem', fontWeight: 700 }}>{getInitials(selectedChild.name)}</Avatar>
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5}><Typography variant="subtitle1" fontWeight={700}>{selectedChild.nickname}</Typography><KeyboardArrowDownIcon sx={{ fontSize: 18, color: COLORS.textSecondary }} /></Stack>
            <Typography variant="caption" color="text.secondary">{selectedChild.className}-{selectedChild.section}</Typography>
          </Box>
        </Stack>
        <IconButton sx={{ bgcolor: alpha(COLORS.primary, 0.1), '&:hover': { bgcolor: alpha(COLORS.primary, 0.15) } }}><Badge badgeContent={notificationCount} color="error"><NotificationsIcon sx={{ color: COLORS.primary }} /></Badge></IconButton>
      </Stack>
    </Box>
  );
}