'use client';
import React from 'react';
import { Card, CardHeader, CardContent, Stack, Avatar, Box, Typography, IconButton, Paper, LinearProgress, Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { brandColors, FeeData } from './DashboardConfig';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function FeeOverview({ fees }: { fees: FeeData[] }) {
  const totalCollected = fees.reduce((sum, f) => sum + f.collected, 0);
  const totalPending = fees.reduce((sum, f) => sum + f.pending, 0);
  const collectionPercentage = Math.round((totalCollected / (totalCollected + totalPending)) * 100);

  return (
    <Card elevation={0} sx={{ flex: { lg: 6 }, borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
      <CardHeader
        title={<Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 40, height: 40, bgcolor: `${brandColors.stats.green.main}15`, color: brandColors.stats.green.main }}><AccountBalanceWalletIcon sx={{ fontSize: 22 }} /></Avatar><Box><Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Fee Collection Overview</Typography><Typography variant="caption" sx={{ color: '#6B7280' }}>This month's status</Typography></Box></Stack>}
        action={<Stack direction="row" alignItems="center" spacing={2}><Box sx={{ textAlign: 'right' }}><Typography variant="h5" sx={{ fontWeight: 800, color: brandColors.stats.green.main }}>{collectionPercentage}%</Typography><Typography variant="caption" sx={{ color: '#6B7280' }}>Collected</Typography></Box><IconButton size="small"><MoreVertIcon sx={{ color: '#9CA3AF' }} /></IconButton></Stack>}
      />
      <CardContent sx={{ pt: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Paper elevation={0} sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: brandColors.stats.green.light, border: `1px solid ${brandColors.stats.green.main}30` }}>
            <Typography variant="caption" sx={{ color: brandColors.stats.green.dark, fontWeight: 600 }}>Total Collected</Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: brandColors.stats.green.dark, mt: 0.5 }}>{formatCurrency(totalCollected)}</Typography>
          </Paper>
          <Paper elevation={0} sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: brandColors.stats.orange.light, border: `1px solid ${brandColors.stats.orange.main}30` }}>
            <Typography variant="caption" sx={{ color: brandColors.stats.orange.dark, fontWeight: 600 }}>Total Pending</Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: brandColors.stats.orange.dark, mt: 0.5 }}>{formatCurrency(totalPending)}</Typography>
          </Paper>
        </Stack>

        {fees.map((f) => {
          const pct = Math.round((f.collected / f.total) * 100);
          return (
            <Box key={f.category} sx={{ mb: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>{f.category}</Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>{pct}% ({formatCurrency(f.collected)} / {formatCurrency(f.total)})</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={pct} sx={{ height: 10, borderRadius: 5, bgcolor: '#E5E7EB', '& .MuiLinearProgress-bar': { borderRadius: 5, bgcolor: f.color } }} />
            </Box>
          );
        })}
        <Button fullWidth variant="outlined" endIcon={<ArrowForwardIcon />} sx={{ mt: 2, borderColor: '#E5E7EB', color: '#4B5563', fontWeight: 600, borderRadius: 2, '&:hover': { borderColor: brandColors.primary.main, color: brandColors.primary.main } }}>View Full Fee Report</Button>
      </CardContent>
    </Card>
  );
}