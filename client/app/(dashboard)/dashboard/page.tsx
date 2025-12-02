'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { brandColors, MOCK_DATA } from '../../../src/components/dashboard/DashboardConfig';
import WelcomeBanner from '../../../src/components/dashboard/WelcomeBanner';
import DailyStats from '../../../src/components/dashboard/DailyStats';
import FeeOverview from '../../../src/components/dashboard/FeeOverview';
import ActivityFeed from '../../../src/components/dashboard/ActivityFeed';
import QuickActions from '../../../src/components/dashboard/QuickActions';
import SchoolSpeedDial from '../../../src/components/dashboard/SchoolSpeedDial';

export default function SchoolAdminDashboard() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: brandColors.background.default, p: { xs: 2, sm: 3, md: 4 }, pb: 10 }}>
      <WelcomeBanner />
      <DailyStats stats={MOCK_DATA.dailyStats} />
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <FeeOverview fees={MOCK_DATA.feeData} />
        <ActivityFeed activities={MOCK_DATA.classroomActivities} />
      </Stack>
      <QuickActions actions={MOCK_DATA.quickActions} />
      <SchoolSpeedDial />
      <style jsx global>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }`}</style>
    </Box>
  );
}