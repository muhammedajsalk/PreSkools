'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define your theme here
const theme = createTheme({
  palette: {
    primary: {
      main: '#4DB6AC', // Soft Teal
    },
    secondary: {
      main: '#FF9800', // Orange
    },
  },
  components: {
    // Fix for the Hydration mismatch in Lists
    MuiListItemText: {
      defaultProps: {
        secondaryTypographyProps: { 
          // @ts-ignore -- Force 'div' to fix hydration error (p cannot contain div)
          component: 'div' as any 
        }
      }
    }
  }
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}