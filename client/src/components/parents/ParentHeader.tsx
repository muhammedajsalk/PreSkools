'use client';
import React, { useState } from 'react'; // 1. Import useState
import { Paper, Stack, Avatar, Typography, IconButton, Badge, Menu, MenuItem, ListItemIcon, ListItemText, alpha, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { COLORS, Child, getInitials } from './ParentConfig';

// Remove onChildMenuOpen from Props, as it's handled internally now
interface Props { selectedChild: Child; childrenList: any[]; onChildSelect: (child: Child) => void; } 

export default function ParentHeader({ selectedChild, childrenList, onChildSelect }: Props) {
  
  // 2. Define the local state for the anchor
  const [childMenuAnchor, setChildMenuAnchor] = useState<null | HTMLElement>(null);

  // 3. Define the local handlers
  const handleChildMenuOpen = (e: React.MouseEvent<HTMLElement>) => setChildMenuAnchor(e.currentTarget);
  const handleChildMenuClose = () => setChildMenuAnchor(null);

  const selectedId = selectedChild._id || selectedChild.id; 

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', bgcolor: alpha(COLORS.cardBg, 0.85), borderBottom: '1px solid', borderColor: alpha(COLORS.divider, 0.5) }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
        
        {/* Child Switcher Button (Uses local handler) */}
        <Stack direction="row" alignItems="center" spacing={1.5} onClick={handleChildMenuOpen} sx={{ cursor: 'pointer', p: 0.75, borderRadius: 3, '&:hover': { bgcolor: alpha(COLORS.primary, 0.05) } }}>
          <Avatar sx={{ width: 44, height: 44, bgcolor: COLORS.primary, border: `3px solid ${alpha(COLORS.primary, 0.2)}` }}>{getInitials(selectedChild.name)}</Avatar>
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5}><Typography variant="subtitle1" fontWeight={700}>{selectedChild.nickname}</Typography><KeyboardArrowDownIcon sx={{ fontSize: 18, color: COLORS.textSecondary }} /></Stack>
            <Typography variant="caption" color="text.secondary">{selectedChild.className}</Typography>
          </Box>
        </Stack>

        <IconButton sx={{ bgcolor: alpha(COLORS.primary, 0.1), '&:hover': { bgcolor: alpha(COLORS.primary, 0.15) } }}><Badge badgeContent={3} color="error"><NotificationsIcon sx={{ color: COLORS.primary }} /></Badge></IconButton>
      </Stack>

      {/* Child Switcher Menu (Uses local state) */}
      <Menu anchorEl={childMenuAnchor} open={Boolean(childMenuAnchor)} onClose={handleChildMenuClose} PaperProps={{ sx: { borderRadius: 3, minWidth: 200, boxShadow: `0 8px 32px ${alpha('#000', 0.15)}` } }}>
        {childrenList.map((child) => {
          const childId = child._id || child.id; 

          return (
            <MenuItem 
              key={childId} 
              onClick={() => { onChildSelect(child); handleChildMenuClose(); }} // Use local close handler
              selected={childId === selectedId} 
              sx={{ py: 1.5 }}
            >
              <ListItemIcon><Avatar sx={{ width: 36, height: 36, bgcolor: childId === selectedId ? COLORS.primary : COLORS.textSecondary, fontSize: '0.85rem' }}>{getInitials(child.name)}</Avatar></ListItemIcon>
              <ListItemText 
                primary={child.nickname} 
                secondary={child.className} 
                primaryTypographyProps={{ fontWeight: 600 }} 
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}