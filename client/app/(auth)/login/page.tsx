"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Box, Container, Paper, Alert } from "@mui/material";
import LoginBranding from "../../../src/components/auth/LoginBranding";
import { PhoneForm, OtpForm } from "../../../src/components/auth/LoginForms";
import { auth } from "../../../src/lib/firebase"; 
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);


  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          
        },
      });
    }
  }, []);


  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) return setError("Invalid phone number");
    
    setIsLoading(true);
    setError(null);

    try {
      const appVerifier = window.recaptchaVerifier;
      const formattedNumber = `+91${phoneNumber}`; 

      const result = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send OTP. Try again.");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId: any) => {
          window.grecaptcha.reset(widgetId);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return setError("Invalid OTP");
    
    setIsLoading(true);
    setError(null);

    try {
      if (!confirmationResult) throw new Error("Session expired. Please retry.");

      const userCredential = await confirmationResult.confirm(otp);
      const firebaseUser = userCredential.user;
      
      const token = await firebaseUser.getIdToken();

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        token: token
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      alert("Login Successful!");
      router.push("/dashboard"); 

    } catch (err: any) {
      console.error("Login Error:", err);

      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message || err.response?.data?.error;
        setError(serverMessage || "Server connection failed.");
      } else {
        setError(err.message || "Invalid OTP or Unknown Error.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: { xs: "column", md: "row" }, backgroundColor: "#F5F7FA" }}>
      <LoginBranding />

      <Box sx={{ width: { xs: "100%", md: "50%" }, display: "flex", alignItems: "center", justifyContent: "center", p: 4 }}>
        <Container maxWidth="sm">
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, backgroundColor: "white" }}>
            
            <div id="recaptcha-container"></div>

            <Box className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{step === "phone" ? "Welcome Back!" : "Verify OTP"}</h2>
              <p className="text-gray-500">
                {step === "phone" ? "Sign in via SMS" : `Code sent to +91 ${phoneNumber}`}
              </p>
            </Box>

            {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>{error}</Alert>}

            {step === "phone" ? (
              <PhoneForm value={phoneNumber} onChange={setPhoneNumber} onSubmit={handleSendOtp} isLoading={isLoading} />
            ) : (
              <OtpForm value={otp} onChange={setOtp} onSubmit={handleVerifyOtp} onBack={() => setStep("phone")} isLoading={isLoading} />
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

declare global {
  interface Window {
    recaptchaVerifier: any;
    grecaptcha: any;
  }
}