'use client';
import React from 'react';
import { Card, CardContent, Box, Stack, Typography, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { COLORS } from './AttendanceConfig';

interface Props {
  present: number;
  absent: number;
  late: number;
  unmarked: number;
  total: number;
}

export default function AttendanceSummary({ present, absent, late, unmarked, total }: Props) {
  const markedCount = present + absent + late;
  const progress = (markedCount / total) * 100;

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, position: 'sticky', top: 0, zIndex: 10, bgcolor: COLORS.cardBg }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        
        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.secondary">Marking Progress</Typography>
            <Typography variant="caption" fontWeight={600} color="text.primary">{markedCount}/{total} marked</Typography>
          </Stack>
          <Box sx={{ height: 8, borderRadius: 4, bgcolor: COLORS.unmarkedBg, overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: `${progress}%`, borderRadius: 4, bgcolor: progress === 100 ? COLORS.success : COLORS.primary, transition: 'width 0.3s ease' }} />
          </Box>
        </Box>

        {/* Stats Row */}
        <Stack direction="row" justifyContent="space-around" divider={<Divider orientation="vertical" flexItem />}>
          <Box sx={{ textAlign: 'center', px: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <CheckCircleIcon sx={{ fontSize: 18, color: COLORS.present }} />
              <Typography variant="h5" fontWeight={700} color={COLORS.present}>{present}</Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">Present</Typography>
          </Box>

          <Box sx={{ textAlign: 'center', px: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <CancelIcon sx={{ fontSize: 18, color: COLORS.absent }} />
              <Typography variant="h5" fontWeight={700} color={COLORS.absent}>{absent}</Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">Absent</Typography>
          </Box>

          <Box sx={{ textAlign: 'center', px: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
              <AccessTimeIcon sx={{ fontSize: 18, color: COLORS.late }} />
              <Typography variant="h5" fontWeight={700} color={COLORS.late}>{late}</Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">Late</Typography>
          </Box>

          <Box sx={{ textAlign: 'center', px: 1 }}>
            <Typography variant="h5" fontWeight={700} color={COLORS.unmarked}>{unmarked}</Typography>
            <Typography variant="caption" color="text.secondary">Left</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}