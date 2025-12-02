import { alpha } from '@mui/material/styles';
import React from 'react';
import { CheckCircle, Schedule, Warning, CreditCard, AccountBalance, QrCode, Wallet } from '@mui/icons-material';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F0F4F8', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', successLight: '#C6F6D5',
  warning: '#ECC94B', warningLight: '#FAF089',
  error: '#F56565', errorLight: '#FED7D7',
  info: '#4299E1', infoLight: '#BEE3F8',
  purple: '#9F7AEA', purpleLight: '#E9D8FD',
  divider: '#E2E8F0',
  // Payment
  paid: '#48BB78', paidBg: '#C6F6D5',
  pending: '#ECC94B', pendingBg: '#FAF089',
  overdue: '#F56565', overdueBg: '#FED7D7',
};

// --- TYPES ---
export type InvoiceStatus = 'paid' | 'pending' | 'overdue';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';
export type TabType = 'due' | 'history';

export interface FeeBreakdown { item: string; amount: number; }
export interface Invoice {
  id: string; title: string; description: string; month: string; year: number;
  amount: number; dueDate: string; status: InvoiceStatus; paidDate?: string;
  paymentMethod?: PaymentMethod; transactionId?: string; breakdown: FeeBreakdown[];
  lateFee?: number; discount?: number;
}

// --- MOCK DATA ---
export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv-001', title: 'Tuition Fee - Dec 2024', description: 'Monthly fee', month: 'December', year: 2024, amount: 15000, dueDate: '2024-12-05', status: 'pending', breakdown: [{ item: 'Tuition', amount: 12000 }, { item: 'Bus', amount: 3000 }] },
  { id: 'inv-003', title: 'Tuition Fee - Nov 2024', description: 'Monthly fee', month: 'November', year: 2024, amount: 15500, dueDate: '2024-11-05', status: 'overdue', lateFee: 500, breakdown: [{ item: 'Tuition', amount: 12000 }, { item: 'Bus', amount: 3000 }, { item: 'Late Fee', amount: 500 }] },
  { id: 'inv-004', title: 'Tuition Fee - Oct 2024', description: 'Monthly fee', month: 'October', year: 2024, amount: 15000, dueDate: '2024-10-05', status: 'paid', paidDate: '2024-10-03', paymentMethod: 'upi', transactionId: 'TXN123', breakdown: [{ item: 'Tuition', amount: 12000 }, { item: 'Bus', amount: 3000 }] },
];

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: React.createElement(QrCode), description: 'GPay, PhonePe' },
  { id: 'card', label: 'Card', icon: React.createElement(CreditCard), description: 'Visa, Mastercard' },
  { id: 'netbanking', label: 'Net Banking', icon: React.createElement(AccountBalance), description: 'All Banks' },
  { id: 'wallet', label: 'Wallet', icon: React.createElement(Wallet), description: 'Paytm, Amazon' },
];

// --- HELPERS ---
export const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
export const formatDate = (date: string) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const getStatusConfig = (status: InvoiceStatus) => {
  const c: any = {
    paid: { label: 'Paid', color: COLORS.paid, bgColor: COLORS.paidBg, icon: React.createElement(CheckCircle) },
    pending: { label: 'Pending', color: COLORS.pending, bgColor: COLORS.pendingBg, icon: React.createElement(Schedule) },
    overdue: { label: 'Overdue', color: COLORS.overdue, bgColor: COLORS.overdueBg, icon: React.createElement(Warning) }
  };
  return c[status];
};
export const getDaysOverdue = (date: string) => Math.ceil((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));