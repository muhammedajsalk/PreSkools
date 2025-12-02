import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SmsIcon from '@mui/icons-material/Sms';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CakeIcon from '@mui/icons-material/Cake';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// --- THEME ---
export const brandColors = {
  primary: { main: '#4DB6AC', light: '#80CBC4', dark: '#00897B', gradient: 'linear-gradient(135deg, #4DB6AC 0%, #26A69A 50%, #00897B 100%)' },
  secondary: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00', gradient: 'linear-gradient(135deg, #FFB74D 0%, #FF9800 50%, #F57C00 100%)' },
  background: { default: '#F5F7FA', paper: '#FFFFFF', dark: '#1A1A2E' },
  stats: {
    green: { main: '#10B981', light: '#D1FAE5', dark: '#059669' },
    orange: { main: '#F59E0B', light: '#FEF3C7', dark: '#D97706' },
    blue: { main: '#3B82F6', light: '#DBEAFE', dark: '#2563EB' },
    purple: { main: '#8B5CF6', light: '#EDE9FE', dark: '#7C3AED' },
    pink: { main: '#EC4899', light: '#FCE7F3', dark: '#DB2777' },
    teal: { main: '#14B8A6', light: '#CCFBF1', dark: '#0D9488' },
  },
};

// --- TYPES ---
export interface DailyStat { id: string; title: string; value: string; subtitle: string; icon: React.ReactNode; color: string; bgColor: string; trend?: { direction: 'up' | 'down'; value: string } }
export interface ClassroomActivity { id: string; classroom: string; activity: string; type: 'lunch' | 'photo' | 'attendance' | 'activity' | 'milestone'; timestamp: string; teacher: string }
export interface FeeData { category: string; collected: number; pending: number; total: number; color: string }
export interface QuickAction { id: string; label: string; icon: React.ReactNode; color: string; bgColor: string; badge?: number }
export interface UpcomingEvent { id: string; title: string; date: string; type: 'birthday' | 'event' | 'holiday'; icon: React.ReactNode }

// --- MOCK DATA ---
export const MOCK_DATA = {
  principal: { name: 'Principal Sharma', schoolName: 'Little Stars Academy', avatar: 'PS' },
  dailyStats: [
    { id: '1', title: 'Attendance', value: '85/92', subtitle: 'Students Present', icon: <CheckCircleIcon />, color: brandColors.stats.green.main, bgColor: brandColors.stats.green.light, trend: { direction: 'up', value: '+3%' } },
    { id: '2', title: 'Pending Fees', value: '₹12,500', subtitle: 'Due This Month', icon: <AccountBalanceWalletIcon />, color: brandColors.stats.orange.main, bgColor: brandColors.stats.orange.light, trend: { direction: 'down', value: '-8%' } },
    { id: '3', title: 'SMS Balance', value: '450', subtitle: 'Credits Left', icon: <SmsIcon />, color: brandColors.stats.blue.main, bgColor: brandColors.stats.blue.light },
    { id: '4', title: 'Active Staff', value: '8/10', subtitle: 'Teachers Present', icon: <PeopleIcon />, color: brandColors.stats.purple.main, bgColor: brandColors.stats.purple.light },
  ] as DailyStat[],
  classroomActivities: [
    { id: '1', classroom: 'LKG-A', activity: 'Lunch Logged', type: 'lunch', timestamp: '12:45 PM', teacher: 'Ms. Priya' },
    { id: '2', classroom: 'UKG-B', activity: 'Photo Uploaded', type: 'photo', timestamp: '12:30 PM', teacher: 'Mr. Raj' },
    { id: '3', classroom: 'Nursery', activity: 'Attendance Marked', type: 'attendance', timestamp: '9:30 AM', teacher: 'Ms. Kavita' },
    { id: '4', classroom: 'LKG-B', activity: 'Art Activity Completed', type: 'activity', timestamp: '11:15 AM', teacher: 'Ms. Anita' },
    { id: '5', classroom: 'UKG-A', activity: 'Milestone: Aarav wrote name!', type: 'milestone', timestamp: '10:45 AM', teacher: 'Ms. Neha' },
  ] as ClassroomActivity[],
  feeData: [
    { category: 'Tuition Fee', collected: 125000, pending: 18500, total: 143500, color: brandColors.stats.green.main },
    { category: 'Transport Fee', collected: 28000, pending: 4500, total: 32500, color: brandColors.stats.blue.main },
    { category: 'Activity Fee', collected: 15000, pending: 3200, total: 18200, color: brandColors.stats.purple.main },
    { category: 'Books & Uniform', collected: 42000, pending: 6800, total: 48800, color: brandColors.stats.orange.main },
  ] as FeeData[],
  quickActions: [
    { id: '1', label: 'Record Fee', icon: <ReceiptLongIcon />, color: brandColors.stats.green.main, bgColor: brandColors.stats.green.light, badge: 5 },
    { id: '2', label: 'Send Notice', icon: <CampaignIcon />, color: brandColors.stats.orange.main, bgColor: brandColors.stats.orange.light },
    { id: '3', label: 'Add Student', icon: <PersonAddIcon />, color: brandColors.stats.blue.main, bgColor: brandColors.stats.blue.light },
    { id: '4', label: 'View Gallery', icon: <CollectionsIcon />, color: brandColors.stats.purple.main, bgColor: brandColors.stats.purple.light, badge: 12 },
    { id: '5', label: 'Take Attendance', icon: <AssignmentTurnedInIcon />, color: brandColors.stats.teal.main, bgColor: brandColors.stats.teal.light },
    { id: '6', label: 'Manage Staff', icon: <GroupAddIcon />, color: brandColors.stats.pink.main, bgColor: brandColors.stats.pink.light },
  ] as QuickAction[],
  upcomingEvents: [
    { id: '1', title: "Aarav's Birthday", date: 'Tomorrow', type: 'birthday', icon: <CakeIcon /> },
    { id: '2', title: 'Annual Day', date: 'Jan 25', type: 'event', icon: <MusicNoteIcon /> },
    { id: '3', title: 'Republic Day', date: 'Jan 26', type: 'holiday', icon: <EventNoteIcon /> },
  ] as UpcomingEvent[],
  speedDialActions: [
    { icon: <PersonAddIcon />, name: 'Add Student', color: brandColors.stats.blue.main },
    { icon: <GroupAddIcon />, name: 'Add Teacher', color: brandColors.stats.purple.main },
    { icon: <CampaignIcon />, name: 'Send Notice', color: brandColors.stats.orange.main },
    { icon: <PhotoCameraIcon />, name: 'Upload Photo', color: brandColors.stats.green.main },
  ],
};