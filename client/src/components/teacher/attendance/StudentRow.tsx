'use client';
import React from 'react';
import { Card, CardContent, Stack, Avatar, Box, Typography, ToggleButtonGroup, ToggleButton, alpha } from '@mui/material';
import { COLORS, AttendanceState, AttendanceStatus, getStatusConfig, getAvatarColor, getInitials } from './AttendanceConfig';

interface Props {
  data: AttendanceState;
  onStatusChange: (id: string, status: AttendanceStatus) => void;
}

export default function StudentRow({ data, onStatusChange }: Props) {
  const { student, status } = data;
  const config = getStatusConfig(status);

  const handleChange = (_: any, newStatus: AttendanceStatus | null) => {
    if (newStatus !== null) onStatusChange(student.id, newStatus);
  };

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: status !== 'unmarked' ? alpha(config.color, 0.3) : COLORS.divider, borderRadius: 3, bgcolor: status !== 'unmarked' ? alpha(config.bgColor, 0.3) : COLORS.cardBg, transition: 'all 0.2s ease' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          
          {/* Info */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
            <Avatar sx={{ width: 44, height: 44, bgcolor: getAvatarColor(student.name, student.gender), fontSize: '1rem', fontWeight: 600 }}>{getInitials(student.name)}</Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ maxWidth: { xs: 120, sm: 200 } }}>{student.name}</Typography>
              <Typography variant="caption" color="text.secondary">Roll No: {student.rollNo}</Typography>
            </Box>
          </Stack>

          {/* Toggles */}
          <ToggleButtonGroup value={status} exclusive onChange={handleChange} size="small" sx={{ '& .MuiToggleButton-root': { minWidth: 48, minHeight: 44, border: '2px solid', borderRadius: '12px !important', mx: 0.5, fontWeight: 700, fontSize: '1rem' } }}>
            <ToggleButton value="present" sx={{ borderColor: COLORS.present, color: COLORS.present, '&.Mui-selected': { bgcolor: COLORS.present, color: 'white', borderColor: COLORS.present } }}>P</ToggleButton>
            <ToggleButton value="absent" sx={{ borderColor: COLORS.absent, color: COLORS.absent, '&.Mui-selected': { bgcolor: COLORS.absent, color: 'white', borderColor: COLORS.absent } }}>A</ToggleButton>
            <ToggleButton value="late" sx={{ borderColor: COLORS.late, color: COLORS.late, '&.Mui-selected': { bgcolor: COLORS.late, color: 'white', borderColor: COLORS.late } }}>L</ToggleButton>
          </ToggleButtonGroup>

        </Stack>
      </CardContent>
    </Card>
  );
}