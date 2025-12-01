import React from 'react';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// --- TYPES ---
export type PlanType = 'SEED' | 'SPROUT' | 'BLOOM';

export interface FormData {
  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  plan: PlanType | null;
  admin_phone: string;
}

export interface FormErrors {
  name?: string;
  address?: string;
  city?: string;
  email?: string;
  phone?: string;
  plan?: string;
  admin_phone?: string;
}

export interface PlanOption {
  id: PlanType;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  features: string[];
  price: string;
  priceNote: string;
  color: string;
  lightColor: string;
  borderColor: string;
  icon: React.ReactNode;
  popular?: boolean;
}

// --- THEME ---
export const adminTheme = {
  primary: { main: '#00695C', light: '#26A69A', dark: '#004D40', gradient: 'linear-gradient(135deg, #004D40 0%, #00695C 50%, #00897B 100%)' },
  secondary: { main: '#FF7043', light: '#FF8A65', dark: '#E64A19' },
  background: { default: '#F0F2F5', paper: '#FFFFFF', dark: '#1A1A2E' },
};

// --- DATA ---
export const steps = [
  { label: 'School Details', description: 'Basic information', icon: <BusinessIcon /> },
  { label: 'Subscription Plan', description: 'Choose your plan', icon: <CreditCardIcon /> },
  { label: 'Admin Assignment', description: 'Assign administrator', icon: <AdminPanelSettingsIcon /> },
];

export const planOptions: PlanOption[] = [
  {
    id: 'SEED', name: 'Seed', emoji: '🌱', tagline: 'Basic Digitization',
    description: 'Perfect for small schools just starting their digital journey.',
    features: ['Student Management (up to 50)', 'Basic Attendance Tracking', 'Parent Notifications', 'Simple Fee Collection'],
    price: '₹2,999', priceNote: 'per month', color: '#6B7280', lightColor: '#F3F4F6', borderColor: '#D1D5DB', icon: <SpaIcon />,
  },
  {
    id: 'SPROUT', name: 'Sprout', emoji: '🌿', tagline: 'Standard Management',
    description: 'Growing schools that need comprehensive management tools.',
    features: ['Everything in Seed', 'Student Limit: 150', 'Advanced Fee Management', 'Photo & Video Sharing', 'Parent App Access'],
    price: '₹5,999', priceNote: 'per month', color: '#059669', lightColor: '#D1FAE5', borderColor: '#6EE7B7', icon: <LocalFloristIcon />, popular: true,
  },
  {
    id: 'BLOOM', name: 'Bloom', emoji: '🌸', tagline: 'Full Automation',
    description: 'Enterprise-grade solution for established institutions.',
    features: ['Everything in Sprout', 'Unlimited Students', 'Advanced Analytics', 'API Access', '24/7 Phone Support'],
    price: '₹9,999', priceNote: 'per month', color: '#7C3AED', lightColor: '#EDE9FE', borderColor: '#C4B5FD', icon: <FilterVintageIcon />,
  },
];