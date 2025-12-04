import { alpha } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

// --- THEME ---
export const COLORS = {
  present: '#4DB6AC', late: '#FF9800', absent: '#F56565',
  presentLight: '#E0F2F1', lateLight: '#FFF3E0', absentLight: '#FFEBEE',
};

// --- TYPES ---
export type TimeRange = 'today' | 'specific' | 'week' | 'month' | '3months' | '6months' | 'year';

export interface ChartDataPoint { 
  date: string; 
  label: string; 
  present: number; 
  late: number; 
  absent: number; 
  total: number; 
}

export interface StudentAttendance { 
  id: string; 
  name: string; 
  avatar: string; 
  attendanceRate: number; 
  daysPresent: number; 
  daysAbsent: number; 
  daysLate: number; 
  status: 'critical' | 'warning' | 'good'; 
}

// --- MOCK GENERATORS ---
export const generateRandomAttendance = (total: number = 25) => {
  const absent = Math.floor(Math.random() * 4) + 1;
  const late = Math.floor(Math.random() * 3) + 1;
  return { present: total - absent - late, late, absent, total };
};

export const generateMockData = (range: TimeRange, customDate?: Dayjs): ChartDataPoint[] => {
  const baseDate = customDate || dayjs();
  const data: ChartDataPoint[] = [];
  
  if (range === 'week') {
    for (let i = 6; i >= 0; i--) {
        const d = baseDate.subtract(i, 'day');
        if (d.day() !== 0 && d.day() !== 6) data.push({ date: d.format('YYYY-MM-DD'), label: d.format('ddd'), ...generateRandomAttendance() });
    }
  } else {
      // Fallback for other ranges (using simple 7 day default for brevity in config)
      for (let i = 6; i >= 0; i--) {
        const d = baseDate.subtract(i, 'day');
        data.push({ date: d.format('YYYY-MM-DD'), label: d.format('D'), ...generateRandomAttendance() });
    }
  }
  return data;
};

export const generateMockStudents = (range: TimeRange): StudentAttendance[] => {
  return Array(12).fill(0).map((_, i) => {
    // ✅ FIX: Explicitly cast the status string to the specific Type
    const status = (Math.random() > 0.5 ? 'critical' : 'warning') as 'critical' | 'warning' | 'good';

    return {
      id: `s-${i}`, 
      name: `Student ${i}`, 
      avatar: 'S',
      attendanceRate: Math.floor(Math.random() * 35) + 65,
      daysPresent: 20, 
      daysAbsent: 2, 
      daysLate: 1, 
      status: status 
    };
  }).sort((a, b) => a.attendanceRate - b.attendanceRate);
};