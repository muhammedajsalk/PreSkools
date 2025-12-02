'use client';
import React from 'react';
import { Card, CardActionArea, Stack, Avatar, Box, Typography, Chip, Divider, Button, alpha } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Chat';
import { Student, COLORS, getAvatarColor, getInitials } from './RosterConfig';

interface Props {
  student: Student;
  onClick: () => void;
  onCall: (e: React.MouseEvent) => void;
  onMessage: (e: React.MouseEvent) => void;
}

export default function StudentGridCard({ student, onClick, onCall, onMessage }: Props) {
  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, transition: 'all 0.2s', position: 'relative', overflow: 'visible', '&:hover': { borderColor: COLORS.primary, boxShadow: `0 4px 20px ${alpha(COLORS.primary, 0.15)}`, transform: 'translateY(-2px)' } }}>
      <Box sx={{ position: 'absolute', top: 12, right: 12, width: 10, height: 10, borderRadius: '50%', bgcolor: student.isPresent ? COLORS.success : COLORS.error, border: '2px solid white', boxShadow: 1 }} />
      <CardActionArea onClick={onClick} sx={{ p: 2.5 }}>
        <Stack alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 72, height: 72, bgcolor: getAvatarColor(student.name, student.gender), fontSize: '1.5rem', fontWeight: 600, boxShadow: 2 }}>{getInitials(student.name)}</Avatar>
          <Box sx={{ textAlign: 'center' }}><Typography variant="subtitle1" fontWeight={600} noWrap>{student.name}</Typography><Typography variant="caption" color="text.secondary">Roll No: {student.rollNo}</Typography></Box>
          <Chip icon={student.gender === 'male' ? <MaleIcon sx={{ fontSize: 16 }} /> : <FemaleIcon sx={{ fontSize: 16 }} />} label={student.gender === 'male' ? 'Boy' : 'Girl'} size="small" sx={{ bgcolor: alpha(student.gender === 'male' ? COLORS.male : COLORS.female, 0.1), color: student.gender === 'male' ? COLORS.male : COLORS.female, fontWeight: 500, '& .MuiChip-icon': { color: 'inherit' } }} />
        </Stack>
      </CardActionArea>
      <Divider />
      <Stack direction="row" sx={{ '& > *': { flex: 1 } }}>
        <Button onClick={onCall} startIcon={<PhoneIcon />} sx={{ py: 1, borderRadius: 0, borderBottomLeftRadius: 12, color: COLORS.primary, fontWeight: 600, fontSize: '0.8rem', '&:hover': { bgcolor: alpha(COLORS.primary, 0.08) } }}>Call</Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={onMessage} startIcon={<MessageIcon />} sx={{ py: 1, borderRadius: 0, borderBottomRightRadius: 12, color: COLORS.secondary, fontWeight: 600, fontSize: '0.8rem', '&:hover': { bgcolor: alpha(COLORS.secondary, 0.08) } }}>Message</Button>
      </Stack>
    </Card>
  );
}