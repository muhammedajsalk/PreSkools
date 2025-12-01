'use client';
import React from 'react';
import { Card, CardHeader, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Stack, Button, Chip, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { adminTheme, SchoolOnboarding } from './AdminConfig';

const PlanChip = ({ plan }: { plan: string }) => {
  const config = plan === 'Bloom' ? { color: '#7C3AED', bg: '#EDE9FE', icon: '🌸' } : plan === 'Sprout' ? { color: '#059669', bg: '#D1FAE5', icon: '🌿' } : { color: '#6B7280', bg: '#F3F4F6', icon: '🌱' };
  return <Chip label={<Stack direction="row" spacing={0.5}><span>{config.icon}</span><span>{plan}</span></Stack>} size="small" sx={{ backgroundColor: config.bg, color: config.color, fontWeight: 600, fontSize: '0.75rem', height: 28 }} />;
};

const StatusChip = ({ status }: { status: string }) => {
  const config = status === 'Active' ? { color: '#059669', bg: '#D1FAE5', dot: '#10B981' } : status === 'Pending' ? { color: '#D97706', bg: '#FEF3C7', dot: '#F59E0B' } : { color: '#DC2626', bg: '#FEE2E2', dot: '#EF4444' };
  return <Chip label={<Stack direction="row" alignItems="center" spacing={0.75}><Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: config.dot }} /><span>{status}</span></Stack>} size="small" sx={{ backgroundColor: config.bg, color: config.color, fontWeight: 600, fontSize: '0.75rem', height: 28 }} />;
};

export default function OnboardingTable({ schools }: { schools: SchoolOnboarding[] }) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)', overflow: 'hidden' }}>
      <CardHeader title={<Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ width: 40, height: 40, borderRadius: 2, background: `${adminTheme.primary.main}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SchoolIcon sx={{ color: adminTheme.primary.main }} /></Box><Box><Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Recent Onboardings</Typography></Box></Stack>} action={<Button size="small" sx={{ fontWeight: 600, color: adminTheme.primary.main }}>View All Schools →</Button>} sx={{ backgroundColor: '#FAFBFC', borderBottom: '1px solid #E5E7EB' }} />
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F9FAFB', '& th': { fontWeight: 700, color: '#374151', fontSize: '0.75rem', textTransform: 'uppercase' } }}>
              <TableCell>School Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Admin Phone</TableCell>
              <TableCell align="center">Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.map((school) => (
              <TableRow key={school.id} sx={{ '&:hover': { backgroundColor: '#F9FAFB' } }}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 44, height: 44, background: adminTheme.primary.gradient, fontWeight: 700, fontSize: '0.9rem' }}>{school.schoolName.slice(0, 2).toUpperCase()}</Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{school.schoolName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell><Typography variant="body2" sx={{ color: '#6B7280' }}>{school.city}</Typography></TableCell>
                <TableCell><PlanChip plan={school.plan} /></TableCell>
                <TableCell><Typography variant="body2" sx={{ color: '#4B5563', fontFamily: 'monospace' }}>{school.adminPhone}</Typography></TableCell>
                <TableCell align="center"><Chip label={school.studentsCount} size="small" sx={{ backgroundColor: '#F3F4F6' }} /></TableCell>
                <TableCell><StatusChip status={school.status} /></TableCell>
                <TableCell><Typography variant="body2" sx={{ color: '#6B7280' }}>{school.joinedDate}</Typography></TableCell>
                <TableCell align="center"><Button variant="outlined" size="small" sx={{ textTransform: 'none', fontSize: '0.8rem', borderRadius: 2 }}>Manage</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}