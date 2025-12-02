'use client';
import React from 'react';
import { Box, Typography, Tabs, Tab, TextField, InputAdornment, List, ListItemButton, ListItemAvatar, ListItemText, Badge, Avatar, Stack, Divider, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircleIcon from '@mui/icons-material/Circle';
import { COLORS, Conversation, getAvatarColor, getInitials } from './MessagesConfig';

interface Props {
  tabValue: number;
  setTabValue: (val: number) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  conversations: Conversation[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
  unreadCounts: { parents: number; admin: number };
}

export default function ChatList({ tabValue, setTabValue, searchQuery, setSearchQuery, conversations, activeChatId, onSelect, unreadCounts }: Props) {
  return (
    <Box sx={{ width: { xs: '100%', md: '35%', lg: '30%' }, maxWidth: { md: 400 }, bgcolor: COLORS.cardBg, borderRight: { md: '1px solid' }, borderColor: COLORS.divider, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: COLORS.divider }}>
        <Typography variant="h5" fontWeight={700} mb={2}>Messages</Typography>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ minHeight: 40, mb: 2, '& .MuiTabs-indicator': { bgcolor: COLORS.primary } }}>
          <Tab label={<Badge badgeContent={unreadCounts.parents} color="error" sx={{ px: 1 }}>Parents</Badge>} />
          <Tab label={<Badge badgeContent={unreadCounts.admin} color="error" sx={{ px: 1 }}>Admin</Badge>} />
        </Tabs>
        <TextField fullWidth size="small" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: COLORS.textSecondary }} /></InputAdornment> }} />
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List disablePadding>
          {conversations.map((c, i) => (
            <React.Fragment key={c.id}>
              <ListItemButton selected={activeChatId === c.id} onClick={() => onSelect(c.id)} sx={{ py: 1.5, px: 2, borderLeft: activeChatId === c.id ? `4px solid ${COLORS.primary}` : '4px solid transparent', '&.Mui-selected': { bgcolor: alpha(COLORS.primary, 0.08) } }}>
                <ListItemAvatar>
                  <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={c.user.isOnline ? <CircleIcon sx={{ fontSize: 12, color: COLORS.online, bgcolor: 'white', borderRadius: '50%' }} /> : null}>
                    <Avatar sx={{ bgcolor: getAvatarColor(c.user.name) }}>{getInitials(c.user.name)}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={<Stack direction="row" justifyContent="space-between"><Typography variant="subtitle2" noWrap sx={{ width: 120 }}>{c.user.name}</Typography><Typography variant="caption" color="text.secondary">{c.lastMessageTime}</Typography></Stack>}
                  secondary={<Typography variant="body2" color="text.secondary" noWrap>{c.lastMessage}</Typography>}
                />
              </ListItemButton>
              {i < conversations.length - 1 && <Divider sx={{ mx: 2 }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}