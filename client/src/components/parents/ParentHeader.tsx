'use client';
import React, { useState } from 'react';
import { Box, Stack, Avatar, Typography, IconButton, Badge, Menu, MenuItem, ListItemIcon, ListItemText, alpha } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { COLORS, Child, getInitials } from './ParentConfig';

interface Props { selectedChild: Child; childrenList: Child[]; onChildSelect: (child: Child) => void; }

export default function ParentHeader({ selectedChild, childrenList, onChildSelect }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', bgcolor: alpha(COLORS.cardBg, 0.85), borderBottom: '1px solid', borderColor: alpha(COLORS.divider, 0.5) }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ cursor: 'pointer', p: 0.75, borderRadius: 3, '&:hover': { bgcolor: alpha(COLORS.primary, 0.05) } }}>
          <Avatar sx={{ width: 44, height: 44, bgcolor: COLORS.primary, border: `3px solid ${alpha(COLORS.primary, 0.2)}` }}>{getInitials(selectedChild.name)}</Avatar>
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5}><Typography variant="subtitle1" fontWeight={700}>{selectedChild.nickname}</Typography><KeyboardArrowDownIcon sx={{ fontSize: 18, color: COLORS.textSecondary }} /></Stack>
            <Typography variant="caption" color="text.secondary">{selectedChild.className}</Typography>
          </Box>
        </Stack>
        <IconButton sx={{ bgcolor: alpha(COLORS.primary, 0.1), '&:hover': { bgcolor: alpha(COLORS.primary, 0.15) } }}><Badge badgeContent={3} color="error"><NotificationsIcon sx={{ color: COLORS.primary }} /></Badge></IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { borderRadius: 3, minWidth: 200, boxShadow: `0 8px 32px ${alpha('#000', 0.15)}` } }}>
        {childrenList.map((child) => (
          <MenuItem key={child.id} onClick={() => { onChildSelect(child); setAnchorEl(null); }} selected={child.id === selectedChild.id} sx={{ py: 1.5 }}>
            <ListItemIcon><Avatar sx={{ width: 36, height: 36, bgcolor: child.id === selectedChild.id ? COLORS.primary : COLORS.textSecondary, fontSize: '0.85rem' }}>{getInitials(child.name)}</Avatar></ListItemIcon>
            <ListItemText primary={child.nickname} secondary={child.className} primaryTypographyProps={{ fontWeight: 600 }} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}