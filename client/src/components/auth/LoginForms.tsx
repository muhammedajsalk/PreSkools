import React from 'react';
import { TextField, Button, Stack, CircularProgress, InputAdornment, Box, Typography, Link, Alert } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { themeColors } from "./LoginBranding";

// --- Form 1: Phone Input ---
export interface PhoneFormProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const PhoneForm = ({ value, onChange, onSubmit, isLoading }: PhoneFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={3}>
      <TextField
        fullWidth 
        label="Mobile Number" 
        placeholder="Enter 10-digit number"
        value={value} 
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        
        // FIX: Tell React to ignore extension attributes
        inputProps={{
            autoComplete: 'off',
            suppressHydrationWarning: true 
        }}
        
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box sx={{ display: "flex", gap: 1, pr: 1.5, borderRight: "1px solid #E5E7EB" }}>
                <PhoneAndroidIcon sx={{ color: themeColors.primary.main }} />
                <Typography sx={{ fontWeight: 600 }}>+91</Typography>
              </Box>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading || value.length !== 10}
        sx={{ py: 1.75, borderRadius: 2.5, backgroundColor: themeColors.primary.main, "&:hover": { backgroundColor: themeColors.primary.dark } }}>
        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Send OTP"}
      </Button>
    </Stack>
  </form>
);

// --- Form 2: OTP Input ---
export interface OtpFormProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const OtpForm = ({ value, onChange, onSubmit, onBack, isLoading }: OtpFormProps) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={3}>
      <TextField
        fullWidth label="One-Time Password" placeholder="• • • • • •"
        value={value} onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
        inputProps={{ maxLength: 6, style: { letterSpacing: "0.75em", textAlign: "center", fontWeight: 700 } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: themeColors.primary.main }} /></InputAdornment> }}
      />
      <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading || value.length !== 6}
        sx={{ py: 1.75, borderRadius: 2.5, backgroundColor: themeColors.primary.main, "&:hover": { backgroundColor: themeColors.primary.dark } }}>
        {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Verify & Continue"}
      </Button>
      
      <Box sx={{ textAlign: "center" }}>
        <Link component="button" type="button" onClick={onBack} underline="none" sx={{ color: themeColors.primary.main, display: "inline-flex", alignItems: "center", gap: 0.5 }}>
          <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to edit number
        </Link>
      </Box>
    </Stack>
  </form>
);

// --- Form 3: Password Input (ADDED THIS) ---
export interface PasswordFormProps {
  onLogin: (password: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ onLogin, isLoading, error }) => {
  const [password, setPassword] = React.useState('');
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onLogin(password); };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
        
        <TextField
          label="Administrator Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          InputProps={{ startAdornment: (<InputAdornment position="start"><LockOutlinedIcon sx={{ color: themeColors.primary.main }} /></InputAdornment>) }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
        />

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}
          sx={{ py: 1.75, borderRadius: 2.5, bgcolor: themeColors.primary.main, '&:hover': { bgcolor: themeColors.primary.dark } }}>
          {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify & Log In'}
        </Button>
      </Stack>
    </form>
  );
};