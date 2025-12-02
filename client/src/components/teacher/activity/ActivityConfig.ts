import React from 'react';
import { alpha } from '@mui/material/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import WashIcon from '@mui/icons-material/Wash';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  divider: '#E2E8F0', error: '#F56565',
  // Activity Colors
  meal: '#F56565', mealBg: '#FED7D7',
  nap: '#667EEA', napBg: '#E9D8FD',
  hygiene: '#4299E1', hygieneBg: '#BEE3F8',
  learning: '#48BB78', learningBg: '#C6F6D5',
  photo: '#ED64A6', photoBg: '#FED7E2',
};

// --- TYPES ---
export type ActivityType = 'meal' | 'nap' | 'hygiene' | 'learning' | 'photo';
export type MealQuantity = 'all' | 'half' | 'none' | 'extra';

export interface Student { id: string; name: string; rollNo: string; avatar: string; gender: 'male' | 'female'; }
export interface ActivityConfig { id: ActivityType; label: string; icon: React.ReactNode; color: string; bgColor: string; description: string; }

export interface MealFormData { foodItem: string; quantity: MealQuantity; notes: string; }
export interface NapFormData { startTime: string; duration: number; quality: 'good' | 'restless' | 'refused'; }
export interface HygieneFormData { type: 'diaper' | 'potty' | 'handwash' | 'bath'; notes: string; }
export interface LearningFormData { activity: string; participation: 'active' | 'moderate' | 'passive'; notes: string; }
export interface PhotoFormData { caption: string; photos: string[]; }

export type FormData = MealFormData | NapFormData | HygieneFormData | LearningFormData | PhotoFormData;

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

export const ACTIVITY_CONFIGS: ActivityConfig[] = [
  { id: 'meal', label: 'Meal', icon: React.createElement(RestaurantIcon), color: COLORS.meal, bgColor: COLORS.mealBg, description: 'Log food intake' },
  { id: 'nap', label: 'Nap', icon: React.createElement(HotelIcon), color: COLORS.nap, bgColor: COLORS.napBg, description: 'Log sleep time' },
  { id: 'hygiene', label: 'Hygiene', icon: React.createElement(WashIcon), color: COLORS.hygiene, bgColor: COLORS.hygieneBg, description: 'Log hygiene activity' },
  { id: 'learning', label: 'Learning', icon: React.createElement(MenuBookIcon), color: COLORS.learning, bgColor: COLORS.learningBg, description: 'Log learning activity' },
  { id: 'photo', label: 'Photo', icon: React.createElement(PhotoCameraIcon), color: COLORS.photo, bgColor: COLORS.photoBg, description: 'Share photos' },
];

export const CLASS_INFO = { name: 'LKG', section: 'A' };

// --- HELPERS ---
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string, gender: 'male' | 'female') => {
  const maleColors = ['#4299E1', '#3182CE', '#2B6CB0'];
  const femaleColors = ['#ED64A6', '#D53F8C', '#B83280'];
  const c = gender === 'male' ? maleColors : femaleColors;
  return c[name.charCodeAt(0) % c.length];
};
export const formatDuration = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)}h ${m % 60}m`);
export const getCurrentTime = () => new Date().toTimeString().slice(0, 5);