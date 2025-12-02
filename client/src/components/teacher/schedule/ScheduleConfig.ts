import React from 'react';
import { alpha } from '@mui/material/styles';
import { PlayCircle, Restaurant, MenuBook, Hotel, Celebration, DirectionsWalk, ExitToApp, Palette, MusicNote, Wash } from '@mui/icons-material';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  divider: '#E2E8F0',
  academic: '#667EEA', academicBg: '#E9D8FD',
  play: '#48BB78', playBg: '#C6F6D5',
  meal: '#F56565', mealBg: '#FED7D7',
  rest: '#4299E1', restBg: '#BEE3F8',
  event: '#ED8936', eventBg: '#FEEBC8',
  arrival: '#9F7AEA', arrivalBg: '#E9D8FD',
  departure: '#718096', departureBg: '#E2E8F0',
  art: '#ED64A6', artBg: '#FED7E2',
  music: '#F6AD55', musicBg: '#FEEBC8',
  hygiene: '#4FD1C5', hygieneBg: '#B2F5EA',
};

// --- TYPES ---
export type ActivityType = 'academic' | 'play' | 'meal' | 'rest' | 'event' | 'arrival' | 'departure' | 'art' | 'music' | 'hygiene';

export interface ScheduleActivity {
  id: string; title: string; startTime: string; endTime: string;
  type: ActivityType; description?: string; isRecurring?: boolean;
}

export interface ActivityFormData {
  title: string; startTime: string; endTime: string;
  type: ActivityType; description: string;
}

export const ACTIVITY_TYPE_CONFIGS: Record<ActivityType, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  academic: { label: 'Academic', color: COLORS.academic, bgColor: COLORS.academicBg, icon: React.createElement(MenuBook) },
  play: { label: 'Play', color: COLORS.play, bgColor: COLORS.playBg, icon: React.createElement(PlayCircle) },
  meal: { label: 'Meal', color: COLORS.meal, bgColor: COLORS.mealBg, icon: React.createElement(Restaurant) },
  rest: { label: 'Nap', color: COLORS.rest, bgColor: COLORS.restBg, icon: React.createElement(Hotel) },
  event: { label: 'Event', color: COLORS.event, bgColor: COLORS.eventBg, icon: React.createElement(Celebration) },
  arrival: { label: 'Arrival', color: COLORS.arrival, bgColor: COLORS.arrivalBg, icon: React.createElement(DirectionsWalk) },
  departure: { label: 'Depart', color: COLORS.departure, bgColor: COLORS.departureBg, icon: React.createElement(ExitToApp) },
  art: { label: 'Art', color: COLORS.art, bgColor: COLORS.artBg, icon: React.createElement(Palette) },
  music: { label: 'Music', color: COLORS.music, bgColor: COLORS.musicBg, icon: React.createElement(MusicNote) },
  hygiene: { label: 'Hygiene', color: COLORS.hygiene, bgColor: COLORS.hygieneBg, icon: React.createElement(Wash) },
};

// --- MOCK DATA ---
export const MOCK_SCHEDULE: ScheduleActivity[] = [
  { id: 'a1', title: 'Arrival', startTime: '08:00', endTime: '08:30', type: 'arrival', description: 'Free play' },
  { id: 'a2', title: 'Circle Time', startTime: '08:30', endTime: '09:00', type: 'academic', description: 'Calendar' },
  { id: 'a3', title: 'Snack', startTime: '09:00', endTime: '09:30', type: 'meal', description: 'Fruit' },
  { id: 'a4', title: 'Nap', startTime: '13:00', endTime: '14:30', type: 'rest', description: 'Rest' },
];

// --- HELPERS ---
export const formatTime = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

export const calculateDuration = (start: string, end: string) => {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const diff = (eh * 60 + em) - (sh * 60 + sm);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export const isCurrentSlot = (start: string, end: string) => {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return current >= (sh * 60 + sm) && current < (eh * 60 + em);
};

export const isPastSlot = (end: string) => {
  const now = new Date();
  const [eh, em] = end.split(':').map(Number);
  return (now.getHours() * 60 + now.getMinutes()) >= (eh * 60 + em);
};

export const generateId = () => `a${Date.now()}`;