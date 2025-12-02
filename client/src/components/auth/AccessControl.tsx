'use client';
import React, { useEffect, useState } from 'react';
import { UserRole } from '@/src/lib/rbac';

interface Props {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode; // What to show if access denied (optional)
}

export default function AccessControl({ allowedRoles, children, fallback = null }: Props) {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserRole(user.role);
    }
  }, []);

  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}



// example:-

// import AccessControl from '@/components/auth/AccessControl';
// // ...

// // Only School Admins can delete students
// <AccessControl allowedRoles={['SCHOOL_ADMIN']}>
//   <Button color="error">Delete Student</Button>
// </AccessControl>