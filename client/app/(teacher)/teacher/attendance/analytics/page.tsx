'use client';
import React, { useState, useMemo } from 'react';
import { Box, Typography, CircularProgress, alpha } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Config & Components
import { COLORS, TimeRange } from '@/src/components/teacher/attendance/analytics/AnalyticsConfig';
import MetricCards from '@/src/components/teacher/attendance/analytics/MetricCards';
import FilterToolbar from '@/src/components/teacher/attendance/analytics/FilterToolbar';
import AttendanceChart from '@/src/components/teacher/attendance/analytics/AttendanceChart';
import StudentBreakdown from '@/src/components/teacher/attendance/analytics/StudentBreakdown';

// API Hooks
import { useGetAttendanceAnalyticsQuery } from '@/src/store/api/attendanceApiSlice';
import { useGetMeQuery } from '@/src/store/api/authApiSlice';
import { useGetClassesQuery } from '@/src/store/api/academicApiSlice';

export default function AttendanceAnalyticsPage() {
  // 1. State for Filters
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [customDate, setCustomDate] = useState<Dayjs>(dayjs());

  // 2. Get Teacher's Class Context (Auto-detect class)
  const { data: userData } = useGetMeQuery(undefined);
  const { data: classData } = useGetClassesQuery();
  
  const myClassId = useMemo(() => {
    if (!userData || !classData) return undefined;
    const myClass = classData.data.find((c: any) => 
      c.teacher_id?._id === userData.data._id || c.teacher_id === userData.data._id
    );
    return myClass?._id;
  }, [userData, classData]);

  // 3. Fetch Analytics Data (Real Time)
  const { data: analyticsResponse, isLoading, isFetching } = useGetAttendanceAnalyticsQuery(
    {
      class_id: myClassId || '', // Pass class ID to filter data
      timeRange,
      startDate: timeRange === 'specific' ? customDate.toISOString() : undefined,
      endDate: timeRange === 'specific' ? customDate.toISOString() : undefined
    },
    { skip: !myClassId } // Don't fetch until we know the class
  );

  // 4. Safe Data Access (Fallback to empty defaults while loading)
  const chartData = analyticsResponse?.data?.chartData || [];
  const metrics = analyticsResponse?.data?.metrics || { 
    avgAttendance: 0, 
    totalLate: 0, 
    totalAbsent: 0, 
    totalPresent: 0 
  };
  const students = analyticsResponse?.data?.students || [];

  // Helper for display label
  const getPeriodLabel = () => {
    if (timeRange === 'today') return 'Today';
    if (timeRange === 'specific') return customDate.format('MMM D, YYYY');
    return `Last ${timeRange === 'week' ? '7 days' : timeRange === 'month' ? '30 days' : timeRange.replace('months', ' months')}`;
  };

  // 5. Render
  if (!myClassId && !isLoading) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error">No Class Assigned</Typography>
        <Typography color="text.secondary">Analytics are available once you are assigned to a class.</Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto', minHeight: '100vh', bgcolor: COLORS.presentLight }}>
        
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ background: `linear-gradient(135deg, ${COLORS.present} 0%, #00897B 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Attendance Insights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and analyze student attendance patterns
          </Typography>
        </Box>

        {/* Filters */}
        <FilterToolbar 
          timeRange={timeRange} 
          onRangeChange={(e) => setTimeRange(e.target.value as TimeRange)} 
          customDate={customDate} 
          onDateChange={(d) => d && setCustomDate(d)} 
          periodLabel={getPeriodLabel()} 
        />

        {/* Content */}
        {(isLoading || isFetching) ? (
          <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ color: COLORS.present }} />
          </Box>
        ) : (
          <>
            {/* Top Cards */}
            <MetricCards 
              metrics={metrics} 
              periodLabel={getPeriodLabel().toLowerCase()} 
            />

            {/* Main Chart */}
            <AttendanceChart data={chartData} />

            {/* Breakdown List */}
            <StudentBreakdown students={students} />
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
}