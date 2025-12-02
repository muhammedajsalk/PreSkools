import { alpha } from '@mui/material/styles';
import React from 'react';
import { Face, AdminPanelSettings, Campaign, Event, SportsBasketball, Cake, MusicNote, School, LocalHospital, CalendarMonth, Notifications, Payments } from '@mui/icons-material';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F0F4F8', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', successLight: '#C6F6D5',
  warning: '#ECC94B', warningLight: '#FAF089',
  error: '#F56565', errorLight: '#FED7D7',
  info: '#4299E1', infoLight: '#BEE3F8',
  purple: '#9F7AEA', purpleLight: '#E9D8FD',
  pink: '#ED64A6', pinkLight: '#FED7E2',
  divider: '#E2E8F0', online: '#48BB78',
  // Tabs
  teachers: '#4DB6AC', teachersBg: '#B2F5EA',
  admin: '#9F7AEA', adminBg: '#E9D8FD',
  classNotices: '#FF9800', classNoticesBg: '#FEEBC8',
  schoolEvents: '#ED64A6', schoolEventsBg: '#FED7E2',
};

// --- TYPES ---
export type TabType = 'teachers' | 'admin' | 'class' | 'school';
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type NoticePriority = 'urgent' | 'info' | 'normal';

export interface ChatMessage {
  id: string; participantName: string; participantRole: string; isOnline: boolean;
  lastMessage: string; lastMessageTime: string; unreadCount: number;
  isTyping?: boolean; lastMessageStatus?: MessageStatus; lastMessageIsMe?: boolean;
}

export interface ClassNotice {
  id: string; title: string; message: string; senderName: string; date: string;
  priority: NoticePriority; category: string; hasAttachment?: boolean; isRead: boolean;
}

export interface SchoolEvent {
  id: string; title: string; description: string; date: string; time: string; location?: string;
  eventType: string; isUpcoming: boolean; daysUntil?: number; isRead: boolean;
}

export interface TabConfig {
  id: TabType; label: string; icon: React.ReactNode; color: string; bgColor: string; unreadCount: number;
}

// --- MOCK DATA ---
export const MOCK_TEACHER_CHATS: ChatMessage[] = [
  { id: 't1', participantName: 'Ms. Sarah', participantRole: 'Class Teacher', isOnline: true, lastMessage: 'Rohan did great!', lastMessageTime: '10:30 AM', unreadCount: 2, lastMessageStatus: 'delivered', lastMessageIsMe: false },
  { id: 't2', participantName: 'Ms. Priya', participantRole: 'Music', isOnline: false, lastMessage: 'Thanks!', lastMessageTime: 'Yesterday', unreadCount: 0, lastMessageStatus: 'read', lastMessageIsMe: true },
];

export const MOCK_ADMIN_CHATS: ChatMessage[] = [
  { id: 'a1', participantName: 'Reception', participantRole: 'Office', isOnline: true, lastMessage: 'ID Card ready', lastMessageTime: '9:00 AM', unreadCount: 1, lastMessageStatus: 'delivered', lastMessageIsMe: false },
];

export const MOCK_CLASS_NOTICES: ClassNotice[] = [
  { id: 'cn1', title: 'Zoo Trip', message: 'Permission slip needed.', senderName: 'Ms. Sarah', date: 'Nov 20', priority: 'urgent', category: 'activity', hasAttachment: true, isRead: false },
  { id: 'cn2', title: 'Weekly Update', message: 'We learned ABCs.', senderName: 'Ms. Sarah', date: 'Nov 18', priority: 'info', category: 'general', isRead: true },
];

export const MOCK_SCHOOL_EVENTS: SchoolEvent[] = [
  { id: 'se1', title: 'Annual Day', description: 'Join us!', date: 'Dec 15', time: '5 PM', location: 'Auditorium', eventType: 'celebration', isUpcoming: true, daysUntil: 25, isRead: false },
];

// --- HELPERS ---
export const getInitials = (n: string) => n.split(' ').map(c => c[0]).join('').slice(0, 2);
export const getAvatarColor = (n: string, t: 'teacher' | 'admin') => {
  const tc = [COLORS.primary, '#00897B']; const ac = [COLORS.purple, '#6B46C1'];
  return (t === 'teacher' ? tc : ac)[n.charCodeAt(0) % 2];
};

export const getCategoryConfig = (cat: string) => {
  const c: any = { general: { icon: <Campaign />, color: COLORS.secondary }, activity: { icon: <SportsBasketball />, color: COLORS.success }, fee: { icon: <Payments />, color: COLORS.purple } };
  return c[cat] || c.general;
};

export const getEventTypeConfig = (type: string) => {
  const c: any = { celebration: { icon: <Cake />, color: COLORS.pink }, sports: { icon: <SportsBasketball />, color: COLORS.success }, academic: { icon: <School />, color: COLORS.info } };
  return c[type] || c.celebration;
};