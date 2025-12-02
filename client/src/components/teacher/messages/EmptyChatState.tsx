import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { COLORS } from './MessagesConfig';

export default function EmptyChatState() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p: 4, textAlign: 'center' }}>
      <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <SendIcon sx={{ fontSize: 48, color: COLORS.primary }} />
      </Box>
      <Typography variant="h6" fontWeight={600} color="text.primary">Select a Conversation</Typography>
    </Box>
  );
}