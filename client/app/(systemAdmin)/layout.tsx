'use client';
import RoleGuard from '@/src/components/auth/RoleGuard';

export default function SystemAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard>
      {children}
    </RoleGuard>
  );
}