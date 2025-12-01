'use client';
import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography, Stack, Chip, IconButton, Tooltip } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { adminTheme, RevenueData } from './AdminConfig';

export default function RevenueChart({ data }: { data: RevenueData[] }) {
  const maxRevenue = Math.max(...data.map((d) => d.value));

  return (
    <Card elevation={0} sx={{ height: '100%', minHeight: 420, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2, background: `${adminTheme.primary.main}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShowChartIcon sx={{ color: adminTheme.primary.main }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Revenue Growth</Typography>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Monthly recurring revenue trend</Typography>
            </Box>
          </Stack>
        }
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label="Last 6 Months" size="small" sx={{ backgroundColor: `${adminTheme.primary.main}12`, color: adminTheme.primary.main, fontWeight: 600, fontSize: '0.75rem' }} />
            <IconButton size="small"><MoreVertIcon sx={{ color: '#9CA3AF' }} /></IconButton>
          </Stack>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0, height: 'calc(100% - 88px)' }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#FAFBFC', borderRadius: 2, border: '1px solid #E5E7EB' }}>
          <Stack direction="row" sx={{ flex: 1, gap: 2 }}>
            <Stack justifyContent="space-between" sx={{ py: 1 }}>
              {['₹100K', '₹75K', '₹50K', '₹25K', '₹0'].map((label) => (
                <Typography key={label} variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.7rem', minWidth: 40 }}>{label}</Typography>
              ))}
            </Stack>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-around" sx={{ flex: 1 }}>
              {data.map((d, index) => (
                <Tooltip key={index} title={`₹${d.value.toLocaleString()}`} arrow placement="top">
                  <Box sx={{ width: { xs: 36, sm: 48, md: 56 }, height: `${(d.value / maxRevenue) * 100}%`, minHeight: 20, background: index === data.length - 1 ? adminTheme.primary.gradient : adminTheme.primary.light, borderRadius: '8px 8px 4px 4px', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', '&:hover': { transform: 'scaleY(1.03)', filter: 'brightness(1.1)' } }} />
                </Tooltip>
              ))}
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-around" sx={{ mt: 2, ml: 6 }}>
            {data.map((d, index) => (
              <Typography key={index} variant="caption" sx={{ color: index === data.length - 1 ? adminTheme.primary.main : '#6B7280', fontWeight: index === data.length - 1 ? 700 : 500 }}>{d.month}</Typography>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}