// 1. Define your User Roles
export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'PARENT';

// 2. Define which roles can access which Route Group
// The keys match the start of your URL paths
export const ROLE_ACCESS_RULES: Record<string, UserRole[]> = {
  '/admin':       ['SUPER_ADMIN'],
  '/schoolAdmin': ['SCHOOL_ADMIN'],
  '/teacher':     ['TEACHER', 'SCHOOL_ADMIN'], // School Admin can also view teacher pages
  '/parent':      ['PARENT'],
};

// 3. Helper function to check permission
export const hasAccess = (role: UserRole | undefined, path: string): boolean => {
  if (!role) return false;

  // Find the rule that matches the start of the current path
  const restrictedPath = Object.keys(ROLE_ACCESS_RULES).find(r => path.startsWith(r));

  // If the path isn't restricted (like /login or /about), allow everyone
  if (!restrictedPath) return true;

  // Check if the user's role is in the allowed list
  return ROLE_ACCESS_RULES[restrictedPath].includes(role);
};