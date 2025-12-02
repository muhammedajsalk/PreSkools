import React from 'react';
import { Stack, Box, Card, CardContent, Avatar, Chip, Typography, Button, Link, alpha } from '@mui/material';
import { Person as PersonIcon, Phone as PhoneIcon, Email as EmailIcon, Work as WorkIcon, EscalatorWarning as EscalatorWarningIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { COLORS, StudentProfile, getAvatarColor, getInitials, formatPhone } from './ProfileConfig';

export default function GuardianTab({ guardians }: { guardians: StudentProfile['guardians'] }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      {guardians.map((g) => (
        <Box key={g.id} sx={{ flex: 1 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 2, height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: getAvatarColor(g.name), fontSize: '1.2rem' }}>{getInitials(g.name)}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={0.5}><Typography variant="subtitle1" fontWeight={600}>{g.name}</Typography>{g.isPrimaryContact && <Chip label="Primary" size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primary, fontWeight: 600, height: 20, fontSize: '0.65rem' }} />}</Stack>
                  <Chip icon={<PersonIcon />} label={g.relationship} size="small" sx={{ mb: 2 }} />
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.5} alignItems="center"><PhoneIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /><Link href={`tel:${formatPhone(g.phone)}`} sx={{ textDecoration: 'none', color: COLORS.primary }}>{g.phone}</Link></Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center"><EmailIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /><Typography variant="body2" color="text.secondary">{g.email}</Typography></Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center"><WorkIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /><Box><Typography variant="body2">{g.occupation}</Typography><Typography variant="caption" color="text.secondary">{g.workplace}</Typography></Box></Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button size="small" variant="outlined" startIcon={<PhoneIcon />} href={`tel:${formatPhone(g.phone)}`}>Call</Button>
                    <Button size="small" variant="contained" startIcon={<WhatsAppIcon />} href={`https://wa.me/${formatPhone(g.phone)}`} target="_blank" sx={{ bgcolor: COLORS.whatsapp, '&:hover': { bgcolor: '#1DA851' } }}>WhatsApp</Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Stack>
  );
}