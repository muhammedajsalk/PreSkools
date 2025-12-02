'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { COLORS, TEACHER_DATA } from '../../../src/components/teacher/TeacherConfig';
import TeacherHeader from '../../../src/components/teacher/TeacherHeader';
import CurrentStatusCard from '../../../src/components/teacher/CurrentStatusCard';
import QuickActions from '../../../src/components/teacher/QuickActions';
import AbsentStudents from '../../../src/components/teacher/AbsentStudents';
import RecentActivity from '../../../src/components/teacher/RecentActivity';
import SecondaryActions from '../../../src/components/teacher/SecondaryActions'; // (Create this similar to QuickActions if needed)

export default function TeacherDashboardPage() {
  const [teacher] = useState(TEACHER_DATA);

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 4 }}>
      <TeacherHeader teacher={teacher} />
      <Box sx={{ px: { xs: 2, sm: 3 }, mt: -3 }}><CurrentStatusCard status={teacher.currentStatus} /></Box>
      <Box sx={{ px: { xs: 2, sm: 3 } }}>
        <QuickActions />
        <SecondaryActions/>
        <AbsentStudents students={teacher.absentStudents} />
        <RecentActivity logs={teacher.recentLogs} />
      </Box>
    </Box>
  );
}