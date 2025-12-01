'use client';
import React from 'react';
import { Card, CardContent, Box, Typography, Stack, LinearProgress } from '@mui/material';
import DnsIcon from '@mui/icons-material/Dns';
import { adminTheme, ServerMetric } from './AdminConfig';

const MetricBar = ({ metric }: { metric: ServerMetric }) => {
    const color = metric.status === 'healthy' ? adminTheme.status.success : metric.status === 'warning' ? adminTheme.status.warning : adminTheme.status.error;
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ color: '#6B7280' }}>{metric.icon}</Box>
                    <Typography variant="body2" sx={{ color: '#4B5563', fontWeight: 600 }}>{metric.name}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color, fontWeight: 700 }}>{metric.value}%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={metric.value} sx={{ height: 8, borderRadius: 4, backgroundColor: '#E5E7EB', '& .MuiLinearProgress-bar': { backgroundColor: color, borderRadius: 4 } }} />
        </Box>
    );
};

export default function ServerHealth({ metrics }: { metrics: ServerMetric[] }) {
    return (
        <Card elevation={0} sx={{ mb: 4, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box sx={{ width: 36, height: 36, borderRadius: 2, background: `${adminTheme.status.info}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <DnsIcon sx={{ color: adminTheme.status.info, fontSize: 20 }} />
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Server Performance</Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: '#6B7280', backgroundColor: '#F3F4F6', px: 2, py: 0.5, borderRadius: 1 }}>Last updated: Just now</Typography>
                </Stack>

                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
                    {metrics.map((metric, index) => (
                        <Box 
                            key={index} 
                            sx={{ 
                                px: 2, 
                                mb: { xs: 3, md: 0 },
                                width: { xs: '100%', sm: '50%', md: '25%' } 
                            }}
                        >
                            <MetricBar metric={metric} />
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}