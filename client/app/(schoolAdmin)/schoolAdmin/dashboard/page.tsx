'use client';
import React, { useMemo } from 'react';
import { Box, Stack, CircularProgress } from '@mui/material';
import { brandColors, MOCK_DATA } from '@/src/components/dashboard/DashboardConfig';
import WelcomeBanner from '@/src/components/dashboard/WelcomeBanner';
import DailyStats from '@/src/components/dashboard/DailyStats';
import FeeOverview from '@/src/components/dashboard/FeeOverview';
import ActivityFeed from '@/src/components/dashboard/ActivityFeed';
import QuickActions from '@/src/components/dashboard/QuickActions';
import SchoolSpeedDial from '@/src/components/dashboard/SchoolSpeedDial';
import { useRouter } from 'next/navigation';

// 1. Only Import Auth API Hook
import { useGetMeQuery } from '@/src/store/api/authApiSlice';

export default function SchoolAdminDashboard() {
  // 2. Only Fetch User Data
  const { data: userData, isLoading } = useGetMeQuery(undefined);
  const router = useRouter();

  // Debugging (Optional)
  // console.log(userData);

  // 3. Use Mock Stats (Since we removed real student/teacher APIs)
  // If you want dynamic stats later, you can add those hooks back.
  const realStats = MOCK_DATA.dailyStats;

  const navigationActions = useMemo(() => {
    return MOCK_DATA.quickActions.map((action) => ({
      ...action,
      onClick: () => {
        switch (action.id) { // Assuming MOCK_DATA has 'id' fields like 'add-student', 'fees', etc.
          case '1': // Record Fee (Example ID from mock)
            router.push('/schoolAdmin/fees'); 
            break;
          case '2': // Send Notice
            router.push('/schoolAdmin/announcements');
            break;
          case '3': // Add Student
            router.push('/schoolAdmin/students'); // Goes to list where "Add" button exists
            break;
          case '4': // View Gallery / Other
            router.push('/schoolAdmin/gallery');
            break;
          case '5': // Attendance
            router.push('/schoolAdmin/attendance');
            break;
          case '6': // Manage Staff
            router.push('/schoolAdmin/teachers');
            break;
          case '7':
            router.push('/schoolAdmin/academic');
            break;
          default:
            console.log(`No route defined for action: ${action.label}`);
        }
      }
    }));
  }, [router]);

  // 4. Get School Name safely
  const schoolName = userData?.data?.school_id?.name || userData?.data?.name || "Administrator";

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: brandColors.background.default }}>
        <CircularProgress sx={{ color: brandColors.primary.main }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: brandColors.background.default, p: { xs: 2, sm: 3, md: 4 }, pb: 10 }}>
      
      {/* Pass Real Name to Banner */}
      <WelcomeBanner name={schoolName} />
      
      {/* Use Mock Stats for now */}
      <DailyStats stats={realStats} />
      
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <FeeOverview fees={MOCK_DATA.feeData} />
        <ActivityFeed activities={MOCK_DATA.classroomActivities} />
      </Stack>
      
      <QuickActions actions={navigationActions} />
      
      <SchoolSpeedDial />
      
      <style jsx global>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }`}</style>
    </Box>
  );
}