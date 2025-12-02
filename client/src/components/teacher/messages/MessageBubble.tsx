'use client';
import React from 'react';
import { Box, Paper, Typography, Stack, alpha } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ImageIcon from '@mui/icons-material/Image';
import { Message, COLORS } from './MessagesConfig';

export default function MessageBubble({ message }: { message: Message }) {
  const { text, timestamp, status, isMe, attachments } = message;

  const StatusIcon = () => {
    if (!isMe) return null;
    if (status === 'read') return <DoneAllIcon sx={{ fontSize: 14, color: '#34D399' }} />;
    return <CheckIcon sx={{ fontSize: 14, color: 'inherit', opacity: 0.7 }} />;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', mb: 1.5, px: 2 }}>
      <Box sx={{ maxWidth: '75%', minWidth: 80 }}>
        {attachments?.map((att, i) => (
          <Box key={i} sx={{ width: 100, height: 100, borderRadius: 2, bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
            <ImageIcon sx={{ fontSize: 40, color: COLORS.primary }} />
          </Box>
        ))}
        <Paper elevation={0} sx={{ p: 1.5, bgcolor: isMe ? COLORS.sentBubble : COLORS.receivedBubble, color: isMe ? COLORS.sentText : COLORS.receivedText, borderRadius: 2.5, borderTopRightRadius: isMe ? 4 : 20, borderTopLeftRadius: isMe ? 20 : 4 }}>
          <Typography variant="body2" sx={{ wordBreak: 'break-word', lineHeight: 1.5 }}>{text}</Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ mt: 0.5 }}>
            <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>{timestamp}</Typography>
            <StatusIcon />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}