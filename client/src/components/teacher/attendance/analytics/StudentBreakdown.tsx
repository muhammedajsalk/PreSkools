'use client';
import React from 'react';
import { Card, CardContent, Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Chip, alpha } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLORS, StudentAttendance } from './AnalyticsConfig';

export default function StudentBreakdown({ students }: { students: StudentAttendance[] }) {
  if (students.length === 0) return (
    <Box sx={{ p: 4, textAlign: 'center', bgcolor: alpha(COLORS.present, 0.08), borderRadius: 3, border: '1px dashed', borderColor: COLORS.present }}>
      <CheckCircleIcon sx={{ fontSize: 48, color: COLORS.present, mb: 1.5 }} />
      <Typography variant="h6" fontWeight={600} color={COLORS.present}>Excellent Attendance!</Typography>
      <Typography variant="body2" color="text.secondary">All students have maintained good attendance.</Typography>
    </Box>
  );

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}><WarningIcon sx={{ color: COLORS.late }} /><Typography variant="h6" fontWeight={700}>Students Requiring Attention</Typography></Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Students with attendance rates below 85%</Typography>
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(COLORS.present, 0.04) }}>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Rate</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Present</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Absent</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: s.status === 'critical' ? alpha(COLORS.absent, 0.15) : alpha(COLORS.late, 0.15), color: s.status === 'critical' ? COLORS.absent : COLORS.late, fontSize: 14 }}>{s.avatar}</Avatar>
                      <Typography variant="body2" fontWeight={600}>{s.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={700} color={s.status === 'critical' ? COLORS.absent : COLORS.late}>{s.attendanceRate}%</Typography>
                  </TableCell>
                  <TableCell align="center">{s.daysPresent}</TableCell>
                  <TableCell align="center" sx={{ color: COLORS.absent, fontWeight: 600 }}>{s.daysAbsent}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      icon={s.status === 'critical' ? <PersonOffIcon sx={{ fontSize: 16 }} /> : <WarningIcon sx={{ fontSize: 16 }} />} 
                      label={s.status === 'critical' ? 'Critical' : 'Warning'} 
                      size="small" 
                      sx={{ 
                        bgcolor: s.status === 'critical' ? alpha(COLORS.absent, 0.12) : alpha(COLORS.late, 0.12), 
                        color: s.status === 'critical' ? COLORS.absent : COLORS.late, 
                        fontWeight: 600 
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}