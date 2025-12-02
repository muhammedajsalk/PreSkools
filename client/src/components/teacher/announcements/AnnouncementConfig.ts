import { alpha } from '@mui/material/styles';

// --- THEME ---
export const COLORS = {
  teacher: '#4DB6AC', admin: '#9F7AEA',
  urgent: '#EF4444', info: '#3B82F6',
  divider: '#E2E8F0', textPrimary: '#2D3748', textSecondary: '#718096',
  bgLight: '#F8FAFC', cardBg: '#FFFFFF'
};

// --- TYPES ---
export interface Notice {
  id: string; title: string; message: string; priority: 'normal' | 'urgent';
  sender: { name: string; avatar?: string; role: 'admin' | 'teacher'; };
  createdAt: Date; type: 'school' | 'class';
}

export interface NoticeFormData { title: string; message: string; priority: 'normal' | 'urgent'; }

// --- MOCK DATA ---
export const MOCK_NOTICES: Notice[] = [
  { id: '1', title: 'Annual Day', message: 'Save the date...', priority: 'urgent', sender: { name: 'Principal', role: 'admin' }, createdAt: new Date('2024-01-22'), type: 'school' },
  { id: '3', title: 'Art Materials', message: 'Bring crayons...', priority: 'normal', sender: { name: 'You', role: 'teacher' }, createdAt: new Date('2024-01-21'), type: 'class' },
];

// --- HELPERS ---
export const formatDate = (date: Date) => {
  const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : date.toLocaleDateString();
};
export const getInitials = (n: string) => n.split(' ').map(c => c[0]).join('').slice(0, 2);
export const getAccentColor = (role: 'admin' | 'teacher') => role === 'admin' ? COLORS.admin : COLORS.teacher;