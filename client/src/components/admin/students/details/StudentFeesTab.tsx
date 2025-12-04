'use client';
import React, { useMemo } from 'react';
import { Box, Card, CardContent, Stack, Typography, Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Tooltip, IconButton, Button, CircularProgress, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';
import PaymentIcon from '@mui/icons-material/Payment';
import { FeeRecord, COLORS, formatCurrency, formatDate, getFeeStatusConfig } from './StudentDetailsConfig';

interface Props { feeHistory: FeeRecord[]; onMarkPaid: (id: string) => void; onDownloadReceipt: (id: string) => void; isProcessing: string | null; }

export default function StudentFeesTab({ feeHistory, onMarkPaid, onDownloadReceipt, isProcessing }: Props) {
  const { totalPaid, totalPending } = useMemo(() => feeHistory.reduce((acc, f) => { f.status === 'paid' ? acc.totalPaid += f.amount : acc.totalPending += f.amount; return acc; }, { totalPaid: 0, totalPending: 0 }), [feeHistory]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 4 }}>
        <Card elevation={0} sx={{ flex: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: alpha(COLORS.success, 0.05) }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(COLORS.success, 0.15) }}><CheckCircleIcon sx={{ fontSize: 32, color: COLORS.success }} /></Box>
              <Box><Typography variant="body2" color="text.secondary" fontWeight={500}>Total Paid</Typography><Typography variant="h4" fontWeight={700} color={COLORS.success}>{formatCurrency(totalPaid)}</Typography></Box>
            </Stack>
          </CardContent>
        </Card>
        <Card elevation={0} sx={{ flex: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: alpha(COLORS.warning, 0.05) }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(COLORS.warning, 0.15) }}><WarningIcon sx={{ fontSize: 32, color: COLORS.warning }} /></Box>
              <Box><Typography variant="body2" color="text.secondary" fontWeight={500}>Total Pending</Typography><Typography variant="h4" fontWeight={700} color={COLORS.warning}>{formatCurrency(totalPending)}</Typography></Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {feeHistory.some((f) => f.status === 'overdue') && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} icon={<WarningIcon />}><Typography fontWeight={600}>Overdue Fees Alert</Typography><Typography variant="body2">This student has overdue fees that require immediate attention.</Typography></Alert>}

      <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Typography variant="h6" fontWeight={600}>Fee History</Typography><Chip label={`${feeHistory.length} Records`} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark }} /></Box>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: alpha(COLORS.primary, 0.05) }}>
                        <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feeHistory.map((fee) => { 
                        const config = getFeeStatusConfig(fee.status); 
                        return (
                          <TableRow key={fee.id} hover sx={{ '&:hover': { bgcolor: alpha(COLORS.primary, 0.02) } }}>
                            <TableCell><Typography variant="body2" fontWeight={500}>{fee.description}</Typography>{fee.receiptNo && <Typography variant="caption" color="text.secondary">Receipt: {fee.receiptNo}</Typography>}</TableCell>
                            <TableCell><Typography variant="body2" fontWeight={600}>{formatCurrency(fee.amount)}</Typography></TableCell>
                            <TableCell><Typography variant="body2">{formatDate(fee.dueDate)}</Typography></TableCell>
                            <TableCell><Chip icon={React.createElement(config.icon as React.FunctionComponent<any>, { sx: { fontSize: 16 } })} label={config.label} size="small" sx={{ bgcolor: alpha(config.color, 0.1), color: config.color, fontWeight: 600, '& .MuiChip-icon': { color: config.color } }} /></TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    {fee.status === 'paid' ? 
                                        <Tooltip title="Download"><IconButton size="small" onClick={() => onDownloadReceipt(fee.id)} sx={{ color: COLORS.primary }}><DownloadIcon fontSize="small" /></IconButton></Tooltip> 
                                        : 
                                        <Button size="small" variant="contained" startIcon={isProcessing === fee.id ? <CircularProgress size={16} color="inherit" /> : <PaymentIcon />} onClick={() => onMarkPaid(fee.id)} disabled={isProcessing === fee.id} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark }, textTransform: 'none', fontWeight: 600, borderRadius: 1.5 }}>Mark Paid</Button>
                                    }
                                </Stack>
                            </TableCell>
                          </TableRow>
                        ); 
                    })}
                </TableBody>
            </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}