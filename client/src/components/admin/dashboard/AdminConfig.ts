export const adminTheme = {
  primary: {
    main: '#00695C',
    light: '#26A69A',
    dark: '#004D40',
    gradient: 'linear-gradient(135deg, #004D40 0%, #00695C 50%, #00897B 100%)',
  },
  secondary: { main: '#FF7043', light: '#FF8A65', dark: '#E64A19' },
  status: { success: '#2E7D32', warning: '#ED6C02', error: '#D32F2F', info: '#0288D1' },
  background: { default: '#F0F2F5', paper: '#FFFFFF', dark: '#1A1A2E' },
};

export interface StatData {
  title: string;
  value: string | number;
  trend?: { value: string; direction: 'up' | 'down'; label: string };
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  status?: 'healthy' | 'warning' | 'error';
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  timestamp: string;
  action?: string;
}

export interface SchoolOnboarding {
  id: string;
  schoolName: string;
  plan: 'Seed' | 'Sprout' | 'Bloom';
  adminPhone: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joinedDate: string;
  studentsCount: number;
  city: string;
}

export interface ServerMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ReactNode;
}

export interface RevenueData {
  month: string;
  value: number;
}