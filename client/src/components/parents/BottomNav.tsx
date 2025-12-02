'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import routing hooks
import { Box, Card, Stack, IconButton, Typography, Badge, alpha } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChatIcon from '@mui/icons-material/Chat';
import PaymentIcon from '@mui/icons-material/Payment'; // Better icon for Fees
import { COLORS } from './ParentConfig';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname(); // Gets the current URL (e.g. "/parent/fees")

  const items = [
    { 
      icon: <HomeIcon />, 
      label: 'Home', 
      path: '/parent/dashboard' 
    },
    { 
      icon: <CollectionsIcon />, 
      label: 'Gallery', 
      path: '/parent/gallery', 
      badge: 12 
    },
    { 
      icon: <ChatIcon />, 
      label: 'Messages', 
      path: '/parent/messages', 
      badge: 3 
    },
    { 
      icon: <PaymentIcon />, 
      label: 'Fees', 
      path: '/parent/fees' 
    },
  ];

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        px: 2, 
        pb: 3, 
        pt: 6, 
        background: `linear-gradient(to top, ${COLORS.background} 85%, transparent)`,
        pointerEvents: 'none'
      }}
    >
      <Card 
        elevation={0} 
        sx={{ 
          pointerEvents: 'auto', 
          borderRadius: 5, 
          bgcolor: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(10px)', 
          boxShadow: `0 8px 32px ${alpha(COLORS.primary, 0.15)}`, 
          border: '1px solid', 
          borderColor: alpha(COLORS.divider, 0.5), 
          maxWidth: 400, 
          mx: 'auto' 
        }}
      >
        <Stack direction="row" justifyContent="space-around" sx={{ py: 1.5 }}>
          {items.map((item) => {
            // Check if this tab is active based on the URL
            const isActive = pathname === item.path;
            
            return (
              <IconButton 
                key={item.path} 
                onClick={() => router.push(item.path)} // Navigate on click
                sx={{ 
                  flexDirection: 'column', 
                  borderRadius: 3, 
                  px: 2.5, 
                  py: 0.5, 
                  color: isActive ? COLORS.primary : COLORS.textSecondary, 
                  bgcolor: isActive ? alpha(COLORS.primary, 0.1) : 'transparent', 
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <Badge 
                  badgeContent={item.badge} 
                  color="error" 
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 16, minWidth: 16 } }}
                >
                  {item.icon}
                </Badge>
                <Typography 
                  variant="caption" 
                  fontWeight={isActive ? 700 : 500} 
                  sx={{ fontSize: '0.65rem', mt: 0.25 }}
                >
                  {item.label}
                </Typography>
              </IconButton>
            );
          })}
        </Stack>
      </Card>
    </Box>
  );
}