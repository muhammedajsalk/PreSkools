'use client';
import React from 'react';
import { Paper, Stack, IconButton, Badge, Avatar, Box, Typography, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import VideoCallIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import { COLORS, ChatParticipant, getAvatarColor, getInitials } from './ChatConfig';

interface Props { participant: ChatParticipant; onBack: () => void; }

export default function ChatHeader({ participant, onBack }: Props) {
  return (
    <Paper elevation={0} sx={{ position: 'sticky', top: 0, zIndex: 20, bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={onBack} sx={{ color: COLORS.textPrimary }}><ArrowBackIcon /></IconButton>
          <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={participant.isOnline ? <CircleIcon sx={{ fontSize: 12, color: COLORS.online, bgcolor: 'white', borderRadius: '50%' }} /> : null}>
            <Avatar sx={{ width: 44, height: 44, bgcolor: getAvatarColor(participant.type), fontSize: '1rem', fontWeight: 600 }}>{getInitials(participant.name)}</Avatar>
          </Badge>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">{participant.name}</Typography>
            <Typography variant="caption" color="text.secondary">{participant.isOnline ? <Box component="span" sx={{ color: COLORS.online }}>Online</Box> : `Last seen ${participant.lastSeen || 'recently'}`}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Voice Call"><IconButton sx={{ color: COLORS.primary }}><PhoneIcon /></IconButton></Tooltip>
          <Tooltip title="Video Call"><IconButton sx={{ color: COLORS.primary }}><VideoCallIcon /></IconButton></Tooltip>
          <IconButton sx={{ color: COLORS.textSecondary }}><MoreVertIcon /></IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}