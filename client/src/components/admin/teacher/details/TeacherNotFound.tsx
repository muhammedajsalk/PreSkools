'use client';
import React from 'react';
import { Box, Paper, Avatar, Typography, Stack, Button } from '@mui/material';
import { PersonOff, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { COLORS } from './TeacherDetailsConfig';

export default function TeacherNotFound() {
  const router = useRouter();
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 4, border: '2px dashed', borderColor: COLORS.errorLight }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: COLORS.errorLight, color: COLORS.error, mx: 'auto', mb: 3 }}><PersonOff sx={{ fontSize: 50 }} /></Avatar>
        <Typography variant="h4" fontWeight={700} color="error.main" gutterBottom>Teacher Not Found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>We couldn't find a teacher with the specified ID.</Typography>
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ bgcolor: COLORS.teal }}>Go Back</Button>
      </Paper>
    </Box>
  );
}