'use client';
import React from 'react';
import { Card, Box, Avatar, Typography, Stack, Chip, Divider, Button, CardContent, alpha } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { COLORS, StudentProfile, getAvatarColor, getInitials, formatPhone } from './ProfileConfig';
import CircularProgressWithLabel from './CircularProgressLabel';

export default function ProfileCard({ student, onEdit }: { student: StudentProfile; onEdit: () => void }) {
  const primaryGuardian = student.guardians.find((g) => g.isPrimaryContact);

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ height: 80, background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)` }} />
      <Box sx={{ px: 3, pb: 3, mt: -6 }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: getAvatarColor(student.name), fontSize: '2.5rem', fontWeight: 600, border: '4px solid white', boxShadow: 2, mb: 2 }}>
          {getInitials(student.name)}
        </Avatar>
        <Typography variant="h5" fontWeight={700} gutterBottom>{student.name}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Chip label={student.admissionNo} size="small" sx={{ bgcolor: alpha(COLORS.textSecondary, 0.1), fontFamily: 'monospace', fontWeight: 600 }} />
          <Chip label={student.status.toUpperCase()} size="small" sx={{ bgcolor: COLORS.successLight, color: COLORS.success, fontWeight: 600 }} />
        </Stack>
        <Chip icon={<SchoolIcon />} label={`${student.className}-${student.section}`} sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 600 }} />
        
        <Divider sx={{ my: 2.5 }} />
        
        <Stack spacing={1.5}>
          <Button fullWidth variant="outlined" startIcon={<PhoneIcon />} href={`tel:${formatPhone(primaryGuardian?.phone || '')}`} sx={{ borderColor: COLORS.primary, color: COLORS.primary }}>Call Parent</Button>
          <Button fullWidth variant="contained" startIcon={<WhatsAppIcon />} href={`https://wa.me/${formatPhone(primaryGuardian?.phone || '')}`} target="_blank" sx={{ bgcolor: COLORS.whatsapp, '&:hover': { bgcolor: '#1DA851' } }}>WhatsApp</Button>
          <Button fullWidth variant="outlined" startIcon={<EditIcon />} onClick={onEdit} sx={{ borderColor: COLORS.secondary, color: COLORS.secondary }}>Edit Profile</Button>
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack spacing={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom display="block">ATTENDANCE</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}><CircularProgressWithLabel value={student.attendancePercentage} /></Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom display="block">FEES STATUS</Typography>
            <Card elevation={0} sx={{ p: 2, bgcolor: student.feesDue > 0 ? alpha(COLORS.error, 0.05) : alpha(COLORS.success, 0.05), border: '1px solid', borderColor: student.feesDue > 0 ? alpha(COLORS.error, 0.2) : alpha(COLORS.success, 0.2), borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}><AttachMoneyIcon sx={{ color: student.feesDue > 0 ? COLORS.error : COLORS.success }} /><Typography variant="body2" fontWeight={500}>{student.feesDue > 0 ? 'Due Amount' : 'All Paid'}</Typography></Stack>
                {student.feesDue > 0 && <Typography variant="h6" fontWeight={700} color={COLORS.error}>₹{student.feesDue.toLocaleString()}</Typography>}
              </Stack>
            </Card>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}