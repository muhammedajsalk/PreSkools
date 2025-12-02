'use client';
import React, { useState } from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, Button, alpha } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AttachmentIcon from '@mui/icons-material/AttachFile';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import InfoIcon from '@mui/icons-material/Info';
import { ClassNotice, COLORS, getCategoryConfig } from './MessageConfig';

export default function NoticeCard({ notice }: { notice: ClassNotice }) {
  const categoryConfig = getCategoryConfig(notice.category);
  const [expanded, setExpanded] = useState(false);
  const displayText = !expanded && notice.message.length > 120 ? notice.message.substring(0, 120) + '...' : notice.message;

  return (
    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: notice.isRead ? COLORS.divider : alpha(COLORS.secondary, 0.3), borderLeft: `4px solid ${categoryConfig.color}`, bgcolor: notice.isRead ? COLORS.cardBg : alpha(COLORS.secondary, 0.03) }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} mb={1.5}>
          <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: alpha(categoryConfig.color, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center', color: categoryConfig.color, flexShrink: 0 }}>{categoryConfig.icon}</Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={notice.isRead ? 600 : 700}>{notice.title}</Typography>
            <Stack direction="row" spacing={1} alignItems="center"><Typography variant="caption" color="text.secondary">{notice.senderName} • {notice.date}</Typography>{notice.hasAttachment && <AttachmentIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} />}</Stack>
          </Box>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: 'pre-line' }}>{displayText}</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip icon={notice.priority === 'urgent' ? <PriorityHighIcon /> : <InfoIcon />} label={notice.priority === 'urgent' ? 'Urgent' : 'Info'} size="small" sx={{ bgcolor: notice.priority === 'urgent' ? COLORS.errorLight : COLORS.infoLight, color: notice.priority === 'urgent' ? COLORS.error : COLORS.info, fontWeight: 600 }} />
          {notice.message.length > 120 && <Button size="small" onClick={() => setExpanded(!expanded)} endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} sx={{ color: categoryConfig.color }}>{expanded ? 'Less' : 'More'}</Button>}
        </Stack>
      </CardContent>
    </Card>
  );
}