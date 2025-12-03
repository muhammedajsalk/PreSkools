'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Box, Typography, IconButton, Avatar, InputAdornment, Alert, Fade, CircularProgress } from '@mui/material';
import { PersonAdd, Close, Phone, Email, School, CalendarMonth, Badge } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NewTeacherForm, COLORS } from './TeacherConfig';
import { useCreateTeacherMutation } from '@/src/store/api/teacherApiSlice';
import { toast } from 'sonner';

interface Props { open: boolean; onClose: () => void; } // Removed onSubmit prop as we handle it internally

export default function AddTeacherDialog({ open, onClose }: Props) { // Fixed typo: onCloset -> onClose
    const [form, setForm] = useState<NewTeacherForm>({ fullName: '', phone: '', email: '', qualification: '', joiningDate: null });
    
    const [createTeacher, { isLoading }] = useCreateTeacherMutation();

    const handleSubmit = async () => {
        // 1. Check required fields (including date)
        if (!form.fullName || !form.phone || !form.email || !form.joiningDate) {
            toast.error("Please fill in all required fields");
            return;
        }

        const toastId = toast.loading('Adding Teacher...');

        try {
            await createTeacher({
                fullName: form.fullName,
                phone: form.phone,
                email: form.email,
                qualification: form.qualification,
                joiningDate: form.joiningDate.toISOString() // Safe now because we checked it above
            }).unwrap();

            toast.success('Teacher Added Successfully!', { id: toastId });

            // Reset and Close
            setForm({ fullName: '', phone: '', email: '', qualification: '', joiningDate: null });
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || 'Failed to add teacher', { id: toastId });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth TransitionComponent={Fade} PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', p: 3, pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Avatar sx={{ bgcolor: COLORS.tealLight, color: COLORS.tealDark }}><PersonAdd /></Avatar><Box><Typography variant="h5" fontWeight={700}>Add New Teacher</Typography><Typography variant="body2" color="text.secondary">Enter teacher details</Typography></Box></Box>
                <IconButton onClick={onClose}><Close /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 1 }}>
                <Alert severity="info" icon={<Phone />} sx={{ mb: 3, borderRadius: 2, bgcolor: COLORS.tealLighter, border: `1px solid ${COLORS.tealLight}`, '& .MuiAlert-icon': { color: COLORS.tealDark } }}><Typography variant="body2" fontWeight={600}>OTP Login Notification</Typography><Typography variant="body2">The teacher will receive an OTP on this number to claim their account.</Typography></Alert>
                <Stack spacing={3}>
                    <TextField label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Badge sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
                    <TextField label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: 'text.secondary' }} /><Typography sx={{ ml: 1, fontWeight: 500 }}>+91</Typography></InputAdornment> }} />
                    <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
                    <TextField label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><School sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
                    
                    {/* Fixed DatePicker Slot Props */}
                    <DatePicker 
                        label="Joining Date" 
                        value={form.joiningDate} 
                        onChange={(d) => setForm({ ...form, joiningDate: d })} 
                        slotProps={{ 
                            textField: { 
                                fullWidth: true, 
                                required: true, 
                                InputProps: { 
                                    startAdornment: <InputAdornment position="start"><CalendarMonth sx={{ color: 'text.secondary' }} /></InputAdornment> 
                                } 
                            } 
                        }} 
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button onClick={onClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                    sx={{ bgcolor: COLORS.teal, '&:hover': { bgcolor: COLORS.tealDark } }}
                >
                    {isLoading ? 'Adding...' : 'Add Teacher'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}