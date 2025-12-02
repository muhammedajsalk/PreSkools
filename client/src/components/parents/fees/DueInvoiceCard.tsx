'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, Button, alpha } from '@mui/material';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import PaymentIcon from '@mui/icons-material/Payment';
import { Invoice, COLORS, getStatusConfig, getDaysOverdue, formatCurrency, formatDate } from './FeesConfig';

interface Props { invoice: Invoice; onPay: () => void; onViewDetails: () => void; }

export default function DueInvoiceCard({ invoice, onPay, onViewDetails }: Props) {
  const statusConfig = getStatusConfig(invoice.status);
  const isOverdue = invoice.status === 'overdue';
  const daysOverdue = isOverdue ? getDaysOverdue(invoice.dueDate) : 0;

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: isOverdue ? alpha(COLORS.error, 0.3) : COLORS.divider, bgcolor: isOverdue ? alpha(COLORS.error, 0.02) : COLORS.cardBg, transition: 'all 0.2s ease', '&:hover': { borderColor: statusConfig.color, boxShadow: `0 4px 20px ${alpha(statusConfig.color, 0.15)}` } }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <Chip icon={React.cloneElement(statusConfig.icon as React.ReactElement, { sx: { fontSize: 14 } })} label={statusConfig.label} size="small" sx={{ bgcolor: statusConfig.bgColor, color: statusConfig.color, fontWeight: 600, fontSize: '0.7rem', '& .MuiChip-icon': { color: 'inherit' } }} />
              {isOverdue && <Typography variant="caption" color="error" fontWeight={600}>{daysOverdue} days overdue</Typography>}
            </Stack>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">{invoice.title}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>{invoice.description}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right', ml: 2 }}>
            <Typography variant="h5" fontWeight={700} color={isOverdue ? COLORS.error : COLORS.textPrimary}>{formatCurrency(invoice.amount)}</Typography>
            {invoice.lateFee && <Typography variant="caption" color="error">+{formatCurrency(invoice.lateFee)} late fee</Typography>}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}><Stack direction="row" alignItems="center" spacing={0.5}><CalendarIcon sx={{ fontSize: 16, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">Due: {formatDate(invoice.dueDate)}</Typography></Stack></Stack>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" size="small" onClick={onViewDetails} sx={{ flex: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600, borderColor: COLORS.divider, color: COLORS.textSecondary, '&:hover': { borderColor: COLORS.primary, color: COLORS.primary } }}>View Details</Button>
          <Button variant="contained" size="small" onClick={onPay} startIcon={<PaymentIcon />} sx={{ flex: 1, borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: isOverdue ? COLORS.error : COLORS.primary, '&:hover': { bgcolor: isOverdue ? '#E53E3E' : COLORS.primaryDark } }}>Pay Now</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}