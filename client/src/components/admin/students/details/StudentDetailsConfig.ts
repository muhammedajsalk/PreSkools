import { alpha } from '@mui/material/styles';
import React from 'react';
import { CheckCircle, Warning, Schedule } from '@mui/icons-material';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryDark: '#00897B', primaryLight: '#B2DFDB',
  warning: '#FF9800', warningDark: '#F57C00', warningLight: '#FFE0B2',
  error: '#F44336', success: '#4CAF50', successLight: '#C8E6C9',
  pending: '#FF9800', overdue: '#F44336', paid: '#4CAF50',
};

// --- TYPES ---
export interface ParentDetails { fatherName: string; fatherOccupation: string; fatherPhone: string; fatherEmail: string; motherName: string; motherOccupation: string; motherPhone: string; motherEmail: string; guardianName?: string; guardianPhone?: string; guardianRelation?: string;}
export interface ContactInfo { phone: string; email: string; emergencyContact: string; emergencyRelation: string; }
export interface Address { street: string; city: string; state: string; zipCode: string; country: string; }
export interface FeeRecord { id: string; month: string; year: number; amount: number; dueDate: string; paidDate?: string; status: 'paid' | 'pending' | 'overdue'; receiptNo?: string; paymentMethod?: string; description: string; }

// ✅ UPDATED INTERFACE
export interface StudentProfile {
  id: string; 
  firstName: string; 
  lastName: string; 
  admissionNo: string; 
  dateOfBirth: string;
  gender: string; 
  bloodGroup: string; 
  status: 'active' | 'inactive' | 'dropped'; 
  avatar?: string;
  className: string; 
  section: string; 
  rollNo: string; 
  admissionDate: string;
  
  parent: ParentDetails; 
  contact: ContactInfo; 
  address: Address; 
  feeHistory: FeeRecord[];

  // ✅ Added Medical Info
  medicalInfo?: {
    allergies: string[];
    conditions: string[];
    bloodGroup: string;
    doctorName?: string;
    doctorPhone?: string;
  };
}

// --- MOCK DATA ---
export const MOCK_STUDENT_FULL_PROFILE: StudentProfile = {
  id: 'STU001', firstName: 'Emily', lastName: 'Johnson', admissionNo: 'ADM-2024-001', dateOfBirth: '2018-05-15',
  gender: 'Female', bloodGroup: 'A+', status: 'active', className: 'Grade 1', section: 'A', rollNo: '12', admissionDate: '2024-01-15',
  parent: { fatherName: 'Michael Johnson', fatherOccupation: 'Software Engineer', fatherPhone: '+1 (555) 123-4567', fatherEmail: 'michael@email.com', motherName: 'Sarah Johnson', motherOccupation: 'Doctor', motherPhone: '+1 (555) 234-5678', motherEmail: 'sarah@email.com' },
  contact: { phone: '+1 (555) 345-6789', email: 'emily@school.com', emergencyContact: '+1 (555) 456-7890', emergencyRelation: 'Uncle' },
  address: { street: '123 Maple St', city: 'Springfield', state: 'IL', zipCode: '62701', country: 'USA' },
  feeHistory: [],
  medicalInfo: { allergies: [], conditions: [], bloodGroup: 'A+', doctorName: 'Dr. Smith', doctorPhone: '555-0000' }
};

// --- HELPERS ---
export const formatDate = (d: string) => {
    if (!d) return 'N/A';
    try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } 
    catch (e) { return d; }
};
export const formatCurrency = (a: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a);
export const getStudentStatusColor = (s: string): 'success' | 'warning' | 'error' => s === 'active' ? 'success' : s === 'inactive' ? 'warning' : 'error';

export const getFeeStatusConfig = (status: string) => {
  const c: any = {
    paid: { label: 'Paid', color: COLORS.paid, icon: CheckCircle },
    pending: { label: 'Pending', color: COLORS.pending, icon: Schedule },
    overdue: { label: 'Overdue', color: COLORS.overdue, icon: Warning }
  };
  return c[status] || c.pending;
};