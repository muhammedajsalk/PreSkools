import { alpha } from '@mui/material/styles';

export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', error: '#F56565', info: '#4299E1', warning: '#ECC94B',
  male: '#4299E1', female: '#ED64A6', whatsapp: '#25D366', divider: '#E2E8F0',
};

// --- TYPES ---
export interface Guardian { id: string; relationship: 'father' | 'mother' | 'guardian'; name: string; phone: string; email: string; occupation: string; workplace: string; isPrimaryContact: boolean; }
export interface Document { id: string; name: string; type: string; uploadedAt: string; fileSize: string; status: 'verified' | 'pending' | 'rejected'; url: string; }
export interface TimelineEvent { id: string; type: 'meal' | 'nap' | 'activity' | 'medical' | 'attendance' | 'note'; title: string; description: string; time: string; date: string; }
export interface PickupPerson { id: string; name: string; relationship: string; phone: string; isAuthorized: boolean; }
export interface MedicalInfo { allergies: string[]; conditions: string[]; medications: string[]; bloodGroup: string; emergencyContact: string; doctorName: string; doctorPhone: string; insuranceInfo: string; }

export interface StudentProfile {
  id: string; name: string; admissionNo: string; rollNo: string; gender: 'male' | 'female';
  dateOfBirth: string; age: string; classId: string; className: string; section: string;
  status: 'active' | 'alumni' | 'dropped'; address: string; city: string; pincode: string;
  attendancePercentage: number; feesDue: number;
  guardians: Guardian[]; documents: Document[]; timeline: TimelineEvent[]; pickupPersons: PickupPerson[]; medicalInfo: MedicalInfo;
}

// --- MOCK DATA ---
export const STUDENT_PROFILE: StudentProfile = {
  id: 's1', name: 'Aarav Sharma', admissionNo: 'KC2024001', rollNo: '01', gender: 'male',
  dateOfBirth: '2019-03-15', age: '5 years 2 months', classId: 'c1', className: 'LKG', section: 'A',
  status: 'active', address: '123 Green Park', city: 'Delhi', pincode: '110001',
  attendancePercentage: 92, feesDue: 15000,
  guardians: [
    { id: 'g1', relationship: 'father', name: 'Rahul Sharma', phone: '+919876543210', email: 'rahul@email.com', occupation: 'Engineer', workplace: 'Tech Corp', isPrimaryContact: true },
    { id: 'g2', relationship: 'mother', name: 'Priya Sharma', phone: '+919876543211', email: 'priya@email.com', occupation: 'Doctor', workplace: 'City Hospital', isPrimaryContact: false },
  ],
  documents: [
    { id: 'd1', name: 'Birth Certificate', type: 'PDF', uploadedAt: '2024-04-01', fileSize: '1.2 MB', status: 'verified', url: '#' },
  ],
  timeline: [
    { id: 't1', type: 'meal', title: 'Lunch', description: 'Ate full portion', time: '12:45 PM', date: 'Today' },
    { id: 't2', type: 'nap', title: 'Nap', description: 'Slept 1.5 hrs', time: '02:30 PM', date: 'Today' },
  ],
  pickupPersons: [
    { id: 'p1', name: 'Rahul Sharma', relationship: 'Father', phone: '+919876543210', isAuthorized: true },
  ],
  medicalInfo: {
    allergies: ['Peanuts'], conditions: ['Mild Asthma'], medications: ['Inhaler'],
    bloodGroup: 'O+', emergencyContact: '+919876543210', doctorName: 'Dr. Anil', doctorPhone: '+919812345678', insuranceInfo: 'Star Health #123',
  },
};

// --- HELPERS ---
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string) => { const c = [COLORS.primary, COLORS.secondary, '#9C27B0']; return c[name.charCodeAt(0) % c.length]; };
export const formatPhone = (phone: string) => phone.replace(/\s+/g, '').replace(/^\+/, '');