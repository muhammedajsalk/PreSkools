'use client';
import React from 'react';
import { Card, CardContent, Box, Typography, Paper, Stack, alpha } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { COLORS, ChartDataPoint } from './AnalyticsConfig';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <Paper elevation={8} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>📅 {label}</Typography>
      <Stack spacing={1}>
        {payload.map((item: any, i: number) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.fill }} /><Typography variant="body2" color="text.secondary">{item.name}</Typography></Box>
            <Typography variant="body2" fontWeight={600}>{item.value}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default function AttendanceChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 3 }}><Typography variant="h6" fontWeight={700}>📊 Attendance Trends</Typography><Typography variant="body2" color="text.secondary">Daily breakdown of status</Typography></Box>
        <Box sx={{ width: '100%', height: { xs: 300, md: 400 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.08)} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#718096', fontSize: 11 }} tickLine={false} axisLine={{ stroke: alpha('#000', 0.1) }} dy={10} />
              <YAxis tick={{ fill: '#718096', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: alpha(COLORS.present, 0.05) }} />
              <Legend iconType="circle" />
              <Bar dataKey="present" name="Present" stackId="a" fill={COLORS.present} radius={[0, 0, 0, 0]} />
              <Bar dataKey="late" name="Late" stackId="a" fill={COLORS.late} radius={[0, 0, 0, 0]} />
              <Bar dataKey="absent" name="Absent" stackId="a" fill={COLORS.absent} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}