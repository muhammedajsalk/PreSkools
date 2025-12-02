'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <LockIcon sx={{ fontSize: 80, color: '#F56565', mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          You do not have permission to view this page. If you believe this is an error, please contact support.
        </Typography>
        <Button variant="contained" component={Link} href="/login">
          Back to Login
        </Button>
      </Box>
    </Container>
  );
}