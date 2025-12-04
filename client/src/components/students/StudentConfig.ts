import { alpha } from '@mui/material/styles';

// ============== THEME ==============
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', successLight: '#C6F6D5',
  warning: '#ECC94B', warningLight: '#FAF089',
  error: '#F56565', errorLight: '#FED7D7',
  info: '#4299E1', infoLight: '#BEE3F8',
  male: '#4299E1', female: '#ED64A6',
  divider: '#E2E8F0',
};

// ============== TYPES ==============
export interface Student {
  id: string; 
  name: string; 
  rollNo: string; 
  admissionNo: string; 
  avatar: string;
  gender: 'male' | 'female' | 'Male' | 'Female'; // Handle both cases
  dateOfBirth: string;
  classId: string; 
  className: string; 
  section: string;
  parentName: string; 
  parentPhone: string; 
  parentEmail: string; 
  address: string;
  // Allow string to handle API responses, but logically it's one of these
  status: 'ACTIVE' | 'ALUMNI' | 'DROPPED' | 'active' | 'alumni' | 'dropped' | string; 
  admissionDate: string; 
  bloodGroup: string;
}

export interface ClassOption { id: string; name: string; section: string; displayName: string; }

// Matches Backend Enums + 'all' for the UI filter
export type StatusType = 'all' | 'ACTIVE' | 'ALUMNI' | 'DROPPED';

// ============== MOCK DATA ==============
export const CLASS_OPTIONS: ClassOption[] = [
  { id: 'c1', name: 'LKG', section: 'A', displayName: 'LKG-A' },
  { id: 'c2', name: 'LKG', section: 'B', displayName: 'LKG-B' },
  { id: 'c3', name: 'UKG', section: 'A', displayName: 'UKG-A' },
  { id: 'c4', name: 'UKG', section: 'B', displayName: 'UKG-B' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Aarav Sharma', rollNo: '01', admissionNo: 'KC2024001', avatar: '', gender: 'Male', dateOfBirth: '2019-03-15', classId: 'c1', className: 'LKG', section: 'A', parentName: 'Rahul Sharma', parentPhone: '+91 98765 43210', parentEmail: 'rahul@email.com', address: 'Delhi', status: 'ACTIVE', admissionDate: '2024-04-01', bloodGroup: 'O+' },
  { id: 's2', name: 'Ananya Patel', rollNo: '02', admissionNo: 'KC2024002', avatar: '', gender: 'Female', dateOfBirth: '2019-05-22', classId: 'c1', className: 'LKG', section: 'A', parentName: 'Vikram Patel', parentPhone: '+91 98765 43211', parentEmail: 'vikram@email.com', address: 'Noida', status: 'ACTIVE', admissionDate: '2024-04-01', bloodGroup: 'A+' },
];

// ============== HELPERS ==============
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

export const getAvatarColor = (name: string) => {
  const colors = [COLORS.primary, COLORS.secondary, '#9C27B0', '#3F51B5', '#009688'];
  return colors[name.charCodeAt(0) % colors.length];
};

// Robust Status Config (Handles Case Sensitivity)
export const getStatusConfig = (status: string) => {
  const normalizedStatus = (status || '').toUpperCase(); // Backend sends Uppercase

  if (normalizedStatus === 'ACTIVE') {
    return { label: 'Active', color: COLORS.success, bgColor: COLORS.successLight };
  }
  
  if (normalizedStatus === 'ALUMNI') {
    return { label: 'Alumni', color: COLORS.info, bgColor: COLORS.infoLight };
  }

  // Default / DROPPED
  return { label: 'Dropped', color: COLORS.error, bgColor: COLORS.errorLight };
};

// Safe Phone Formatter
export const formatPhone = (phone?: string) => {
  if (!phone) return '';
  return phone.replace(/\s+/g, '').replace(/^\+/, '');
};