'use client';
import React, { useState, useMemo } from 'react';
import { Box, Stack, Typography, Tabs, Tab, Badge, alpha } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Invoice, MOCK_INVOICES, COLORS, TabType } from '@/src/components/parents/fees/FeesConfig';
import OutstandingCard from '@/src/components/parents/fees/OutstandingCard';
import DueInvoiceCard from '@/src/components/parents/fees/DueInvoiceCard';
import PaidInvoiceCard from '@/src/components/parents/fees/PaidInvoiceCard';
import PaymentDialog from '@/src/components/parents/fees/PaymentDialog';
import InvoiceDetailDialog from '@/src/components/parents/fees/InvoiceDetailDialog';
import BottomNav from '@/src/components/parents/BottomNav';

export default function ParentFeesPage() {
    const [activeTab, setActiveTab] = useState<TabType>('due');
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [payInvoices, setPayInvoices] = useState<Invoice[]>([]);

    const dueInvoices = useMemo(() => MOCK_INVOICES.filter(i => i.status !== 'paid').sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()), []);
    const paidInvoices = useMemo(() => MOCK_INVOICES.filter(i => i.status === 'paid').sort((a, b) => new Date(b.paidDate!).getTime() - new Date(a.paidDate!).getTime()), []);
    const totalDue = dueInvoices.reduce((s, i) => s + i.amount, 0);

    const handlePay = (inv: Invoice) => { setPayInvoices([inv]); setPaymentOpen(true); };
    const handlePayAll = () => { setPayInvoices(dueInvoices); setPaymentOpen(true); };
    const handleView = (inv: Invoice) => { setSelectedInvoice(inv); setDetailOpen(true); };

    return (
        <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 12 }}>
            <Box sx={{ bgcolor: COLORS.cardBg, position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid', borderColor: COLORS.divider }}>
                <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(COLORS.secondary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.secondary }}><ReceiptIcon /></Box><Box><Typography variant="h5" fontWeight={700}>Fees & Payments</Typography><Typography variant="caption" color="text.secondary">Manage school fee payments</Typography></Box></Stack>
                </Box>
            </Box>

            <Box sx={{ px: { xs: 2, md: 3 }, py: 2, maxWidth: 800, mx: 'auto' }}>
                <Box sx={{ mb: 3 }}><OutstandingCard totalDue={totalDue} overdueCount={dueInvoices.filter(i => i.status === 'overdue').length} pendingCount={dueInvoices.filter(i => i.status === 'pending').length} onPayNow={handlePayAll} /></Box>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2, '& .MuiTabs-indicator': { bgcolor: activeTab === 'due' ? COLORS.secondary : COLORS.success } }}>
                    <Tab value="due" icon={<Badge badgeContent={dueInvoices.length} sx={{ '& .MuiBadge-badge': { bgcolor: dueInvoices.length > 0 ? COLORS.secondary : COLORS.textSecondary, color: 'white' } }}><PaymentIcon sx={{ fontSize: 20 }} /></Badge>} iconPosition="start" label="Due" sx={{ color: activeTab === 'due' ? COLORS.secondary : COLORS.textSecondary, '&.Mui-selected': { color: COLORS.secondary } }} />
                    <Tab value="history" icon={<HistoryIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="History" sx={{ color: activeTab === 'history' ? COLORS.success : COLORS.textSecondary, '&.Mui-selected': { color: COLORS.success } }} />
                </Tabs>

                {activeTab === 'due' && <Stack spacing={2}>{dueInvoices.length > 0 ? dueInvoices.map(i => <DueInvoiceCard key={i.id} invoice={i} onPay={() => handlePay(i)} onViewDetails={() => handleView(i)} />) : <Box sx={{ textAlign: 'center', p: 4 }}><CheckCircleIcon sx={{ fontSize: 48, color: COLORS.success, mb: 2 }} /><Typography variant="h6" color={COLORS.success}>No Pending Payments</Typography></Box>}</Stack>}
                {activeTab === 'history' && <Stack spacing={2}>{paidInvoices.map(i => <PaidInvoiceCard key={i.id} invoice={i} onDownload={() => alert('Download')} onViewDetails={() => handleView(i)} />)}</Stack>}
            </Box>

            <InvoiceDetailDialog invoice={selectedInvoice} open={detailOpen} onClose={() => setDetailOpen(false)} onPay={() => { setDetailOpen(false); if (selectedInvoice) handlePay(selectedInvoice); }} onDownload={() => alert('Download')} />
            <PaymentDialog invoice={null} invoices={payInvoices} open={paymentOpen} onClose={() => setPaymentOpen(false)} onSuccess={() => alert('Success')} />
            <Box sx={{ mt: 14 }}>
                <BottomNav  />
            </Box>
        </Box>
    );
}