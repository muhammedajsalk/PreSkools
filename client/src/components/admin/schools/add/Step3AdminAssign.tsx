'use client';
import React from 'react';
import { Box, Typography, Stack, TextField, InputAdornment, Paper, Avatar, Divider, Chip, Alert, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SendIcon from '@mui/icons-material/Send';
import { FormData, adminTheme, planOptions } from './SchoolConfig';

interface Props {
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Step3AdminAssign({ formData, handleChange, error }: Props) {
  // Find the full plan object based on the ID selected in Step 2
  const selectedPlan = planOptions.find((p) => p.id === formData.plan);

  return (
    <Fade in timeout={500}>
      <Stack spacing={4}>
        
        {/* --- Section Header --- */}
        <Box sx={{ textAlign: 'center' }}>
          <Avatar sx={{ width: 80, height: 80, backgroundColor: `${adminTheme.primary.main}15`, color: adminTheme.primary.main, mx: 'auto', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, color: adminTheme.background.dark, mb: 0.5 }}>
            Assign School Administrator
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', maxWidth: 450, mx: 'auto' }}>
            Enter the mobile number of the school owner or principal. They will receive an SMS invitation to set up their admin account.
          </Typography>
        </Box>

        {/* --- Admin Phone Input --- */}
        <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
          <TextField
            label="Administrator Phone Number"
            placeholder="9876543210"
            value={formData.admin_phone}
            onChange={handleChange('admin_phone')}
            error={!!error}
            helperText={error || 'This person will manage the school on KinderConnect'}
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: adminTheme.primary.main }} />
                  <Typography sx={{ ml: 1, mr: 0.5, color: '#374151', fontWeight: 600, fontSize: '0.9rem' }}>+91</Typography>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: '#F9FAFB',
                transition: 'all 0.2s ease',
                '&:hover': { backgroundColor: '#F3F4F6' },
                '&.Mui-focused': { backgroundColor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: adminTheme.primary.main, borderWidth: 2 } },
              },
            }}
          />
        </Box>

        {/* --- Onboarding Summary Card --- */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '2px solid #E5E7EB', backgroundColor: '#FAFAFA', maxWidth: 500, mx: 'auto', width: '100%' }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
            <CelebrationIcon sx={{ color: adminTheme.secondary.main }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A2E' }}>Onboarding Summary</Typography>
          </Stack>

          <Stack spacing={2}>
            {/* School Name */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <SchoolIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                <Typography variant="body2" sx={{ color: '#6B7280' }}>School</Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1A1A2E' }}>{formData.name || '-'}</Typography>
            </Stack>

            {/* Location */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationCityIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Location</Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>{formData.city || '-'}</Typography>
            </Stack>

            {/* Contact */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Contact</Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: '0.8rem' }}>{formData.email || '-'}</Typography>
            </Stack>

            <Divider />

            {/* Selected Plan */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <CreditCardIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Plan</Typography>
              </Stack>
              {selectedPlan && (
                <Chip
                  label={<Stack direction="row" alignItems="center" spacing={0.75}><span>{selectedPlan.emoji}</span><span>{selectedPlan.name}</span></Stack>}
                  size="small"
                  sx={{ backgroundColor: selectedPlan.lightColor, color: selectedPlan.color, fontWeight: 700, border: `1px solid ${selectedPlan.borderColor}` }}
                />
              )}
            </Stack>

            {/* Monthly Cost */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ color: '#6B7280' }}>Monthly Cost</Typography>
              <Typography variant="body1" sx={{ fontWeight: 800, color: adminTheme.primary.dark }}>{selectedPlan?.price || '-'}</Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* --- Info Alert --- */}
        <Alert severity="info" icon={<SendIcon />} sx={{ borderRadius: 2, maxWidth: 500, mx: 'auto', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', '& .MuiAlert-icon': { color: '#3B82F6' } }}>
          <Typography variant="body2" sx={{ color: '#1E40AF' }}>
            Upon completion, an SMS will be sent to <strong>+91 {formData.admin_phone || 'XXXXXXXXXX'}</strong> with login instructions.
          </Typography>
        </Alert>

      </Stack>
    </Fade>
  );
}