'use client';
import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { adminTheme } from '../../../src/components/admin/dashboard/AdminConfig';
import { statsData, revenueData, systemAlerts, serverMetrics, recentOnboardings } from '../../../src/components/admin/dashboard/MockData';
import StatCard from '../../../src/components/admin/dashboard/StatCard';
import RevenueChart from '../../../src/components/admin/dashboard/RevenueChart';
import SystemAlerts from '../../../src/components/admin/dashboard/SystemAlerts';
import ServerHealth from '../../../src/components/admin/dashboard/ServerHealth';
import OnboardingTable from '../../../src/components/admin/dashboard/OnboardingTable';

export default function SuperAdminDashboard() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: adminTheme.background.default, p: { xs: 2, sm: 3, md: 4 } }}>
      
      {/* HEADER */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
            <Box sx={{ width: 8, height: 32, borderRadius: 1, background: adminTheme.primary.gradient }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: adminTheme.background.dark, letterSpacing: '-0.5px' }}>Command Center</Typography>
          </Stack>
          <Typography variant="body1" sx={{ color: '#6B7280', ml: 3.5 }}>Welcome back, Admin! Here's your platform overview.</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<RefreshIcon />}>Refresh</Button>
          <Button variant="contained" startIcon={<AddBusinessIcon />} sx={{ background: adminTheme.primary.gradient }}>Add School</Button>
        </Stack>
      </Stack>

      {/* STATS (Replaced Grid with Flex Box) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5, mb: 4 }}>
        {statsData.map((stat, index) => (
          <Box 
            key={index} 
            sx={{ 
              p: 1.5, // Gutter
              width: { xs: '100%', sm: '50%', lg: '25%' }, // Responsive Widths
              display: 'flex'
            }}
          >
            <Box sx={{ width: '100%' }}> {/* Ensure card takes full height */}
               <StatCard data={stat} />
            </Box>
          </Box>
        ))}
      </Box>

      {/* CHARTS & ALERTS (Replaced Grid with Flex Box) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5, mb: 4 }}>
        {/* Chart Section (Approx 7/12 cols) */}
        <Box sx={{ p: 1.5, width: { xs: '100%', lg: '58.333%' } }}>
           <RevenueChart data={revenueData} />
        </Box>
        
        {/* Alerts Section (Approx 5/12 cols) */}
        <Box sx={{ p: 1.5, width: { xs: '100%', lg: '41.666%' } }}>
           <SystemAlerts alerts={systemAlerts} />
        </Box>
      </Box>

      {/* SERVER HEALTH */}
      <ServerHealth metrics={serverMetrics} />

      {/* TABLE */}
      <OnboardingTable schools={recentOnboardings} />
      
      <style jsx global>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.5); } 70% { box-shadow: 0 0 0 12px rgba(46, 125, 50, 0); } 100% { box-shadow: 0 0 0 0 rgba(46, 125, 50, 0); } }`}</style>
    </Box>
  );
}