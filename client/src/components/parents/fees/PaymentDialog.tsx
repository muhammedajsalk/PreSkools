'use client';
import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Box, Typography, IconButton, Divider, Card, CardContent, RadioGroup, Radio, Button, CircularProgress, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Invoice, PaymentMethod, COLORS, PAYMENT_METHODS, formatCurrency } from './FeesConfig';

interface Props { invoice: Invoice | null; invoices?: Invoice[]; open: boolean; onClose: () => void; onSuccess: () => void; }

export default function PaymentDialog({ invoice, invoices, open, onClose, onSuccess }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');

  const totalAmount = useMemo(() => invoices?.reduce((sum, inv) => sum + inv.amount, 0) || invoice?.amount || 0, [invoice, invoices]);

  const handlePayment = async () => {
    setStep('processing');
    await new Promise((r) => setTimeout(r, 2500));
    setStep('success');
    setTimeout(() => { onSuccess(); onClose(); setStep('select'); }, 2000);
  };

  return (
    <Dialog open={open} onClose={() => step !== 'processing' && onClose()} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
      {step === 'select' && (
        <>
          <DialogTitle sx={{ pb: 1 }}><Stack direction="row" alignItems="center" justifyContent="space-between"><Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(COLORS.secondary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.secondary }}><PaymentIcon /></Box><Box><Typography variant="subtitle1" fontWeight={700}>Complete Payment</Typography><Typography variant="caption" color="text.secondary">Secure gateway</Typography></Box></Stack><IconButton onClick={onClose}><CloseIcon /></IconButton></Stack></DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 3 }}>
            <Card elevation={0} sx={{ bgcolor: alpha(COLORS.secondary, 0.08), borderRadius: 3, mb: 3 }}><CardContent sx={{ p: 2.5, textAlign: 'center' }}><Typography variant="overline" color="text.secondary">AMOUNT TO PAY</Typography><Typography variant="h3" fontWeight={800} color={COLORS.secondary}>{formatCurrency(totalAmount)}</Typography></CardContent></Card>
            <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}><Stack spacing={1.5}>{PAYMENT_METHODS.map((m) => (<Card key={m.id} elevation={0} onClick={() => setSelectedMethod(m.id as PaymentMethod)} sx={{ borderRadius: 2, border: '2px solid', borderColor: selectedMethod === m.id ? COLORS.primary : COLORS.divider, bgcolor: selectedMethod === m.id ? alpha(COLORS.primary, 0.04) : 'transparent', cursor: 'pointer' }}><CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}><Stack direction="row" alignItems="center" spacing={2}><Radio checked={selectedMethod === m.id} value={m.id} sx={{ color: COLORS.divider, '&.Mui-checked': { color: COLORS.primary } }} /><Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: selectedMethod === m.id ? alpha(COLORS.primary, 0.1) : COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedMethod === m.id ? COLORS.primary : COLORS.textSecondary }}>{React.cloneElement(m.icon as React.ReactElement)}</Box><Box sx={{ flex: 1 }}><Typography variant="subtitle2" fontWeight={600}>{m.label}</Typography><Typography variant="caption" color="text.secondary">{m.description}</Typography></Box></Stack></CardContent></Card>))}</Stack></RadioGroup>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 3 }}><SecurityIcon sx={{ fontSize: 16, color: COLORS.success }} /><Typography variant="caption" color="text.secondary">Secured with 256-bit encryption</Typography></Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}><Button fullWidth variant="contained" size="large" onClick={handlePayment} sx={{ bgcolor: COLORS.secondary, borderRadius: 3, py: 1.75, fontWeight: 700, '&:hover': { bgcolor: COLORS.secondaryDark } }}>Confirm Payment</Button></DialogActions>
        </>
      )}
      {step === 'processing' && <DialogContent sx={{ p: 5, textAlign: 'center' }}><CircularProgress size={64} sx={{ color: COLORS.secondary, mb: 3 }} /><Typography variant="h6" fontWeight={600}>Processing...</Typography></DialogContent>}
      {step === 'success' && <DialogContent sx={{ p: 5, textAlign: 'center' }}><Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: COLORS.paidBg, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}><CheckCircleIcon sx={{ fontSize: 48, color: COLORS.paid }} /></Box><Typography variant="h5" fontWeight={700} color={COLORS.paid}>Success!</Typography></DialogContent>}
    </Dialog>
  );
}