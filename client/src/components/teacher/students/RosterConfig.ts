import { alpha } from '@mui/material/styles';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', successLight: '#C6F6D5',
  error: '#F56565', errorLight: '#FED7D7',
  info: '#4299E1', infoLight: '#BEE3F8',
  male: '#4299E1', female: '#ED64A6', whatsapp: '#25D366',
  divider: '#E2E8F0',
};

// --- TYPES ---
export type ViewMode = 'grid' | 'list';
export interface Parent { name: string; relation: 'father' | 'mother' | 'guardian'; phone: string; email: string; }
export interface Student { id: string; name: string; rollNo: string; admissionNo: string; avatar: string; gender: 'male' | 'female'; dateOfBirth: string; age: string; bloodGroup: string; parent: Parent; address: string; isPresent: boolean; attendancePercentage: number; }
export interface ClassInfo { name: string; section: string; teacherName: string; totalStudents: number; presentToday: number; }

// --- MOCK DATA ---
export const CLASS_INFO: ClassInfo = { name: 'LKG', section: 'A', teacherName: 'Sarah Johnson', totalStudents: 25, presentToday: 22 };

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Aarav Sharma', rollNo: '01', admissionNo: 'KC2024001', avatar: '', gender: 'male', dateOfBirth: '2019-03-15', age: '5 years', bloodGroup: 'O+', parent: { name: 'Rahul Sharma', relation: 'father', phone: '+919876543210', email: 'rahul@email.com' }, address: 'Delhi', isPresent: true, attendancePercentage: 92 },
  { id: 's2', name: 'Ananya Patel', rollNo: '02', admissionNo: 'KC2024002', avatar: '', gender: 'female', dateOfBirth: '2019-05-22', age: '5 years', bloodGroup: 'A+', parent: { name: 'Priya Patel', relation: 'mother', phone: '+919876543211', email: 'priya@email.com' }, address: 'Noida', isPresent: true, attendancePercentage: 88 },
  // ... more students ...
];

// --- HELPERS ---
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string, gender: 'male' | 'female') => {
  const m = ['#4299E1', '#3182CE', '#2B6CB0']; const f = ['#ED64A6', '#D53F8C', '#B83280'];
  return (gender === 'male' ? m : f)[name.charCodeAt(0) % 3];
};
export const formatPhone = (phone: string) => phone.replace(/\s+/g, '').replace(/^\+/, '');