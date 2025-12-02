'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, Button, alpha } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import PendingIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { COLORS, formatCurrency } from './FeesConfig';

interface Props { totalDue: number; overdueCount: number; pendingCount: number; onPayNow: () => void; }

export default function OutstandingCard({ totalDue, overdueCount, pendingCount, onPayNow }: Props) {
  const hasOutstanding = totalDue > 0;

  return (
    <Card elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', background: hasOutstanding ? `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryDark} 100%)` : `linear-gradient(135deg, ${COLORS.success} 0%, #38A169 100%)`, color: 'white', boxShadow: hasOutstanding ? `0 8px 32px ${alpha(COLORS.secondary, 0.35)}` : `0 8px 32px ${alpha(COLORS.success, 0.35)}` }}>
      <CardContent sx={{ p: 3 }}>
        {hasOutstanding ? (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Box><Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1.5 }}>TOTAL OUTSTANDING</Typography><Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1.2 }}>{formatCurrency(totalDue)}</Typography></Box>
              <Box sx={{ width: 64, height: 64, borderRadius: 3, bgcolor: alpha('#fff', 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PaymentIcon sx={{ fontSize: 32 }} /></Box>
            </Stack>
            <Stack direction="row" spacing={2} mb={3}>
              {overdueCount > 0 && <Chip icon={<WarningIcon sx={{ fontSize: 14, color: 'white !important' }} />} label={`${overdueCount} Overdue`} size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600, '& .MuiChip-icon': { color: 'white' } }} />}
              {pendingCount > 0 && <Chip icon={<PendingIcon sx={{ fontSize: 14, color: 'white !important' }} />} label={`${pendingCount} Pending`} size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600, '& .MuiChip-icon': { color: 'white' } }} />}
            </Stack>
            <Button fullWidth variant="contained" size="large" onClick={onPayNow} endIcon={<ArrowForwardIcon />} sx={{ bgcolor: 'white', color: COLORS.secondary, fontWeight: 700, py: 1.5, borderRadius: 3, boxShadow: `0 4px 14px ${alpha('#000', 0.15)}`, '&:hover': { bgcolor: alpha('#fff', 0.95) } }}>Pay Now</Button>
          </>
        ) : (
          <Stack alignItems="center" spacing={2} py={2}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: alpha('#fff', 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CelebrationIcon sx={{ fontSize: 40 }} /></Box>
            <Box sx={{ textAlign: 'center' }}><Typography variant="h5" fontWeight={700} gutterBottom>All Caught Up! 🎉</Typography><Typography variant="body2" sx={{ opacity: 0.9 }}>You have no outstanding payments.</Typography></Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}