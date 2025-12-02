'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, TextField, Button, CircularProgress, Alert, Paper, InputAdornment, Link, Container } from '@mui/material';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/src/lib/firebase'; // Assumes you have client firebase config
import { useLoginMutation } from '@/src/store/api/authApiSlice'; // RTK Query hook
import LoginBranding from '@/src/components/auth/LoginBranding'; // Reusing your visual components
import { PhoneForm, OtpForm, PasswordForm } from '@/src/components/auth/LoginForms'; // Reusing your forms
import { getInitials } from '@/src/components/parents/ParentConfig'; // Reusing helpers
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { alpha } from '@mui/material/styles';

// --- Form Definitions (Needs to be separate file in production, defined here for demo) ---
const themeColors = { primary: '#4DB6AC', primaryDark: '#00897B', secondary: '#FF9800', sentBubble: '#4DB6AC' };


// --------------------------------------------------------------------------------------


export default function LoginPage() {
  const router = useRouter();

  // Stages: 1=Phone Input, 2=OTP Input, 3=Password Input (MFA)
  const [stage, setStage] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Data Storage
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [firebaseToken, setFirebaseToken] = useState(''); // Stores token for Step 2 submission
  const [adminRole, setAdminRole] = useState(''); // Stores role from Step 1 response

  const [loginApi, { isLoading }] = useLoginMutation();

  // --- Recaptcha Setup (Standard) ---
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible', callback: () => { } });
    }
  }, []);

  // --- Server Logic ---
  const handleServerLogin = async (token: string, password?: string) => {
    setError(null);

    try {
      // 1. Send token (and password if Step 2) to backend
      const response = await loginApi({ token, stepTwoPassword: password }).unwrap();

      // 2. Check for MFA requirement (Backend returns { step: 2 })
      if (response.step === 2) {
        setAdminRole(response.role);
        setStage(3); // Go to Password Stage
        return;
      }

      // 3. Final Success (Non-admin or successful password check)
      localStorage.setItem('token', response.token as string);
      localStorage.setItem('user', JSON.stringify(response.user));
      alert('Login Successful!');

      // Redirect based on role (simple redirect logic)
      if (response.user.role.includes('SUPER_ADMIN')) {
        router.push('/admin/dashboard');
      } else if (response.user.role.includes('SCHOOL_ADMIN')) {
        router.push('/schoolAdmin/dashboard');
      } else if (response.user.role.includes('TEACHER')) {
        router.push('/teacher/dashboard');
      } else {
        router.push('/parent/dashboard');
      }

    } catch (err: any) {
      const serverMessage = err.data?.message || 'Login failed due to network error.';
      setError(serverMessage);
    }
  };

  // --- Step 1 Handlers ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // <--- THIS STOPS THE PAGE REFRESH

    if (!phoneNumber || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit number");
      return;
    }

    setError(null);

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setConfirmationResult(result);
      setStage(2); // Go to OTP Input
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // <--- THIS STOPS THE PAGE REFRESH ALSO

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const userCredential = await confirmationResult!.confirm(otp);
      const token = await userCredential.user.getIdToken();
      setFirebaseToken(token); // Store token for next step

      // Go directly to Step 1 server check
      handleServerLogin(token);
    } catch (err: any) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    }
  };

  // --- Step 2 Handler (Password) ---
  const handlePasswordLogin = (password: string) => {
    handleServerLogin(firebaseToken, password);
  };

  // --- Render Switcher ---
  const renderForm = () => {
    if (stage === 1) {
      return <PhoneForm value={phoneNumber} onChange={setPhoneNumber} onSubmit={handleSendOtp} isLoading={isLoading} />;
    }
    if (stage === 2) {
      return <OtpForm value={otp} onChange={setOtp} onSubmit={handleVerifyOtp} onBack={() => setStage(1)} isLoading={isLoading} />;
    }
    if (stage === 3) {
      return <PasswordForm onLogin={handlePasswordLogin} isLoading={isLoading} error={error} />;
    }
    return null;
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <LoginBranding />
      <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Container maxWidth="sm">
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
            <div id="recaptcha-container" />

            <Box className="mb-6">
              <Typography variant="h5" fontWeight={700} mb={1}>{stage === 3 ? `Welcome, ${adminRole}!` : 'Welcome Back!'}</Typography>
              <Typography variant="body1" color="text.secondary">{stage === 3 ? 'Enter your Admin Password to continue.' : 'Sign in via phone number'}</Typography>
            </Box>

            {/* Show error only in Step 1/2 */}
            {stage !== 3 && error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {renderForm()}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

// Add TypeScript support for window.recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: any;
    grecaptcha: any;
  }
}