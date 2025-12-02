'use client';
import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import { Card, CardContent, CardActions, Box, Typography, Chip, Avatar, Button, Collapse, Divider, alpha } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Notice, COLORS, formatDate, getInitials, getAccentColor } from './AnnouncementConfig';

interface Props { notice: Notice; showActions: boolean; onEdit: (n: Notice) => void; onDelete: (id: string) => void; }

export default function NoticeCard({ notice, showActions, onEdit, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  
  // 2. Add state for the date string
  const [dateString, setDateString] = useState('');

  // 3. Set the date only after the component mounts on the client
  useEffect(() => {
    setDateString(formatDate(notice.createdAt));
  }, [notice.createdAt]);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: 4, borderLeftColor: getAccentColor(notice.sender.role) }}>
      <CardContent sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={700}>{notice.title}</Typography>
          
          {/* 4. Render the state variable */}
          <Typography variant="caption" color="text.secondary" fontWeight={500} whiteSpace="nowrap">
            {dateString || 'Loading...'}
          </Typography>

        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip icon={notice.priority === 'urgent' ? <PriorityHighIcon /> : <InfoIcon />} label={notice.priority === 'urgent' ? 'Urgent' : 'Info'} size="small" sx={{ bgcolor: notice.priority === 'urgent' ? alpha(COLORS.urgent, 0.1) : alpha(COLORS.info, 0.1), color: notice.priority === 'urgent' ? COLORS.urgent : COLORS.info, fontWeight: 600, fontSize: '0.75rem' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: getAccentColor(notice.sender.role), fontSize: '0.85rem' }}>{getInitials(notice.sender.name)}</Avatar>
          <Box><Typography variant="body2" fontWeight={600}>{notice.sender.name}</Typography><Typography variant="caption" color="text.secondary">{notice.sender.role === 'admin' ? 'Administration' : 'Class Teacher'}</Typography></Box>
        </Box>

        <Collapse in={expanded} collapsedSize={48}><Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>{notice.message}</Typography></Collapse>
        {notice.message.length > 100 && <Button size="small" onClick={() => setExpanded(!expanded)} endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} sx={{ mt: 1, p: 0, minWidth: 'auto', color: getAccentColor(notice.sender.role) }}>{expanded ? 'Show Less' : 'Read More'}</Button>}
      </CardContent>

      {showActions && (
        <>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end', px: 2, py: 1.5, gap: 1 }}>
            <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(notice)} sx={{ color: 'grey.600' }}>Edit</Button>
            <Button size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(notice.id)} sx={{ color: 'grey.600' }}>Delete</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}