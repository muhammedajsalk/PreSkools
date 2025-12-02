import { alpha } from '@mui/material/styles';


export const COLORS = {
  primary: '#4DB6AC', 
  primaryLight: '#80CBC4',
  primaryDark: '#00897B',
  secondary: '#FF9800',
  secondaryLight: '#FFB74D',
  secondaryDark: '#F57C00',
  background: '#F5F7FA',
  cardBg: '#FFFFFF',
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  success: '#48BB78',
  error: '#F56565',
  male: '#4299E1',
  female: '#ED64A6',
};


export interface Teacher { id: string; name: string; avatar: string; email: string; }
export interface Classroom { id: string; name: string; section: string; teacherId: string; capacity: number; academicYear: string; }
export interface Student { id: string; name: string; admissionNo: string; gender: 'male' | 'female'; classId: string; parentName: string; parentPhone: string; avatar: string; status: 'active' | 'dropped'; dateOfBirth: string; admissionDate: string; }

export interface CreateClassFormData { name: string; section: string; teacherId: string; capacity: number; }
export interface AddStudentFormData { name: string; admissionNo: string; gender: 'male' | 'female'; parentName: string; parentPhone: string; dateOfBirth: string; }


export const mockTeachers: Teacher[] = [
  { id: 't1', name: 'Sarah Johnson', avatar: '', email: 'sarah.j@kinderconnect.com' },
  { id: 't2', name: 'Michael Chen', avatar: '', email: 'michael.c@kinderconnect.com' },
  { id: 't3', name: 'Emily Davis', avatar: '', email: 'emily.d@kinderconnect.com' },
];

export const mockClassrooms: Classroom[] = [
  { id: 'c1', name: 'LKG', section: 'A', teacherId: 't1', capacity: 25, academicYear: '2024-25' },
  { id: 'c2', name: 'UKG', section: 'B', teacherId: 't2', capacity: 30, academicYear: '2024-25' },
];

export const mockStudents: Student[] = [
  { id: 's1', name: 'Aarav Sharma', admissionNo: 'KC001', gender: 'male', classId: 'c1', parentName: 'Rahul', parentPhone: '9876543210', avatar: '', status: 'active', dateOfBirth: '2019-03-15', admissionDate: '2024-04-01' },
  { id: 's2', name: 'Ananya Patel', admissionNo: 'KC002', gender: 'female', classId: 'c1', parentName: 'Vikram', parentPhone: '9876543211', avatar: '', status: 'active', dateOfBirth: '2019-05-22', admissionDate: '2024-04-01' },
];


export const getTeacherById = (teacherId: string) => mockTeachers.find(t => t.id === teacherId);
export const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string) => {
  const colors = [COLORS.primary, COLORS.secondary, '#9C27B0', '#3F51B5'];
  return colors[name.charCodeAt(0) % colors.length];
};