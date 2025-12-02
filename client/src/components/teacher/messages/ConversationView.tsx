'use client';
import React, { useRef, useEffect } from 'react';
import { Box, Paper, Stack, IconButton, Badge, Avatar, Typography, Tooltip, TextField, Chip, alpha } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from '@mui/icons-material/Circle';
import { COLORS, Conversation, Message, QUICK_REPLIES, getAvatarColor, getInitials } from './MessagesConfig';
import MessageBubble from './MessageBubble';

interface Props {
  conversation: Conversation;
  messages: Message[];
  onBack: () => void;
  messageText: string;
  setMessageText: (t: string) => void;
  onSend: () => void;
  isMobile: boolean;
}

export default function ConversationView({ conversation, messages, onBack, messageText, setMessageText, onSend, isMobile }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: COLORS.chatBg, height: '100%' }}>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 1.5, borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {isMobile && <IconButton onClick={onBack} size="small"><ArrowBackIcon /></IconButton>}
          <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={conversation.user.isOnline ? <CircleIcon sx={{ fontSize: 12, color: COLORS.online }} /> : null}>
            <Avatar sx={{ bgcolor: getAvatarColor(conversation.user.name) }}>{getInitials(conversation.user.name)}</Avatar>
          </Badge>
          <Box><Typography variant="subtitle1" fontWeight={600}>{conversation.user.name}</Typography><Typography variant="caption" color="text.secondary">{conversation.user.isOnline ? 'Online' : 'Offline'}</Typography></Box>
        </Stack>
        <Stack direction="row"><IconButton><PhoneIcon /></IconButton><IconButton><MoreVertIcon /></IconButton></Stack>
      </Paper>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
        <div ref={endRef} />
      </Box>

      {/* Quick Replies */}
      <Box sx={{ px: 2, py: 1, bgcolor: 'white', borderTop: '1px solid', borderColor: COLORS.divider, overflowX: 'auto' }}>
        <Stack direction="row" spacing={1}>
          {QUICK_REPLIES.map((q) => <Chip key={q.id} label={q.text} onClick={() => setMessageText(q.text)} sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark }} />)}
        </Stack>
      </Box>

      {/* Input */}
      <Paper elevation={2} sx={{ p: 1.5, borderRadius: 0, display: 'flex', gap: 1 }}>
        <TextField fullWidth placeholder="Type..." value={messageText} onChange={(e) => setMessageText(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: COLORS.background } }} />
        <IconButton onClick={onSend} disabled={!messageText.trim()} sx={{ bgcolor: COLORS.primary, color: 'white', '&:hover': { bgcolor: COLORS.primaryDark } }}><SendIcon /></IconButton>
      </Paper>
    </Box>
  );
}