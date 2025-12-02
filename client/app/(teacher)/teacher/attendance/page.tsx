'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Stack, Typography, IconButton, Chip, Button, Snackbar, Alert, alpha } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Link from 'next/link';
import { COLORS, MOCK_STUDENTS, CLASS_INFO, AttendanceState, AttendanceStatus } from '../../../../src/components/teacher/attendance/AttendanceConfig';
import AttendanceSummary from '../../../../src/components/teacher/attendance/AttendanceSummary';
import StudentRow from '../../../../src/components/teacher/attendance/StudentRow';
import BottomActionBar from '../../../../src/components/teacher/attendance/BottomActionBar';

export default function TeacherAttendancePage() {
  const [attendanceData, setAttendanceData] = useState<AttendanceState[]>(MOCK_STUDENTS.map(s => ({ student: s, status: 'unmarked' })));
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({ open: false, message: '', severity: 'success' });
  
  // 2. Add State for Date
  const [dateString, setDateString] = useState<string>('');

  // 3. Set Date on Client Mount
  useEffect(() => {
    setDateString(new Date().toLocaleDateString('en-IN', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }));
  }, []);

  const stats = useMemo(() => attendanceData.reduce((acc, { status }) => { acc[status]++; return acc; }, { present: 0, absent: 0, late: 0, unmarked: 0 }), [attendanceData]);

  const handleStatusChange = (id: string, status: AttendanceStatus) => setAttendanceData(p => p.map(i => i.student.id === id ? { ...i, status } : i));
  const handleMarkAllPresent = () => { setAttendanceData(p => p.map(i => ({ ...i, status: 'present' }))); setSnackbar({ open: true, message: 'All Marked Present', severity: 'success' }); };
  const handleReset = () => { setAttendanceData(p => p.map(i => ({ ...i, status: 'unmarked' }))); setSnackbar({ open: true, message: 'Reset', severity: 'info' }); };
  
  const handleSave = async () => {
    if (stats.unmarked > 0) return setSnackbar({ open: true, message: `Mark remaining ${stats.unmarked} students`, severity: 'error' });
    setSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    setSaving(false);
    setSnackbar({ open: true, message: 'Attendance Saved!', severity: 'success' });
  };

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: { xs: 12, sm: 10 } }}>
      {/* Header */}
      <Box sx={{ bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider, position: 'sticky', top: 0, zIndex: 20 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton component={Link} href="/teacher" sx={{ color: COLORS.textSecondary }}><ArrowBackIcon /></IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700} color="text.primary">Mark Attendance</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Chip label={`${CLASS_INFO.name}-${CLASS_INFO.section}`} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 600, height: 22 }} />
                
                {/* 4. Use the state variable instead of new Date() */}
                <Typography variant="caption" color="text.secondary">
                  {dateString || 'Loading...'}
                </Typography>

              </Stack>
            </Box>
          </Stack>
          <IconButton onClick={handleReset} sx={{ color: COLORS.textSecondary }}><RefreshIcon /></IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
        <Button fullWidth variant="outlined" startIcon={<DoneAllIcon />} onClick={handleMarkAllPresent} disabled={stats.unmarked === 0 && stats.present === attendanceData.length} sx={{ mb: 2, py: 1.5, borderColor: COLORS.primary, color: COLORS.primary, borderRadius: 3, fontWeight: 600, textTransform: 'none' }}>Mark All Present</Button>
        <Box sx={{ mb: 2 }}><AttendanceSummary {...stats} total={attendanceData.length} /></Box>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 1.5, px: 0.5 }}>STUDENTS ({attendanceData.length})</Typography>
        <Stack spacing={1.5}>
          {attendanceData.map((d) => <StudentRow key={d.student.id} data={d} onStatusChange={handleStatusChange} />)}
        </Stack>
      </Box>

      <BottomActionBar stats={stats} onSave={handleSave} saving={saving} />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}><Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>{snackbar.message}</Alert></Snackbar>
    </Box>
  );
}