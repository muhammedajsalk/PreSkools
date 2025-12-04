'use client';
import React from 'react';
import { Box, Typography, Badge, Avatar, alpha } from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { COLORS } from './HistoryConfig';

interface Props { students: any[]; selectedId: string | null; onSelect: (id: string | null) => void; }

export default function StudentFilter({ students, selectedId, onSelect }: Props) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, px: 0.5 }}><ChildCareIcon sx={{ fontSize: 18, color: 'text.secondary' }} /><Typography variant="caption" fontWeight={600} color="text.secondary">FILTER BY STUDENT</Typography></Box>
      <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1, px: 0.5, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        {students.map((student) => {
          const isSelected = student.id === 'all' ? selectedId === null : selectedId === student.id;
          return (
            <Box key={student.id} onClick={() => onSelect(student.id === 'all' ? null : student.id)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75, cursor: 'pointer', minWidth: 64 }}>
              <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={isSelected ? <CheckCircleIcon sx={{ fontSize: 16, color: COLORS.primary, bgcolor: 'white', borderRadius: '50%' }} /> : null}>
                <Avatar sx={{ width: 52, height: 52, bgcolor: isSelected ? COLORS.primary : alpha(student.color, 0.8), fontSize: student.id === 'all' ? 11 : 14, fontWeight: 700, border: '3px solid', borderColor: isSelected ? COLORS.primary : 'transparent' }}>{student.id === 'all' ? <AllInclusiveIcon /> : student.initials}</Avatar>
              </Badge>
              <Typography variant="caption" fontWeight={isSelected ? 700 : 500} sx={{ color: isSelected ? COLORS.primaryDark : 'text.secondary', maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.id === 'all' ? 'All' : student.name.split(' ')[0]}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}