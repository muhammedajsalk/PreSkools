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
  id: string; name: string; rollNo: string; admissionNo: string; avatar: string;
  gender: 'male' | 'female'; dateOfBirth: string;
  classId: string; className: string; section: string;
  parentName: string; parentPhone: string; parentEmail: string; address: string;
  status: 'active' | 'alumni' | 'dropped'; admissionDate: string; bloodGroup: string;
}

export interface ClassOption { id: string; name: string; section: string; displayName: string; }
export type StatusType = 'all' | 'active' | 'alumni' | 'dropped';

// ============== MOCK DATA ==============
export const CLASS_OPTIONS: ClassOption[] = [
  { id: 'c1', name: 'LKG', section: 'A', displayName: 'LKG-A' },
  { id: 'c2', name: 'LKG', section: 'B', displayName: 'LKG-B' },
  { id: 'c3', name: 'UKG', section: 'A', displayName: 'UKG-A' },
  { id: 'c4', name: 'UKG', section: 'B', displayName: 'UKG-B' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Aarav Sharma', rollNo: '01', admissionNo: 'KC2024001', avatar: '', gender: 'male', dateOfBirth: '2019-03-15', classId: 'c1', className: 'LKG', section: 'A', parentName: 'Rahul Sharma', parentPhone: '+91 98765 43210', parentEmail: 'rahul@email.com', address: 'Delhi', status: 'active', admissionDate: '2024-04-01', bloodGroup: 'O+' },
  { id: 's2', name: 'Ananya Patel', rollNo: '02', admissionNo: 'KC2024002', avatar: '', gender: 'female', dateOfBirth: '2019-05-22', classId: 'c1', className: 'LKG', section: 'A', parentName: 'Vikram Patel', parentPhone: '+91 98765 43211', parentEmail: 'vikram@email.com', address: 'Noida', status: 'active', admissionDate: '2024-04-01', bloodGroup: 'A+' },
];

// ============== HELPERS ==============
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string) => {
  const colors = [COLORS.primary, COLORS.secondary, '#9C27B0', '#3F51B5', '#009688'];
  return colors[name.charCodeAt(0) % colors.length];
};
export const getStatusConfig = (status: Student['status']) => {
  if (status === 'active') return { label: 'Active', color: COLORS.success, bgColor: COLORS.successLight };
  if (status === 'alumni') return { label: 'Alumni', color: COLORS.info, bgColor: COLORS.infoLight };
  return { label: 'Dropped', color: COLORS.error, bgColor: COLORS.errorLight };
};
export const formatPhone = (phone: string) => phone.replace(/\s+/g, '').replace(/^\+/, '');