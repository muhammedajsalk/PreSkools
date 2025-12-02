'use client';
import React from 'react';
import { Paper, Stack, IconButton, TextField, InputAdornment, Box, Chip, Fade, CircularProgress, alpha } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CameraIcon from '@mui/icons-material/CameraAlt';
import EmojiIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { COLORS, QUICK_REPLIES } from './ChatConfig';

interface Props { inputText: string; setInputText: (t: string) => void; onSend: () => void; isSending: boolean; showQuick: boolean; setShowQuick: (b: boolean) => void; }

export default function ChatInput({ inputText, setInputText, onSend, isSending, showQuick, setShowQuick }: Props) {
  return (
    <>
      <Fade in={showQuick}><Box sx={{ px: 2, py: 1, bgcolor: COLORS.cardBg, borderTop: '1px solid', borderColor: COLORS.divider, display: showQuick ? 'block' : 'none' }}><Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>{QUICK_REPLIES.map((q) => <Chip key={q.id} label={q.text} onClick={() => { setInputText(q.text); setShowQuick(false); }} sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primary, fontWeight: 500 }} />)}</Stack></Box></Fade>
      
      <Paper elevation={0} sx={{ position: 'sticky', bottom: 0, bgcolor: COLORS.cardBg, borderTop: '1px solid', borderColor: COLORS.divider, p: 1.5 }}>
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <IconButton sx={{ color: COLORS.textSecondary }}><AttachFileIcon /></IconButton>
          <IconButton sx={{ color: COLORS.textSecondary }}><CameraIcon /></IconButton>
          <TextField fullWidth multiline maxRows={4} placeholder="Type..." value={inputText} onChange={(e) => setInputText(e.target.value)} onFocus={() => setShowQuick(true)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onSend())} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: COLORS.background } }} InputProps={{ endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowQuick(!showQuick)}><EmojiIcon /></IconButton></InputAdornment> }} />
          {inputText.trim() ? (
            <IconButton onClick={onSend} disabled={isSending} sx={{ bgcolor: COLORS.primary, color: 'white', width: 48, height: 48, '&:hover': { bgcolor: COLORS.primaryDark } }}>{isSending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}</IconButton>
          ) : <IconButton sx={{ bgcolor: COLORS.primary, color: 'white', width: 48, height: 48 }}><MicIcon /></IconButton>}
        </Stack>
      </Paper>
    </>
  );
}