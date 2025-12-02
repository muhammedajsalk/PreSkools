import { alpha } from '@mui/material/styles';
import React from 'react';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', error: '#F56565', info: '#4299E1', warning: '#ECC94B',
  purple: '#9F7AEA', pink: '#ED64A6', divider: '#E2E8F0',
  napTime: '#667EEA', playTime: '#48BB78', learnTime: '#ED8936', mealTime: '#F56565',
};

// --- TYPES ---
export interface AbsentStudent { id: string; name: string; avatar: string; reason: string; parentNotified: boolean; }
export interface RecentLog { id: string; type: 'meal' | 'nap' | 'activity' | 'photo' | 'attendance' | 'message'; title: string; description: string; time: string; }
export interface ClassStatus { current: 'nap' | 'play' | 'learn' | 'meal' | 'free'; label: string; startTime: string; endTime: string; progress: number; }
export interface TeacherData { id: string; firstName: string; className: string; section: string; totalStudents: number; presentStudents: number; absentStudents: AbsentStudent[]; recentLogs: RecentLog[]; currentStatus: ClassStatus; pendingTasks: number; unreadMessages: number; }

// --- MOCK DATA ---
export const TEACHER_DATA: TeacherData = {
  id: 't1', firstName: 'Sarah', className: 'LKG', section: 'A', totalStudents: 25, presentStudents: 22,
  absentStudents: [
    { id: 's1', name: 'Aarav Sharma', avatar: '', reason: 'Fever', parentNotified: true },
    { id: 's2', name: 'Diya Singh', avatar: '', reason: 'Family', parentNotified: true },
  ],
  recentLogs: [
    { id: 'l1', type: 'meal', title: 'Lunch Logged', description: 'All students finished lunch.', time: '12:45 PM' },
    { id: 'l2', type: 'photo', title: 'Photo Uploaded', description: 'Art session photos shared.', time: '11:30 AM' },
  ],
  currentStatus: { current: 'nap', label: 'Nap Time', startTime: '01:00 PM', endTime: '02:30 PM', progress: 65 },
  pendingTasks: 3, unreadMessages: 5,
};

// --- HELPERS ---
export const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'; };
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string) => { const c = [COLORS.primary, COLORS.secondary, COLORS.purple]; return c[name.charCodeAt(0) % c.length]; };