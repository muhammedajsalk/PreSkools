'use client';
import React from 'react';
import { Box, Stack, Typography, Chip, Card, CardContent, Avatar, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { COLORS, AbsentStudent, getAvatarColor, getInitials } from './TeacherConfig';

export default function AbsentStudents({ students }: { students: AbsentStudent[] }) {
  if (students.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1" fontWeight={700}>Who's Away Today?</Typography>
          <Chip label={students.length} size="small" sx={{ height: 22, bgcolor: alpha(COLORS.error, 0.1), color: COLORS.error, fontWeight: 700 }} />
        </Stack>
        <Typography variant="body2" sx={{ color: COLORS.primary, display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>View All <ArrowForwardIcon sx={{ fontSize: 16 }} /></Typography>
      </Stack>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, scrollSnapType: 'x mandatory' }}>
        {students.map((s) => (
          <Box key={s.id} sx={{ scrollSnapAlign: 'start' }}>
            <Card elevation={0} sx={{ minWidth: 140, border: '1px solid', borderColor: COLORS.divider, borderRadius: 3 }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: getAvatarColor(s.name), mx: 'auto', mb: 1, border: '3px solid', borderColor: alpha(COLORS.error, 0.2) }}>{getInitials(s.name)}</Avatar>
                <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 120 }}>{s.name}</Typography>
                <Chip label={s.reason} size="small" sx={{ mt: 1, fontSize: '0.65rem', height: 20, bgcolor: alpha(COLORS.error, 0.1), color: COLORS.error }} />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}