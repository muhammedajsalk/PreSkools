import { alpha } from '@mui/material/styles';

// --- THEME ---
export const COLORS = {
  teal: '#4DB6AC', tealDark: '#00897B', tealLight: '#B2DFDB', tealLighter: '#E0F2F1',
  orange: '#FF9800', orangeLight: '#FFE0B2', orangeDark: '#F57C00',
  success: '#4CAF50', successLight: '#C8E6C9',
  error: '#EF5350', errorLight: '#FFEBEE',
};

// --- TYPES ---
export interface Teacher {
  id: string; fullName: string; phone: string; email: string;
  qualification: string; experience: string; joiningDate: Date;
  classAssigned: string | null; avatar?: string; isActive: boolean;
}

export interface NewTeacherForm {
  fullName: string; phone: string; email: string; qualification: string; joiningDate: Date | null;
}

export interface FormErrors {
  fullName?: string; phone?: string; email?: string; qualification?: string; joiningDate?: string;
}

// --- MOCK DATA ---
export const MOCK_TEACHERS: Teacher[] = [
  { id: 't1', fullName: 'Priya Sharma', phone: '9876543210', email: 'priya@school.edu', qualification: 'B.Ed', experience: '5 Years', joiningDate: new Date('2019-06-15'), classAssigned: 'LKG-A', isActive: true },
  { id: 't2', fullName: 'Anjali Verma', phone: '9876543211', email: 'anjali@school.edu', qualification: 'M.Ed', experience: '3 Years', joiningDate: new Date('2021-04-10'), classAssigned: null, isActive: true },
];

// --- HELPERS ---
export const getInitials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
export const getAvatarColor = (n: string) => { const c = [COLORS.teal, '#5C6BC0', '#EC407A']; return c[n.length % c.length]; };
export const formatPhone = (p: string) => ` ${p.slice(0, 5)} ${p.slice(5)}`;