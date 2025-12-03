'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Stack, Card, CardContent, Button, Typography, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'sonner';
import { useCreateSchoolMutation } from '@/src/store/api/schoolApiSlice';

// Import Components
import { adminTheme, FormData, FormErrors, PlanType, steps } from '../../../../../src/components/admin/schools/add/SchoolConfig';
import SchoolStepper from '../../../../../src/components/admin/schools/add/SchoolStepper';
import Step1SchoolDetails from '../../../../../src/components/admin/schools/add/Step1SchoolDetails';
import Step2PlanSelection from '../../../../../src/components/admin/schools/add/Step2PlanSelection';
import Step3AdminAssign from '../../../../../src/components/admin/schools/add/Step3AdminAssign'; // (I assume you will create this similarly or I can provide)

export default function AddSchoolPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ name: '', address: '', city: '', email: '', phone: '', plan: null, admin_phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [createSchool, { isLoading }] = useCreateSchoolMutation();

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (field === 'phone' || field === 'admin_phone') value = value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePlanSelect = (plan: PlanType) => {
    setFormData((prev) => ({ ...prev, plan }));
    if (errors.plan) setErrors((prev) => ({ ...prev, plan: undefined }));
  };

  const validateStep = () => {
    const newErrors: FormErrors = {};
    if (activeStep === 0) {
      if (!formData.name.trim()) newErrors.name = 'Required';
      if (!formData.address.trim()) newErrors.address = 'Required';
      if (!formData.city.trim()) newErrors.city = 'Required';
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email required';
      if (formData.phone.length !== 10) newErrors.phone = '10 digits required';
    } else if (activeStep === 1) {
      if (!formData.plan) newErrors.plan = 'Select a plan';
    } else if (activeStep === 2) {
      if (formData.admin_phone.length !== 10) newErrors.admin_phone = '10 digits required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Show loading toast
    const toastId = toast.loading('Creating School...');

    try {
      const payload = {
        ...formData,
        address: `${formData.address}, ${formData.city}`,
        plan: formData.plan as "SEED" | "SPROUT" | "BLOOM" // Type assertion
      };

      // Call the API
      await createSchool(payload).unwrap();

      // Success!
      toast.success('School onboarded successfully! 🎉', { id: toastId });

      // Redirect
      setTimeout(() => router.push('/admin/dashboard'), 1500);

    } catch (error: any) {
      // Error Handling
      console.error(error);
      const errMsg = error?.data?.message || 'Failed to create school. Please try again.';
      toast.error(errMsg, { id: toastId });
    }
  };

  const handleNext = () => {
    if (validateStep()) activeStep === steps.length - 1 ? handleSubmit() : setActiveStep((p) => p + 1);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: adminTheme.background.default, py: 5, px: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4, maxWidth: 1000, mx: 'auto' }}>
        <IconButton onClick={() => router.back()} sx={{ bgcolor: 'white' }}><ArrowBackIcon /></IconButton>
        <Box><Typography variant="h5" sx={{ fontWeight: 800 }}>Add New School</Typography></Box>
      </Stack>

      <Card elevation={0} sx={{ maxWidth: 1000, mx: 'auto', borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <SchoolStepper activeStep={activeStep} />

        <CardContent sx={{ p: 5, minHeight: 400 }}>
          {activeStep === 0 && <Step1SchoolDetails formData={formData} handleChange={handleChange} errors={errors} />}
          {activeStep === 1 && <Step2PlanSelection selectedPlan={formData.plan} onSelect={handlePlanSelect} error={errors.plan} setError={setErrors} />}
          {activeStep === 2 && <Step3AdminAssign formData={formData} handleChange={handleChange} error={errors.admin_phone} />}
        </CardContent>

        <Box sx={{ p: 3, borderTop: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="outlined" onClick={() => setActiveStep((p) => p - 1)} disabled={activeStep === 0 || isSubmitting} startIcon={<ArrowBackIcon />}>Back</Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : activeStep === steps.length - 1 ? <CheckCircleIcon /> : <ArrowForwardIcon />}
              sx={{ background: adminTheme.primary.gradient }}
            >
              {isLoading ? 'Submitting...' : activeStep === steps.length - 1 ? 'Complete' : 'Continue'}
            </Button>
          </Stack>
        </Box>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert severity={snackbar.severity}>{snackbar.message}</Alert></Snackbar>
    </Box>
  );
}