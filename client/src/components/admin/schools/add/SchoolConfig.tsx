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
        id: 'SEED', 
        name: 'Seed', 
        emoji: '🌱', 
        tagline: 'Basic Digitization',
        description: 'Perfect for small schools just starting their digital journey.',
        features: [
            'Student & Class Management', 
            'Basic Attendance Tracking', 
            'Parent Feed Access'
        ],
        price: '$49', 
        priceNote: 'per month (Up to 50 Students)', 
        color: '#6B7280', 
        lightColor: '#F3F4F6', 
        borderColor: '#D1D5DB', 
        // Note: Icon assumed to be React.createElement(SpaIcon) in your file
        icon: 'SpaIcon', 
    },
    {
        id: 'SPROUT', 
        name: 'Sprout', 
        emoji: '🌿', 
        tagline: 'Standard Management Suite',
        description: 'Growing schools needing core administrative and engagement tools.',
        features: [
            'Everything in Seed', 
            'Student Cap: 150', 
            '✅ Fees & Billing Module', 
            '✅ Attendance Analytics', 
            '✅ Photo & Video Sharing'
        ],
        price: '$99', 
        priceNote: 'per month (Up to 150 Students)', 
        color: '#059669', 
        lightColor: '#D1FAE5', 
        borderColor: '#6EE7B7', 
        icon: 'LocalFloristIcon', 
        popular: true,
    },
    {
        id: 'BLOOM', 
        name: 'Bloom', 
        emoji: '🌸', 
        tagline: 'Enterprise & Full Automation',
        description: 'Solution for large institutions requiring advanced control and support.',
        features: [
            'Everything in Sprout', 
            'Unlimited Students', 
            '✅ Document Storage', 
            '✅ Priority Support', 
            '✅ Data Export & Analytics'
        ],
        price: '$199', 
        priceNote: 'per month (Unlimited Students)', 
        color: '#7C3AED', 
        lightColor: '#EDE9FE', 
        borderColor: '#C4B5FD', 
        icon: 'FilterVintageIcon',
    },
];