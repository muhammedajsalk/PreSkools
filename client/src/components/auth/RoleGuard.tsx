'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { hasAccess, UserRole } from '@/src/lib/rbac';

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // 1. Get User from LocalStorage
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        // Not logged in -> Redirect to Login
        router.replace('/login');
        return;
      }

      try {
        const user = JSON.parse(userString);
        const userRole = user.role as UserRole;

        // 2. Check Permissions using our helper
        if (hasAccess(userRole, pathname)) {
          setIsAuthorized(true);
        } else {
          // Logged in but wrong role -> Redirect to Unauthorized page
          // Or redirect to their correct dashboard based on role
          console.warn(`Access Denied: Role ${userRole} cannot access ${pathname}`);
          router.replace('/unauthorized');
        }
      } catch (error) {
        // Corrupt data -> Logout
        localStorage.removeItem('user');
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // 3. Show loading spinner while checking
  if (isLoading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 4. If authorized, render the page
  return isAuthorized ? <>{children}</> : null;
}