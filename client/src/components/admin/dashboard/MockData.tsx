import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import DnsIcon from '@mui/icons-material/Dns';
import { adminTheme, StatData, SystemAlert, SchoolOnboarding, ServerMetric, RevenueData } from './AdminConfig';

export const statsData: StatData[] = [
  { title: 'Total Schools', value: 12, trend: { value: '+2', direction: 'up', label: 'this month' }, icon: <SchoolIcon />, color: adminTheme.primary.main },
  { title: 'Total Students', value: '1,450', trend: { value: '+128', direction: 'up', label: 'this month' }, icon: <PeopleIcon />, color: '#5C6BC0' },
  { title: 'Monthly Revenue', value: '₹85,000', trend: { value: '+12%', direction: 'up', label: 'vs last month' }, icon: <CurrencyRupeeIcon />, color: '#43A047' },
  { title: 'System Health', value: '99.9%', subtitle: 'Uptime', icon: <HealthAndSafetyIcon />, color: '#2E7D32', status: 'healthy' },
];

export const systemAlerts: SystemAlert[] = [
  { id: '1', type: 'warning', message: 'High latency detected on Database Server 2', timestamp: '5 min ago', action: 'Investigate' },
  { id: '2', type: 'info', message: 'New School Registration Pending: Little Stars Academy', timestamp: '15 min ago', action: 'Review' },
  { id: '3', type: 'error', message: 'Payment gateway timeout for Bright Kids School', timestamp: '1 hour ago', action: 'Resolve' },
  { id: '4', type: 'success', message: 'Backup completed successfully for all tenants', timestamp: '2 hours ago' },
  { id: '5', type: 'warning', message: 'Storage usage above 80% on primary server', timestamp: '3 hours ago', action: 'Upgrade' },
];

export const recentOnboardings: SchoolOnboarding[] = [
  { id: '1', schoolName: 'Little Stars Academy', plan: 'Bloom', adminPhone: '+91 98765 43210', status: 'Pending', joinedDate: '2024-01-15', studentsCount: 145, city: 'Mumbai' },
  { id: '2', schoolName: 'Bright Kids School', plan: 'Sprout', adminPhone: '+91 87654 32109', status: 'Active', joinedDate: '2024-01-12', studentsCount: 89, city: 'Bangalore' },
  { id: '3', schoolName: 'Rainbow Preschool', plan: 'Seed', adminPhone: '+91 76543 21098', status: 'Active', joinedDate: '2024-01-10', studentsCount: 42, city: 'Pune' },
  { id: '4', schoolName: 'Tiny Tots Learning Center', plan: 'Bloom', adminPhone: '+91 65432 10987', status: 'Active', joinedDate: '2024-01-08', studentsCount: 178, city: 'Delhi' },
  { id: '5', schoolName: 'Happy Minds Nursery', plan: 'Sprout', adminPhone: '+91 54321 09876', status: 'Suspended', joinedDate: '2024-01-05', studentsCount: 67, city: 'Chennai' },
];

export const serverMetrics: ServerMetric[] = [
  { name: 'CPU Usage', value: 45, status: 'healthy', icon: <MemoryIcon /> },
  { name: 'Memory', value: 68, status: 'healthy', icon: <DnsIcon /> },
  { name: 'Storage', value: 82, status: 'warning', icon: <StorageIcon /> },
  { name: 'Network', value: 23, status: 'healthy', icon: <NetworkCheckIcon /> },
];

export const revenueData: RevenueData[] = [
  { month: 'Aug', value: 52000 },
  { month: 'Sep', value: 58000 },
  { month: 'Oct', value: 61000 },
  { month: 'Nov', value: 72000 },
  { month: 'Dec', value: 78000 },
  { month: 'Jan', value: 85000 },
];