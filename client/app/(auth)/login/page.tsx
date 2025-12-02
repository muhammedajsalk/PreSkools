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
import { toast } from 'sonner';

// --- Form Definitions (Needs to be separate file in production, defined here for demo) ---
const themeColors = { primary: '#4DB6AC', primaryDark: '#00897B', secondary: '#FF9800', sentBubble: '#4DB6AC' };


// --------------------------------------------------------------------------------------


export default function LoginPage() {
  const router = useRouter();
  
  const [stage, setStage] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [firebaseToken, setFirebaseToken] = useState(''); 
  const [adminRole, setAdminRole] = useState(''); 

  const [loginApi, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible', callback: () => {} });
    }
  }, []);

  // --- Server Logic ---
  const handleServerLogin = async (token: string, password?: string) => {
    setError(null);
    
    // 2. Show Loading Toast
    const toastId = toast.loading('Verifying credentials...');

    try {
      const response = await loginApi({ token, stepTwoPassword: password }).unwrap();
      
      // Check for MFA requirement
      if (response.step === 2) {
        toast.dismiss(toastId); // Dismiss loading
        setAdminRole(response.role);
        setStage(3); // Go to Password Stage
        toast.info('Admin Access Detected: Please enter password');
        return;
      }

      // Final Success
      localStorage.setItem('token', response.token as string);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // 3. Success Toast
      toast.success('Login Successful!', { id: toastId });
      
      // Redirect
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
      // 4. Error Toast
      toast.error(serverMessage, { id: toastId });
    }
  };

  // --- Step 1 Handlers ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit number");
      return;
    }

    setError(null);
    const toastId = toast.loading('Sending OTP...');

    try {
        const appVerifier = window.recaptchaVerifier;
        const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
        setConfirmationResult(result); 
        setStage(2); 
        toast.success('OTP Sent!', { id: toastId });
    } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Failed to send OTP", { id: toastId });
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
        const userCredential = await confirmationResult!.confirm(otp);
        const token = await userCredential.user.getIdToken();
        setFirebaseToken(token); 
        handleServerLogin(token); 
    } catch (err: any) {
        console.error(err);
        toast.error("Invalid OTP. Please try again.");
    }
  };

  // --- Step 2 Handler (Password) ---
  const handlePasswordLogin = (password: string) => {
    handleServerLogin(firebaseToken, password);
  };
  
  // ... render logic (same as before) ...
  const renderForm = () => {
    if (stage === 1) return <PhoneForm value={phoneNumber} onChange={setPhoneNumber} onSubmit={handleSendOtp} isLoading={isLoading} />;
    if (stage === 2) return <OtpForm value={otp} onChange={setOtp} onSubmit={handleVerifyOtp} onBack={() => setStage(1)} isLoading={isLoading} />;
    if (stage === 3) return <PasswordForm onLogin={handlePasswordLogin} isLoading={isLoading} error={error} />;
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

            {/* Keeping inline alert for persistent errors, but Toast handles the popup */}
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