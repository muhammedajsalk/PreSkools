'use client';
import RoleGuard from '@/src/components/auth/RoleGuard';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard>
      {children}
    </RoleGuard>
  );
}