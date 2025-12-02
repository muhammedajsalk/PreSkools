'use client';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Box, Typography, IconButton, Divider, Chip, Card, CardContent, Button, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DownloadIcon from '@mui/icons-material/Download';
import PaymentIcon from '@mui/icons-material/Payment';
import { Invoice, COLORS, getStatusConfig, formatDate, formatCurrency } from './FeesConfig';

interface Props { invoice: Invoice | null; open: boolean; onClose: () => void; onPay?: () => void; onDownload?: () => void; }

export default function InvoiceDetailDialog({ invoice, open, onClose, onPay, onDownload }: Props) {
  if (!invoice) return null;
  const statusConfig = getStatusConfig(invoice.status);
  const isPaid = invoice.status === 'paid';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ pb: 1 }}><Stack direction="row" alignItems="center" justifyContent="space-between"><Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(statusConfig.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: statusConfig.color }}><ReceiptIcon /></Box><Box><Typography variant="subtitle1" fontWeight={700}>Invoice Details</Typography><Typography variant="caption" color="text.secondary">#{invoice.id.toUpperCase()}</Typography></Box></Stack><IconButton onClick={onClose}><CloseIcon /></IconButton></Stack></DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ p: 2, mb: 3, borderRadius: 3, bgcolor: statusConfig.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Stack direction="row" alignItems="center" spacing={1}>{React.cloneElement(statusConfig.icon as React.ReactElement)}<Typography variant="subtitle2" fontWeight={600} color={statusConfig.color}>{isPaid ? `Paid on ${formatDate(invoice.paidDate!)}` : `Due on ${formatDate(invoice.dueDate)}`}</Typography></Stack><Chip label={statusConfig.label} size="small" sx={{ bgcolor: statusConfig.color, color: 'white', fontWeight: 700 }} /></Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>{invoice.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{invoice.description}</Typography>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>FEE BREAKDOWN</Typography>
        <Card elevation={0} sx={{ bgcolor: COLORS.background, borderRadius: 2, mb: 3 }}><CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}><Stack spacing={1.5}>{invoice.breakdown.map((item, i) => (<Stack key={i} direction="row" justifyContent="space-between"><Typography variant="body2" color="text.secondary">{item.item}</Typography><Typography variant="body2" fontWeight={600}>{formatCurrency(item.amount)}</Typography></Stack>))}<Divider /><Stack direction="row" justifyContent="space-between"><Typography variant="subtitle1" fontWeight={700}>Total</Typography><Typography variant="subtitle1" fontWeight={700} color={statusConfig.color}>{formatCurrency(invoice.amount)}</Typography></Stack></Stack></CardContent></Card>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>{isPaid ? <Button fullWidth variant="contained" startIcon={<DownloadIcon />} onClick={onDownload} sx={{ bgcolor: COLORS.primary, borderRadius: 2, py: 1.5, fontWeight: 600 }}>Download Receipt</Button> : <Button fullWidth variant="contained" startIcon={<PaymentIcon />} onClick={onPay} sx={{ bgcolor: invoice.status === 'overdue' ? COLORS.error : COLORS.secondary, borderRadius: 2, py: 1.5, fontWeight: 600 }}>Pay {formatCurrency(invoice.amount)}</Button>}</DialogActions>
    </Dialog>
  );
}