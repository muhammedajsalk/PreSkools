'use client';
import React from 'react';
import { Card, CardContent, Box, Avatar, Typography, Chip, Divider, Stack, Button, Tooltip } from '@mui/material';
import { CheckCircle, Warning, Class, Phone, Email, WhatsApp, Edit } from '@mui/icons-material';
import { Teacher, COLORS, getAvatarColor, getInitials, formatPhoneDisplay, getWhatsAppLink } from './TeacherDetailsConfig';

interface Props { teacher: Teacher; onEdit: () => void; }

const ContactAction = ({ icon, label, href, color, bgColor, hoverColor }: any) => (
  <Button component="a" href={href} target={href.startsWith('http') ? '_blank' : undefined} startIcon={icon} fullWidth sx={{ bgcolor: bgColor, color: color, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600, justifyContent: 'center', transition: 'all 0.2s', '&:hover': { bgcolor: hoverColor, transform: 'translateY(-2px)', boxShadow: `0 4px 12px ${color}33` } }}>{label}</Button>
);

export default function TeacherIdentityCard({ teacher, onEdit }: Props) {
  return (
    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'visible', position: 'sticky', top: 24 }}>
      <Box sx={{ height: 100, background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.tealDark} 100%)`, borderRadius: '16px 16px 0 0', position: 'relative' }}>
        <Chip size="small" icon={teacher.isActive ? <CheckCircle sx={{ fontSize: '16px !important' }} /> : <Warning sx={{ fontSize: '16px !important' }} />} label={teacher.isActive ? 'Active' : 'Inactive'} sx={{ position: 'absolute', top: 16, right: 16, bgcolor: teacher.isActive ? COLORS.successLight : COLORS.errorLight, color: teacher.isActive ? '#2E7D32' : COLORS.error, fontWeight: 700, fontSize: '0.75rem', '& .MuiChip-icon': { color: 'inherit' } }} />
      </Box>

      <CardContent sx={{ pt: 0, px: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: -6 }}>
          <Avatar src={teacher.avatar} sx={{ width: 120, height: 120, bgcolor: getAvatarColor(teacher.fullName), fontSize: '2.5rem', fontWeight: 700, border: '5px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>{getInitials(teacher.fullName)}</Avatar>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>{teacher.fullName}</Typography>
          <Chip size="medium" icon={teacher.classAssigned ? <Class sx={{ fontSize: '18px !important' }} /> : <Warning sx={{ fontSize: '18px !important' }} />} label={teacher.classAssigned ? `Class Teacher - ${teacher.classAssigned}` : 'Unassigned'} sx={{ bgcolor: teacher.classAssigned ? COLORS.tealLight : COLORS.orangeLight, color: teacher.classAssigned ? COLORS.tealDark : COLORS.orangeDark, fontWeight: 600, px: 1, '& .MuiChip-icon': { color: 'inherit' } }} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <ContactAction icon={<Phone />} label={`Call ${formatPhoneDisplay(teacher.phone)}`} href={`tel:+91${teacher.phone}`} color={COLORS.tealDark} bgColor={COLORS.tealLighter} hoverColor={COLORS.tealLight} />
          <ContactAction icon={<Email />} label="Send Email" href={`mailto:${teacher.email}`} color={COLORS.purple} bgColor={COLORS.purpleLight} hoverColor="#D1C4E9" />
          <ContactAction icon={<WhatsApp />} label="WhatsApp" href={getWhatsAppLink(teacher.phone)} color="#25D366" bgColor="#E8F5E9" hoverColor="#C8E6C9" />
        </Stack>

        <Button variant="contained" size="large" fullWidth startIcon={<Edit />} onClick={onEdit} sx={{ bgcolor: COLORS.orange, py: 1.75, borderRadius: 2.5, textTransform: 'none', fontWeight: 700, fontSize: '1rem', boxShadow: `0 6px 20px ${COLORS.orange}55`, '&:hover': { bgcolor: COLORS.orangeDark, boxShadow: `0 8px 25px ${COLORS.orange}77`, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}>Edit Profile</Button>
      </CardContent>
    </Card>
  );
}