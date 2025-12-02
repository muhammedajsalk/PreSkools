'use client';
import React, { useState } from 'react';
import { Box, Stack, Typography, Card, CardContent, Avatar, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Chip, Button, alpha } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import { COLORS, Child, getInitials, SidebarMenuItem } from './ParentConfig';

const MENU_ITEMS: SidebarMenuItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, path: '/parent/dashboard' },
  { id: 'gallery', label: 'Photo Gallery', icon: <CollectionsIcon />, badge: 12, path: '/parent/gallery' },
  { id: 'messages', label: 'Messages', icon: <ChatIcon />, badge: 3, path: '/parent/messages' },
  { id: 'calendar', label: 'Calendar', icon: <CalendarMonthIcon />, path: '/parent/calendar' },
  { id: 'health', label: 'Health Records', icon: <VaccinesIcon />, path: '/parent/health' },
  { id: 'achievements', label: 'Achievements', icon: <EmojiEventsIcon />, path: '/parent/achievements' },
  { id: 'payments', label: 'Payments', icon: <PaymentIcon />, path: '/parent/payments' },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, path: '/parent/settings' },
];

interface Props { selectedChild: Child; children: Child[]; onChildSelect: (child: Child) => void; activeMenuItem: string; onMenuItemClick: (id: string) => void; }

export default function DesktopSidebar({ selectedChild, children, onChildSelect, activeMenuItem, onMenuItemClick }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ width: 280, height: '100vh', position: 'fixed', left: 0, top: 0, bgcolor: COLORS.cardBg, borderRight: '1px solid', borderColor: COLORS.divider, display: 'flex', flexDirection: 'column', zIndex: 100 }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: COLORS.divider }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ width: 40, height: 40, borderRadius: 2, background: COLORS.gradientPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SchoolIcon sx={{ color: 'white', fontSize: 24 }} /></Box>
          <Box><Typography variant="h6" fontWeight={800} color="text.primary">KinderConnect</Typography><Typography variant="caption" color="text.secondary">Parent Portal</Typography></Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        <Card elevation={0} onClick={() => setMenuOpen(!menuOpen)} sx={{ bgcolor: alpha(COLORS.primary, 0.08), borderRadius: 3, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: alpha(COLORS.primary, 0.12) } }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ width: 48, height: 48, background: COLORS.gradientPrimary, fontSize: '1.1rem', fontWeight: 700 }}>{getInitials(selectedChild.name)}</Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}><Typography variant="subtitle1" fontWeight={700} noWrap>{selectedChild.nickname}</Typography><Typography variant="caption" color="text.secondary">{selectedChild.className}-{selectedChild.section}</Typography></Box>
              {menuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Stack>
          </CardContent>
        </Card>
        <Collapse in={menuOpen}>
          <Box sx={{ mt: 1 }}>
            {children.map((child) => (
              <Box key={child.id} onClick={() => { onChildSelect(child); setMenuOpen(false); }} sx={{ p: 1.5, borderRadius: 2, cursor: 'pointer', bgcolor: child.id === selectedChild.id ? alpha(COLORS.primary, 0.1) : 'transparent', '&:hover': { bgcolor: alpha(COLORS.primary, 0.05) } }}>
                <Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 36, height: 36, bgcolor: child.id === selectedChild.id ? COLORS.primary : COLORS.textSecondary, fontSize: '0.85rem' }}>{getInitials(child.name)}</Avatar><Box><Typography variant="body2" fontWeight={600}>{child.nickname}</Typography><Typography variant="caption" color="text.secondary">{child.className}-{child.section}</Typography></Box></Stack>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2 }}>
        <List disablePadding>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton onClick={() => onMenuItemClick(item.id)} selected={activeMenuItem === item.id} sx={{ borderRadius: 2, py: 1.5, '&.Mui-selected': { bgcolor: alpha(COLORS.primary, 0.1), '&:hover': { bgcolor: alpha(COLORS.primary, 0.15) }, '& .MuiListItemIcon-root': { color: COLORS.primary }, '& .MuiTypography-root': { color: COLORS.primary, fontWeight: 600 } } }}>
                <ListItemIcon sx={{ minWidth: 40, color: COLORS.textSecondary }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                {item.badge && <Chip label={item.badge} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: COLORS.error, color: 'white' }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: COLORS.divider }}><Button fullWidth startIcon={<LogoutIcon />} sx={{ justifyContent: 'flex-start', color: COLORS.textSecondary, textTransform: 'none', py: 1.5, '&:hover': { bgcolor: alpha(COLORS.error, 0.1), color: COLORS.error } }}>Logout</Button></Box>
    </Box>
  );
}