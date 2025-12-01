'use client';
import React from 'react';
import { Box, Typography, TextField, Stack, InputAdornment, Fade } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { FormData, FormErrors, adminTheme } from './SchoolConfig';

interface Props {
  formData: FormData;
  handleChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

export default function Step1SchoolDetails({ formData, handleChange, errors }: Props) {
  const commonInputStyles = { '& .MuiOutlinedInput-root': { borderRadius: 2.5, backgroundColor: '#F9FAFB', transition: 'all 0.2s ease', '&:hover': { backgroundColor: '#F3F4F6' }, '&.Mui-focused': { backgroundColor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: adminTheme.primary.main, borderWidth: 2 } } } };

  return (
    <Fade in timeout={500}>
      <Stack spacing={3.5}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: adminTheme.background.dark }}>Tell us about the school</Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Enter the basic details of the school you're onboarding.</Typography>
        </Box>

        <TextField label="School Name" placeholder="e.g., Little Stars Academy" value={formData.name} onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} fullWidth autoFocus InputProps={{ startAdornment: (<InputAdornment position="start"><SchoolIcon sx={{ color: adminTheme.primary.main }} /></InputAdornment>) }} sx={commonInputStyles} />

        <TextField label="Full Address" placeholder="e.g., 123, Green Valley Road" value={formData.address} onChange={handleChange('address')} error={!!errors.address} helperText={errors.address} fullWidth multiline rows={2} InputProps={{ startAdornment: (<InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><LocationOnIcon sx={{ color: adminTheme.primary.main }} /></InputAdornment>) }} sx={commonInputStyles} />

        <TextField label="City" placeholder="e.g., Mumbai" value={formData.city} onChange={handleChange('city')} error={!!errors.city} helperText={errors.city} fullWidth InputProps={{ startAdornment: (<InputAdornment position="start"><LocationCityIcon sx={{ color: adminTheme.primary.main }} /></InputAdornment>) }} sx={commonInputStyles} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <TextField label="Contact Email" placeholder="admin@school.com" value={formData.email} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} fullWidth InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: adminTheme.primary.main }} /></InputAdornment>) }} sx={commonInputStyles} />
          <TextField label="Contact Phone" placeholder="9876543210" value={formData.phone} onChange={handleChange('phone')} error={!!errors.phone} helperText={errors.phone} fullWidth InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon sx={{ color: adminTheme.primary.main }} /><Typography sx={{ ml: 1, mr: 0.5, fontWeight: 600 }}>+91</Typography></InputAdornment>) }} sx={commonInputStyles} />
        </Stack>
      </Stack>
    </Fade>
  );
}