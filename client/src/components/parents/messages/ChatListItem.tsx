'use client';
import React from 'react';
import { ListItem, ListItemButton, ListItemAvatar, Badge, Avatar, ListItemText, Stack, Typography, alpha } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { ChatMessage, COLORS, getAvatarColor, getInitials } from './MessageConfig';

interface Props { chat: ChatMessage; type: 'teacher' | 'admin'; onClick: () => void; }

export default function ChatListItem({ chat, type, onClick }: Props) {
  const accentColor = type === 'teacher' ? COLORS.teachers : COLORS.admin;

  const StatusIcon = () => {
    if (!chat.lastMessageIsMe) return null;
    if (chat.lastMessageStatus === 'read') return <DoneAllIcon sx={{ fontSize: 14, color: COLORS.info }} />;
    return <CheckIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} />;
  };

  return (
    <ListItem disablePadding sx={{ mb: 1 }}>
      <ListItemButton onClick={onClick} sx={{ borderRadius: 3, py: 1.5, px: 2, bgcolor: chat.unreadCount > 0 ? alpha(accentColor, 0.06) : 'transparent', border: '1px solid', borderColor: chat.unreadCount > 0 ? alpha(accentColor, 0.2) : 'transparent' }}>
        <ListItemAvatar>
          <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={chat.isOnline ? <CircleIcon sx={{ fontSize: 12, color: COLORS.online, bgcolor: 'white', borderRadius: '50%' }} /> : null}>
            <Avatar sx={{ width: 52, height: 52, bgcolor: getAvatarColor(chat.participantName, type), fontSize: '1.1rem', fontWeight: 600 }}>{getInitials(chat.participantName)}</Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText sx={{ ml: 1 }} primary={<Stack direction="row" justifyContent="space-between"><Typography variant="subtitle2" fontWeight={chat.unreadCount > 0 ? 700 : 600}>{chat.participantName}</Typography><Typography variant="caption" color={chat.unreadCount > 0 ? accentColor : 'text.secondary'} fontWeight={chat.unreadCount > 0 ? 600 : 400}>{chat.lastMessageTime}</Typography></Stack>} secondary={<Stack spacing={0.25}><Typography variant="caption" color="text.secondary">{chat.participantRole}</Typography><Stack direction="row" justifyContent="space-between"><Stack direction="row" alignItems="center" spacing={0.5}><StatusIcon /><Typography variant="body2" color={chat.unreadCount > 0 ? 'text.primary' : 'text.secondary'} noWrap>{chat.isTyping ? 'typing...' : chat.lastMessage}</Typography></Stack>{chat.unreadCount > 0 && <Badge badgeContent={chat.unreadCount} sx={{ ml: 1, '& .MuiBadge-badge': { bgcolor: accentColor, color: 'white' } }} />}</Stack></Stack>} />
      </ListItemButton>
    </ListItem>
  );
}