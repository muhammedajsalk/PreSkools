'use client';
import RoleGuard from '@/src/components/auth/RoleGuard';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    // By wrapping this layout, EVERY page inside (parent)/* is protected
    <RoleGuard>
      {children}
    </RoleGuard>
  );
}