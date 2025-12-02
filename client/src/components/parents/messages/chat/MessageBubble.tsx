'use client';
import React from 'react';
import { Box, Avatar, Paper, Typography, Stack, CircularProgress, Tooltip, alpha } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ImageIcon from '@mui/icons-material/Image';
import FileIcon from '@mui/icons-material/Description';
import { Message, COLORS, getAvatarColor, getInitials } from './ChatConfig';

interface Props { message: Message; showAvatar?: boolean; participantName?: string; participantType?: 'teacher' | 'admin'; }

export default function MessageBubble({ message, showAvatar = true, participantName = '', participantType = 'teacher' }: Props) {
  const { text, timestamp, status, isMe, attachments } = message;

  const StatusIcon = () => {
    if (!isMe) return null;
    if (status === 'read') return <DoneAllIcon sx={{ fontSize: 14, color: '#34D399' }} />;
    if (status === 'sending') return <CircularProgress size={12} sx={{ color: 'inherit', opacity: 0.7 }} />;
    return <CheckIcon sx={{ fontSize: 14, opacity: 0.7 }} />;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', alignItems: 'flex-end', mb: 1, px: 2, gap: 1 }}>
      {!isMe && showAvatar && <Avatar sx={{ width: 32, height: 32, bgcolor: getAvatarColor(participantType), fontSize: '0.75rem', mb: 0.5 }}>{getInitials(participantName)}</Avatar>}
      {!isMe && !showAvatar && <Box sx={{ width: 32 }} />}

      <Box sx={{ maxWidth: '75%' }}>
        <Paper elevation={0} sx={{ p: 1.5, px: 2, bgcolor: isMe ? COLORS.sentBubble : COLORS.receivedBubble, color: isMe ? COLORS.sentText : COLORS.receivedText, borderRadius: 3, borderTopRightRadius: isMe ? 6 : 20, borderTopLeftRadius: isMe ? 20 : 6, boxShadow: `0 2px 8px ${alpha(isMe ? COLORS.primary : '#000', isMe ? 0.25 : 0.05)}` }}>
          {text && <Typography variant="body2" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{text}</Typography>}
          
          {attachments?.map((att) => (
            <Box key={att.id} sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: isMe ? alpha('#fff', 0.1) : alpha(COLORS.primary, 0.05), mt: text ? 1 : 0, p: att.type === 'file' ? 1.5 : 0 }}>
              {att.type === 'image' ? <Box sx={{ width: 200, height: 150, bgcolor: alpha(isMe ? '#fff' : COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon sx={{ fontSize: 48, opacity: 0.5 }} /></Box> : <Stack direction="row" spacing={1.5} alignItems="center"><FileIcon /><Typography variant="body2" noWrap>{att.name}</Typography></Stack>}
            </Box>
          ))}

          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ mt: 0.5 }}>
            <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.7 }}>{timestamp}</Typography>
            <StatusIcon />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}