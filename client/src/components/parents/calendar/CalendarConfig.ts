import { alpha } from '@mui/material/styles';
import React from 'react';
import { HolidayVillage, Celebration, School, SportsBasketball, MusicNote, LocalHospital, Groups } from '@mui/icons-material';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F0F4F8', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096', divider: '#E2E8F0',
  // Event Colors
  holiday: '#F56565', holidayBg: '#FED7D7',
  celebration: '#48BB78', celebrationBg: '#C6F6D5',
  academic: '#4299E1', academicBg: '#BEE3F8',
  sports: '#ED8936', sportsBg: '#FEEBC8',
  cultural: '#9F7AEA', culturalBg: '#E9D8FD',
  health: '#38B2AC', healthBg: '#B2F5EA',
  meeting: '#ED64A6', meetingBg: '#FED7E2',
};

// --- TYPES ---
export type ViewType = 'month' | 'agenda';
export type EventType = 'holiday' | 'celebration' | 'academic' | 'sports' | 'cultural' | 'health' | 'meeting';

export interface CalendarEvent {
  id: string; title: string; description: string; date: Date; startTime: string; endTime?: string;
  location?: string; type: EventType; isAllDay: boolean; isImportant: boolean; forClass?: string;
}

export const EVENT_TYPE_CONFIGS: Record<EventType, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  holiday: { label: 'Holiday', color: COLORS.holiday, bgColor: COLORS.holidayBg, icon: React.createElement(HolidayVillage) },
  celebration: { label: 'Celebration', color: COLORS.celebration, bgColor: COLORS.celebrationBg, icon: React.createElement(Celebration) },
  academic: { label: 'Academic', color: COLORS.academic, bgColor: COLORS.academicBg, icon: React.createElement(School) },
  sports: { label: 'Sports', color: COLORS.sports, bgColor: COLORS.sportsBg, icon: React.createElement(SportsBasketball) },
  cultural: { label: 'Cultural', color: COLORS.cultural, bgColor: COLORS.culturalBg, icon: React.createElement(MusicNote) },
  health: { label: 'Health', color: COLORS.health, bgColor: COLORS.healthBg, icon: React.createElement(LocalHospital) },
  meeting: { label: 'Meeting', color: COLORS.meeting, bgColor: COLORS.meetingBg, icon: React.createElement(Groups) },
};

// --- MOCK DATA ---
export const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: "Children's Day", description: 'Fun activities!', date: new Date(2024, 10, 14), startTime: '10 AM', endTime: '1 PM', type: 'celebration', isAllDay: false, isImportant: true },
  { id: 'e2', title: 'Diwali', description: 'School Closed', date: new Date(2024, 10, 1), startTime: 'All Day', type: 'holiday', isAllDay: true, isImportant: false },
];

// --- HELPERS ---
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const isSameDay = (d1: Date, d2: Date) => d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
export const isSameMonth = (d1: Date, d2: Date) => d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
export const getEventsForDate = (date: Date, events: CalendarEvent[]) => events.filter((e) => isSameDay(e.date, date));
export const getEventsForMonth = (date: Date, events: CalendarEvent[]) => events.filter((e) => isSameMonth(e.date, date)).sort((a, b) => a.date.getTime() - b.date.getTime());
export const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
export const formatDate = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
export const getDaysUntil = (date: Date) => Math.ceil((new Date(date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
export const getCountdownText = (days: number) => days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : days < 0 ? 'Passed' : `${days} days to go`;