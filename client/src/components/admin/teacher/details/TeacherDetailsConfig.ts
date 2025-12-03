import { alpha } from '@mui/material/styles';

// --- THEME ---
export const COLORS = {
  teal: '#4DB6AC', tealDark: '#00897B', tealLight: '#B2DFDB', tealLighter: '#E0F2F1',
  orange: '#FF9800', orangeLight: '#FFE0B2', orangeDark: '#F57C00',
  purple: '#9F7AEA', purpleLight: '#E9D8FD',
  blue: '#4299E1', blueLight: '#BEE3F8',
  success: '#4CAF50', successLight: '#C8E6C9',
  error: '#EF5350', errorLight: '#FFEBEE',
};

// --- TYPES ---
export interface Teacher {
  id: string; fullName: string; phone: string; email: string;
  qualification: string; experience: string; joiningDate: Date;
  classAssigned: string | null; avatar?: string; isActive: boolean;
}

export interface TeacherStats {
  attendanceRate: number; totalStudents: number; classesHandled: number;
}

export interface EditTeacherForm {
  fullName: string; phone: string; email: string; qualification: string;
}

export interface FormErrors {
  fullName?: string; phone?: string; email?: string; qualification?: string;
}

// --- MOCK DATA ---
export const MOCK_TEACHER_STATS: Record<string, TeacherStats> = {
  't1': { attendanceRate: 98, totalStudents: 25, classesHandled: 2 },
  't2': { attendanceRate: 92, totalStudents: 0, classesHandled: 0 },
};

// --- HELPERS ---
export const getInitials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
export const getAvatarColor = (n: string) => { const c = [COLORS.teal, COLORS.orange, COLORS.purple]; return c[n.length % c.length]; };
export const formatPhoneDisplay = (p: string) => `+${p.slice(0, 5)} ${p.slice(5)}`;
export const getWhatsAppLink = (p: string) => `https://wa.me/91${p}`;


export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'teacher-001',
    fullName: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya.sharma@kinderconnect.edu',
    qualification: 'B.Ed, M.A. Education',
    experience: '5 Years',
    joiningDate: new Date('2019-06-15'),
    classAssigned: 'LKG-A',
    isActive: true,
  },
  {
    id: 'teacher-002',
    fullName: 'Anjali Verma',
    phone: '9876543211',
    email: 'anjali.verma@kinderconnect.edu',
    qualification: 'B.Ed, B.Sc. Child Development',
    experience: '3 Years',
    joiningDate: new Date('2021-04-10'),
    classAssigned: 'UKG-B',
    isActive: true,
  },
  {
    id: 'teacher-003',
    fullName: 'Sunita Patel',
    phone: '9876543212',
    email: 'sunita.patel@kinderconnect.edu',
    qualification: 'M.Ed, NTT Diploma',
    experience: '8 Years',
    joiningDate: new Date('2016-08-01'),
    classAssigned: 'Nursery',
    isActive: true,
  },
  {
    id: 'teacher-004',
    fullName: 'Deepika Nair',
    phone: '9876543213',
    email: 'deepika.nair@kinderconnect.edu',
    qualification: 'B.Ed, Diploma in ECE',
    experience: '2 Years',
    joiningDate: new Date('2022-07-20'),
    classAssigned: null,
    isActive: true,
  },
  {
    id: 'teacher-005',
    fullName: 'Kavitha Menon',
    phone: '9876543214',
    email: 'kavitha.menon@kinderconnect.edu',
    qualification: 'M.A. Psychology, B.Ed',
    experience: '6 Years',
    joiningDate: new Date('2018-03-15'),
    classAssigned: 'LKG-B',
    isActive: false,
  },
  {
    id: 'teacher-006',
    fullName: 'Rashmi Gupta',
    phone: '9876543215',
    email: 'rashmi.gupta@kinderconnect.edu',
    qualification: 'B.Ed, NTT Certified',
    experience: '4 Years',
    joiningDate: new Date('2020-01-10'),
    classAssigned: 'UKG-A',
    isActive: true,
  },
];
