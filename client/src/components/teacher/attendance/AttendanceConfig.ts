import { alpha } from '@mui/material/styles';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // LateIcon

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  divider: '#E2E8F0',
  
  // Status Colors
  present: '#48BB78', presentBg: '#C6F6D5',
  absent: '#F56565', absentBg: '#FED7D7',
  late: '#ED8936', lateBg: '#FEEBC8',
  unmarked: '#A0AEC0', unmarkedBg: '#EDF2F7',
};

// --- TYPES ---
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'unmarked';

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  avatar: string;
  gender: 'male' | 'female';
}

export interface AttendanceState {
  student: Student;
  status: AttendanceStatus;
}

// --- MOCK DATA ---
export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Aarav Sharma', rollNo: '01', avatar: '', gender: 'male' },
  { id: 's2', name: 'Ananya Patel', rollNo: '02', avatar: '', gender: 'female' },
  { id: 's3', name: 'Vihaan Kumar', rollNo: '03', avatar: '', gender: 'male' },
  { id: 's4', name: 'Diya Singh', rollNo: '04', avatar: '', gender: 'female' },
  { id: 's5', name: 'Arjun Reddy', rollNo: '05', avatar: '', gender: 'male' },
  { id: 's6', name: 'Ishita Gupta', rollNo: '06', avatar: '', gender: 'female' },
  { id: 's7', name: 'Reyansh Joshi', rollNo: '07', avatar: '', gender: 'male' },
  { id: 's8', name: 'Saanvi Mehta', rollNo: '08', avatar: '', gender: 'female' },
  { id: 's9', name: 'Kabir Malhotra', rollNo: '09', avatar: '', gender: 'male' },
  { id: 's10', name: 'Myra Kapoor', rollNo: '10', avatar: '', gender: 'female' },
];

export const CLASS_INFO = { name: 'LKG', section: 'A', totalStudents: MOCK_STUDENTS.length };

// --- HELPERS ---
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

export const getAvatarColor = (name: string, gender: 'male' | 'female') => {
  const maleColors = ['#4299E1', '#3182CE', '#2B6CB0', '#667EEA', '#5A67D8'];
  const femaleColors = ['#ED64A6', '#D53F8C', '#B83280', '#9F7AEA', '#805AD5'];
  const c = gender === 'male' ? maleColors : femaleColors;
  return c[name.charCodeAt(0) % c.length];
};

export const getStatusConfig = (status: AttendanceStatus) => {
  switch (status) {
    case 'present': return { label: 'P', fullLabel: 'Present', color: COLORS.present, bgColor: COLORS.presentBg, icon: React.createElement(CheckCircleIcon) };
    case 'absent': return { label: 'A', fullLabel: 'Absent', color: COLORS.absent, bgColor: COLORS.absentBg, icon: React.createElement(CancelIcon) };
    case 'late': return { label: 'L', fullLabel: 'Late', color: COLORS.late, bgColor: COLORS.lateBg, icon: React.createElement(AccessTimeIcon) };
    default: return { label: '-', fullLabel: 'Unmarked', color: COLORS.unmarked, bgColor: COLORS.unmarkedBg, icon: null };
  }
};