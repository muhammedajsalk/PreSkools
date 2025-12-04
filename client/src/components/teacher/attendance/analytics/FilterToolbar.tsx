'use client';
import React from 'react';
import { Card, Stack, Box, Typography, FormControl, InputLabel, Select, MenuItem, Chip, SelectChangeEvent } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { TimeRange } from './AnalyticsConfig';

interface Props { timeRange: TimeRange; onRangeChange: (e: SelectChangeEvent) => void; customDate: Dayjs; onDateChange: (d: Dayjs | null) => void; periodLabel: string; }

export default function FilterToolbar({ timeRange, onRangeChange, customDate, onDateChange, periodLabel }: Props) {
  const options = [
    { value: 'today', label: 'Today' }, { value: 'specific', label: 'Specific Date' },
    { value: 'week', label: 'Last 7 Days' }, { value: 'month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' }, { value: '6months', label: 'Last 6 Months' }, { value: 'year', label: 'Last 1 Year' }
  ];

  return (
    <Card elevation={0} sx={{ mb: 3, p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><CalendarMonthIcon color="primary" /><Typography variant="subtitle2" fontWeight={600} color="text.secondary">Filter by:</Typography></Box>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Time Frame</InputLabel>
          <Select value={timeRange} label="Time Frame" onChange={onRangeChange} sx={{ borderRadius: 2 }}>
            {options.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
          </Select>
        </FormControl>
        {timeRange === 'specific' && <DatePicker label="Select Date" value={customDate} onChange={onDateChange} slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }} />}
        <Chip label={`Showing: ${periodLabel}`} variant="outlined" color="primary" size="small" sx={{ fontWeight: 500, ml: { sm: 'auto' } }} />
      </Stack>
    </Card>
  );
}