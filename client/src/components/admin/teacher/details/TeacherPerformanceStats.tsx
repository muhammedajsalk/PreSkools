'use client';
import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Avatar, LinearProgress, Alert } from '@mui/material';
import { TrendingUp, CheckCircle, Groups, AccessTime, Class, Phone } from '@mui/icons-material';
import { differenceInYears } from 'date-fns';
import { Teacher, TeacherStats, COLORS, formatPhoneDisplay } from './TeacherDetailsConfig';

export default function TeacherPerformanceStats({ teacher, stats }: { teacher: Teacher; stats: TeacherStats }) {
  const years = differenceInYears(new Date(), teacher.joiningDate);

  // Helper Component for Small Stats
  const StatItem = ({ icon, label, value, suffix, color, bgColor }: any) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, bgcolor: bgColor, transition: 'transform 0.2s', height: '100%', '&:hover': { transform: 'translateX(4px)' } }}>
      <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {value}{suffix && <Typography component="span" variant="body1" color="text.secondary">{suffix}</Typography>}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>{label}</Typography>
      </Box>
    </Box>
  );

  return (
    <Stack spacing={3}>
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, color: COLORS.tealDark }}>
            <TrendingUp sx={{ fontSize: 24 }} /> Performance Stats
          </Typography>

          {/* ✅ FIXED: Replaced Grid with CSS Grid Box */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            
            {/* 1. Attendance Card */}
            <Box sx={{ p: 3, borderRadius: 3, bgcolor: COLORS.tealLighter, border: `1px solid ${COLORS.tealLight}` }}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: COLORS.teal, width: 56, height: 56 }}><CheckCircle sx={{ fontSize: 28 }} /></Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={800} color={COLORS.tealDark}>{stats.attendanceRate}%</Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>Attendance Rate</Typography>
                </Box>
              </Stack>
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={stats.attendanceRate} sx={{ height: 8, borderRadius: 4, bgcolor: 'white', '& .MuiLinearProgress-bar': { bgcolor: COLORS.teal, borderRadius: 4 } }} />
              </Box>
            </Box>

            {/* 2. Total Students Card */}
            <Box sx={{ p: 3, borderRadius: 3, bgcolor: COLORS.orangeLight, border: `1px solid ${COLORS.orange}` }}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: COLORS.orange, width: 56, height: 56 }}><Groups sx={{ fontSize: 28 }} /></Avatar>
                <Box>
                  <Typography variant="h4" fontWeight={800} color={COLORS.orangeDark}>{stats.totalStudents}</Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>Students in Class</Typography>
                </Box>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                {teacher.classAssigned ? `Currently teaching ${teacher.classAssigned}` : 'No class assigned'}
              </Typography>
            </Box>

            {/* 3. Years at School */}
            <StatItem icon={<AccessTime />} label="Years at School" value={years} suffix=" years" color={COLORS.purple} bgColor={COLORS.purpleLight} />

            {/* 4. Classes Handled */}
            <StatItem icon={<Class />} label="Classes Handled" value={stats.classesHandled} color={COLORS.blue} bgColor={COLORS.blueLight} />

          </Box>
        </CardContent>
      </Card>

      <Alert severity="info" icon={<Phone />} sx={{ borderRadius: 2, bgcolor: COLORS.tealLighter, border: `1px solid ${COLORS.tealLight}`, '& .MuiAlert-icon': { color: COLORS.tealDark }, '& .MuiAlert-message': { color: COLORS.tealDark } }}>
        <Typography variant="body2" fontWeight={600}>📱 Account Login Information</Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>This teacher logs in using OTP sent to <strong>{formatPhoneDisplay(teacher.phone)}</strong>. Changing the phone number will update their login credentials.</Typography>
      </Alert>
    </Stack>
  );
}