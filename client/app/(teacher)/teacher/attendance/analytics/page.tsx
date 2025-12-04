'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { COLORS, TimeRange, generateMockData, generateMockStudents } from '@/src/components/teacher/attendance/analytics/AnalyticsConfig';
import MetricCards from '@/src/components/teacher/attendance/analytics/MetricCards';
import FilterToolbar from '@/src/components/teacher/attendance/analytics/FilterToolbar';
import AttendanceChart from '@/src/components/teacher/attendance/analytics/AttendanceChart';
import StudentBreakdown from '@/src/components/teacher/attendance/analytics/StudentBreakdown';

export default function AttendanceAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [customDate, setCustomDate] = useState<Dayjs>(dayjs());
  const [chartData, setChartData] = useState(generateMockData('week'));
  const [students, setStudents] = useState(generateMockStudents('week'));

  useEffect(() => {
    setChartData(generateMockData(timeRange, timeRange === 'specific' ? customDate : undefined));
    setStudents(generateMockStudents(timeRange));
  }, [timeRange, customDate]);

  const metrics = useMemo(() => {
    const total = chartData.reduce((a, b) => ({ present: a.present + b.present, late: a.late + b.late, absent: a.absent + b.absent, total: a.total + b.total }), { present: 0, late: 0, absent: 0, total: 0 });
    return { avgAttendance: total.total > 0 ? Math.round(((total.present + total.late) / total.total) * 100) : 0, totalLate: total.late, totalAbsent: total.absent };
  }, [chartData]);

  const getPeriodLabel = () => {
    if (timeRange === 'today') return 'Today';
    if (timeRange === 'specific') return customDate.format('MMM D, YYYY');
    return `Last ${timeRange === 'week' ? '7 days' : timeRange === 'month' ? '30 days' : timeRange.replace('months', ' months')}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto', minHeight: '100vh', bgcolor: COLORS.presentLight }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ background: `linear-gradient(135deg, ${COLORS.present} 0%, #00897B 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Attendance Insights</Typography>
          <Typography variant="body1" color="text.secondary">Track and analyze student attendance patterns</Typography>
        </Box>

        <FilterToolbar timeRange={timeRange} onRangeChange={(e) => setTimeRange(e.target.value as TimeRange)} customDate={customDate} onDateChange={(d) => d && setCustomDate(d)} periodLabel={getPeriodLabel()} />
        <MetricCards metrics={metrics} periodLabel={getPeriodLabel().toLowerCase()} />
        <AttendanceChart data={chartData} />
        <StudentBreakdown students={students.filter(s => s.status !== 'good')} />
      </Box>
    </LocalizationProvider>
  );
}