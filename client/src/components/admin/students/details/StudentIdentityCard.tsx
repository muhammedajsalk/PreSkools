'use client';
import React from 'react';
import { Card, CardContent, Avatar, Typography, Chip, Divider, Box, Stack, FormControlLabel, Switch, Button, alpha } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StudentProfile, COLORS, formatDate, getStudentStatusColor } from './StudentDetailsConfig';

interface Props { student: StudentProfile; onStatusChange: (active: boolean) => void; onEdit: () => void; onDelete: () => void; isUpdating: boolean; }

export default function StudentIdentityCard({ student, onStatusChange, onEdit, onDelete, isUpdating }: Props) {
  const fullName = `${student.firstName} ${student.lastName}`;
  const initials = `${student.firstName[0]}${student.lastName[0]}`;

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', position: 'sticky', top: 24 }}>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Avatar src={student.avatar} alt={fullName} sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: COLORS.primary, fontSize: '2.5rem', fontWeight: 600, border: `4px solid ${COLORS.primaryLight}` }}>{initials}</Avatar>
        <Typography variant="h5" fontWeight={600} gutterBottom>{fullName}</Typography>
        <Chip icon={<BadgeIcon sx={{ fontSize: 18 }} />} label={student.admissionNo} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 500, mb: 2 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{student.className} - Section {student.section}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Roll No: {student.rollNo}</Typography>
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Student Status</Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <FormControlLabel control={<Switch checked={student.status === 'active'} onChange={(e) => onStatusChange(e.target.checked)} disabled={isUpdating} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: COLORS.primary, '&:hover': { backgroundColor: alpha(COLORS.primary, 0.08) } }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: COLORS.primary } }} />} label="" />
            <Chip label={student.status.charAt(0).toUpperCase() + student.status.slice(1)} size="small" color={getStudentStatusColor(student.status)} variant="filled" />
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5} sx={{ mb: 3, textAlign: 'left', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><CalendarTodayIcon sx={{ fontSize: 20, color: 'text.secondary' }} /><Typography variant="body2" color="text.secondary">DOB: {formatDate(student.dateOfBirth)}</Typography></Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocalHospitalIcon sx={{ fontSize: 20, color: COLORS.error }} /><Typography variant="body2" color="text.secondary">Blood Group: {student.bloodGroup}</Typography></Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><SchoolIcon sx={{ fontSize: 20, color: COLORS.primary }} /><Typography variant="body2" color="text.secondary">Joined: {formatDate(student.admissionDate)}</Typography></Box>
        </Stack>

        <Stack spacing={1.5}>
          <Button variant="contained" startIcon={<EditIcon />} onClick={onEdit} fullWidth sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark }, textTransform: 'none', fontWeight: 600, py: 1.2, borderRadius: 2 }}>Edit Profile</Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete} fullWidth color="error" sx={{ textTransform: 'none', fontWeight: 600, py: 1.2, borderRadius: 2 }}>Delete Student</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}