import { alpha } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { 
  Restaurant, Hotel, CameraAlt, Healing, Notes, LocalDrink, AllInclusive 
} from '@mui/icons-material';
import React from 'react';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryDark: '#00897B',
  meal: '#FF9800', mealLight: '#FFF3E0',
  nap: '#7E57C2', napLight: '#EDE7F6',
  photo: '#26A69A', photoLight: '#E0F2F1',
  health: '#EF5350', healthLight: '#FFEBEE',
  note: '#5C6BC0', noteLight: '#E8EAF6',
  drink: '#29B6F6', drinkLight: '#E1F5FE',
  divider: '#E2E8F0', cardBg: '#FFFFFF'
};

// --- TYPES ---
export type ActivityType = 'MEAL' | 'NAP' | 'PHOTO' | 'HEALTH' | 'NOTE' | 'DRINK';
export type FilterType = 'all' | 'meals' | 'naps' | 'photos' | 'hygiene' | 'learning' | 'notes';

export interface ActivityLog {
  id: string; studentId: string; studentName: string; type: ActivityType;
  time: string; description: string; details?: string; imageUrl?: string;
  loggedBy: string; createdAt: Dayjs;
}

export const ACTIVITY_CONFIG: Record<ActivityType, { icon: any; color: string; bgColor: string; label: string }> = {
  MEAL: { icon: Restaurant, color: COLORS.meal, bgColor: COLORS.mealLight, label: 'Meal' },
  NAP: { icon: Hotel, color: COLORS.nap, bgColor: COLORS.napLight, label: 'Nap' },
  PHOTO: { icon: CameraAlt, color: COLORS.photo, bgColor: COLORS.photoLight, label: 'Photo' },
  HEALTH: { icon: Healing, color: COLORS.health, bgColor: COLORS.healthLight, label: 'Health' },
  NOTE: { icon: Notes, color: COLORS.note, bgColor: COLORS.noteLight, label: 'Note' },
  DRINK: { icon: LocalDrink, color: COLORS.drink, bgColor: COLORS.drinkLight, label: 'Drink' },
};

// --- MOCK DATA ---
export const MOCK_STUDENTS = [
  { id: 'all', name: 'All Students', avatar: '', initials: 'ALL', color: COLORS.primary },
  { id: 's1', name: 'Emma Thompson', avatar: '', initials: 'ET', color: '#F48FB1' },
  { id: 's2', name: 'Liam Johnson', avatar: '', initials: 'LJ', color: '#90CAF9' },
];

export const generateMockHistory = (date: Dayjs): ActivityLog[] => [
  { id: '1', studentId: 's1', studentName: 'Emma Thompson', type: 'MEAL', time: '08:30 AM', description: 'Breakfast', details: 'Ate all oatmeal', loggedBy: 'Ms. Sarah', createdAt: date },
  { id: '2', studentId: 's2', studentName: 'Liam Johnson', type: 'PHOTO', time: '09:15 AM', description: 'Art time', imageUrl: 'https://source.unsplash.com/random/400x300', loggedBy: 'Ms. Sarah', createdAt: date },
];