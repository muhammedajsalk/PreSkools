import { alpha } from '@mui/material/styles';
import React from 'react';
import { 
  Palette, 
  MusicNote, 
  SportsBasketball, 
  Restaurant, 
  Hotel, 
  Schedule, 
  PhotoCamera, 
  Brush, 
  PlayCircleOutline, 
  LocalDining, 
  Bedtime, 
  AutoStories, 
  CheckCircle, 
  LocationOn, 
  EmojiEvents, 
  Vaccines, 
  DirectionsRun, 
  Star 
} from '@mui/icons-material';

// ============================================================================
// 1. THEME & COLORS
// ============================================================================
export const COLORS = {
  primary: '#4DB6AC', 
  primaryLight: '#80CBC4', 
  primaryDark: '#00897B',
  secondary: '#FF9800', 
  secondaryLight: '#FFB74D', 
  secondaryDark: '#F57C00',
  background: '#F0F4F8', 
  cardBg: '#FFFFFF',
  textPrimary: '#2D3748', 
  textSecondary: '#718096',
  success: '#48BB78', 
  successLight: '#C6F6D5',
  warning: '#ECC94B', 
  error: '#F56565', 
  errorLight: '#FED7D7',
  info: '#4299E1', 
  infoLight: '#BEE3F8',
  purple: '#9F7AEA', 
  purpleLight: '#E9D8FD',
  pink: '#ED64A6', 
  pinkLight: '#FED7E2',
  divider: '#E2E8F0',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #4DB6AC 0%, #00897B 100%)',
  gradientSecondary: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
  gradientPurple: 'linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)',
  gradientPink: 'linear-gradient(135deg, #ED64A6 0%, #D53F8C 100%)',
  gradientBlue: 'linear-gradient(135deg, #4299E1 0%, #3182CE 100%)',
  gradientSunrise: 'linear-gradient(135deg, #F6AD55 0%, #ED8936 50%, #DD6B20 100%)',
  gradientSunset: 'linear-gradient(135deg, #FC8181 0%, #F56565 50%, #E53E3E 100%)',
};

// ============================================================================
// 2. TYPES DEFINITIONS
// ============================================================================
export interface Child { 
  id: string; 
  name: string; 
  nickname: string; 
  avatar: string; 
  className: string; 
  section: string; 
  age: string; 
  teacherName: string; 
  rollNo: string; 
}

export interface HighlightStory { 
  id: string; 
  type: 'art' | 'music' | 'play' | 'food' | 'nap' | 'learn' | 'photo' | 'video'; 
  label: string; 
  thumbnail: string; 
  isNew: boolean; 
  count?: number; 
}

export interface ActivityFeedItem { 
  id: string; 
  type: 'photo' | 'meal' | 'nap' | 'note' | 'checkin' | 'checkout' | 'activity' | 'milestone' | 'health'; 
  title: string; 
  description?: string; 
  time: string; 
  teacherName: string; 
  teacherAvatar: string; 
  imageUrl?: string; 
  images?: string[];
  mealInfo?: { item: string; quantity: string; notes?: string; mealType: string; };
  napInfo?: { duration: string; startTime: string; endTime: string; quality: string; };
  healthInfo?: { temperature?: string; mood: string; notes?: string; };
  milestoneInfo?: { achievement: string; badge: string; };
  likes: number; 
  isLiked: boolean; 
  comments: number;
}

export interface TodayOverview { 
  checkInTime: string; 
  currentActivity: string; 
  nextActivity: string; 
  nextActivityTime: string; 
  mood: string; 
  temperature?: string;
  attendanceStatus: 'present' | 'absent'; 
}

export interface QuickStat {
  id: string; 
  label: string; 
  value: string; 
  icon: React.ReactNode; 
  color: string; 
  bgColor: string;
}

export interface SidebarMenuItem {
  id: string; 
  label: string; 
  icon: React.ReactNode; 
  badge?: number; 
  path: string;
}

// ============================================================================
// 3. MOCK DATA
// ============================================================================
export const MOCK_CHILDREN: Child[] = [
  { id: 'c1', name: 'Rohan Sharma', nickname: 'Rohan', avatar: '', className: 'LKG', section: 'A', age: '4 years', teacherName: 'Ms. Sarah', rollNo: '15' },
  { id: 'c2', name: 'Ananya Sharma', nickname: 'Anaya', avatar: '', className: 'Nursery', section: 'B', age: '3 years', teacherName: 'Ms. Priya', rollNo: '08' },
];

export const MOCK_HIGHLIGHTS: HighlightStory[] = [
  { id: 'h1', type: 'photo', label: 'Photos', thumbnail: '', isNew: true, count: 12 },
  { id: 'h2', type: 'art', label: 'Art', thumbnail: '', isNew: true, count: 3 },
  { id: 'h3', type: 'music', label: 'Music', thumbnail: '', isNew: false, count: 2 },
  { id: 'h4', type: 'play', label: 'Play', thumbnail: '', isNew: false, count: 5 },
  { id: 'h5', type: 'food', label: 'Meals', thumbnail: '', isNew: true, count: 4 },
  { id: 'h6', type: 'nap', label: 'Nap', thumbnail: '', isNew: false, count: 1 },
];

export const MOCK_TODAY_OVERVIEW: TodayOverview = { 
  checkInTime: '8:45 AM', 
  currentActivity: 'Art & Craft', 
  nextActivity: 'Lunch Time', 
  nextActivityTime: '12:00 PM', 
  mood: 'happy', 
  temperature: '98.4°F',
  attendanceStatus: 'present'
};

export const MOCK_QUICK_STATS: QuickStat[] = [
  { id: 'qs1', label: 'Photos Today', value: '8', icon: <PhotoCamera />, color: COLORS.pink, bgColor: COLORS.pinkLight },
  { id: 'qs2', label: 'Activities', value: '4/6', icon: <DirectionsRun />, color: COLORS.success, bgColor: COLORS.successLight },
  { id: 'qs3', label: 'Meals', value: '2/3', icon: <LocalDining />, color: COLORS.secondary, bgColor: COLORS.secondaryLight },
  // Fixed: Now includes color and bgColor
  { id: 'qs4', label: 'Nap Time', value: '1h 30m', icon: <Bedtime />, color: COLORS.info, bgColor: COLORS.infoLight },
];

export const MOCK_ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: 'a0', type: 'checkin', title: 'Checked In', description: 'Rohan arrived at school.', time: '8:45 AM', teacherName: 'Ms. Sarah', teacherAvatar: '', likes: 0, isLiked: false, comments: 0 },
  { id: 'a1', type: 'photo', title: 'Art Class!', description: 'Painting butterflies', time: '11:30 AM', teacherName: 'Ms. Sarah', teacherAvatar: '', images: ['/art1.jpg'], likes: 24, isLiked: false, comments: 5 },
  { id: 'a3', type: 'meal', title: 'Lunch Time', description: 'Enjoyed lunch', time: '12:45 PM', teacherName: 'Ms. Sarah', teacherAvatar: '', mealInfo: { item: 'Dal Rice', quantity: 'all', notes: 'Asked for seconds', mealType: 'lunch' }, likes: 12, isLiked: true, comments: 2 },
];

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================
export const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export const getHighlightConfig = (type: string) => {
  const configs: Record<string, any> = {
    photo: { color: COLORS.pink, gradient: COLORS.gradientPink, icon: <PhotoCamera /> },
    art: { color: COLORS.purple, gradient: COLORS.gradientPurple, icon: <Brush /> },
    music: { color: COLORS.secondary, gradient: COLORS.gradientSecondary, icon: <MusicNote /> },
    play: { color: COLORS.success, gradient: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)', icon: <SportsBasketball /> },
    food: { color: COLORS.secondary, gradient: COLORS.gradientSunrise, icon: <Restaurant /> },
    nap: { color: COLORS.info, gradient: COLORS.gradientBlue, icon: <Bedtime /> },
    learn: { color: COLORS.primary, gradient: COLORS.gradientPrimary, icon: <AutoStories /> },
    video: { color: COLORS.error, gradient: COLORS.gradientSunset, icon: <PlayCircleOutline /> },
  };
  return configs[type] || configs.photo;
};

export const getActivityTypeConfig = (type: string) => {
  const configs: Record<string, any> = {
    photo: { color: COLORS.pink, bgColor: COLORS.pinkLight, icon: <PhotoCamera />, label: 'Photos' },
    meal: { color: COLORS.secondary, bgColor: alpha(COLORS.secondary, 0.15), icon: <Restaurant />, label: 'Meal' },
    nap: { color: COLORS.info, bgColor: COLORS.infoLight, icon: <Hotel />, label: 'Nap' },
    note: { color: COLORS.purple, bgColor: COLORS.purpleLight, icon: <AutoStories />, label: 'Note' },
    checkin: { color: COLORS.success, bgColor: COLORS.successLight, icon: <CheckCircle />, label: 'Check In' },
    checkout: { color: COLORS.textSecondary, bgColor: COLORS.divider, icon: <LocationOn />, label: 'Check Out' },
    activity: { color: COLORS.primary, bgColor: alpha(COLORS.primary, 0.15), icon: <DirectionsRun />, label: 'Activity' },
    milestone: { color: COLORS.secondary, bgColor: alpha(COLORS.secondary, 0.15), icon: <Star />, label: 'Achievement' },
    health: { color: COLORS.error, bgColor: COLORS.errorLight, icon: <Vaccines />, label: 'Health' },
  };
  return configs[type] || configs.activity;
};