'use client';
import React from 'react';
import { Card, CardContent, Stack, Box, Typography, Chip, IconButton, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DiscountIcon from '@mui/icons-material/LocalOffer';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import { Invoice, COLORS, formatCurrency, formatDate } from './FeesConfig';

interface Props { invoice: Invoice; onDownload: () => void; onViewDetails: () => void; }

export default function PaidInvoiceCard({ invoice, onDownload, onViewDetails }: Props) {
  return (
    <Card elevation={0} onClick={onViewDetails} sx={{ borderRadius: 3, border: '1px solid', borderColor: COLORS.divider, cursor: 'pointer', transition: 'all 0.2s ease', '&:hover': { borderColor: COLORS.success, boxShadow: `0 4px 20px ${alpha(COLORS.success, 0.1)}` } }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <Chip icon={<CheckCircleIcon sx={{ fontSize: 14 }} />} label="Paid" size="small" sx={{ bgcolor: COLORS.paidBg, color: COLORS.paid, fontWeight: 600, fontSize: '0.7rem', '& .MuiChip-icon': { color: 'inherit' } }} />
              {invoice.discount && <Chip icon={<DiscountIcon sx={{ fontSize: 12 }} />} label={`Saved ${formatCurrency(invoice.discount)}`} size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success, fontWeight: 600, fontSize: '0.65rem', height: 22, '& .MuiChip-icon': { color: 'inherit' } }} />}
            </Stack>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">{invoice.title}</Typography>
            <Stack direction="row" alignItems="center" spacing={2} mt={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}><CalendarIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">Paid on {formatDate(invoice.paidDate!)}</Typography></Stack>
            </Stack>
          </Box>
          <Stack alignItems="flex-end" spacing={1}>
            <Typography variant="h6" fontWeight={700} color="text.primary">{formatCurrency(invoice.amount)}</Typography>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDownload(); }} sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primary, '&:hover': { bgcolor: alpha(COLORS.primary, 0.2) } }}><DownloadIcon fontSize="small" /></IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}