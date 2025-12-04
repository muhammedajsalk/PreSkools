'use client';
import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, Divider, DialogContent, TextField, Typography, 
  FormControl, InputLabel, Select, MenuItem, DialogActions, Button, 
  CircularProgress, Box, SelectChangeEvent, Accordion, AccordionSummary, 
  AccordionDetails, Stack 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StudentProfile, COLORS } from './StudentDetailsConfig';

interface Props { 
  open: boolean; 
  onClose: () => void; 
  student: StudentProfile; 
  onSave: (s: any) => void; // Using any here to match the complex backend payload structure
}

export default function EditStudentDialog({ open, onClose, student, onSave }: Props) {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data when modal opens
  useEffect(() => {
    if (open && student) {
      const transport = (student as any).transport || {};
      setFormData({
        // Root Fields
        name: `${student.firstName} ${student.lastName}`, // Combine for display/edit
        firstName: student.firstName,
        lastName: student.lastName,
        admission_no: student.admissionNo,
        roll_no: student.rollNo || '',
        gender: student.gender,
        dob: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        status: student.status,
        className: student.className,
        section: student.section,
        
        // Parents - Father
        father_name: student.parent?.fatherName || '',
        father_phone: student.parent?.fatherPhone || '',
        father_email: student.parent?.fatherEmail || '',
        father_occupation: student.parent?.fatherOccupation || '',

        // Parents - Mother
        mother_name: student.parent?.motherName || '',
        mother_phone: student.parent?.motherPhone || '',
        mother_email: student.parent?.motherEmail || '',
        mother_occupation: student.parent?.motherOccupation || '',

        // Address
        street: student.address?.street || '',
        city: student.address?.city || '',
        state: student.address?.state || '',
        zip_code: student.address?.zipCode || '',

        // Medical
        blood_group: student.medicalInfo?.bloodGroup || '',
        allergies: student.medicalInfo?.allergies?.join(', ') || '',
        conditions: student.medicalInfo?.conditions?.join(', ') || '',
        doctor_name: student.medicalInfo?.doctorName || '',
        doctor_phone: student.medicalInfo?.doctorPhone || '',

        // Transport (Defaults)
        transport_mode: transport.mode || 'PRIVATE',
        route_name: transport.route_name || '',
        pickup_point: transport.pickup_point || '',
      });
    }
  }, [open, student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = (e: SelectChangeEvent<string>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));

    // ✅ FIX: Construct a valid 'StudentProfile' object (Frontend Format)
    const updatedProfile: any = {
      ...student, // Keep IDs and original data
      
      // Basic Info
      firstName: formData.firstName,
      lastName: formData.lastName,
      admissionNo: formData.admission_no,
      rollNo: formData.roll_no,
      gender: formData.gender,
      dateOfBirth: formData.dob, // Keep as YYYY-MM-DD for now
      
      // ✅ FIX: Reconstruct 'parent' object (Singular, CamelCase)
      parent: {
        fatherName: formData.father_name,
        fatherPhone: formData.father_phone,
        fatherEmail: formData.father_email,
        fatherOccupation: formData.father_occupation,
        motherName: formData.mother_name,
        motherPhone: formData.mother_phone,
        motherEmail: formData.mother_email,
        motherOccupation: formData.mother_occupation,
      },

      // ✅ FIX: Reconstruct 'address' object
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip_code,
        country: student.address.country || 'India'
      },

      // ✅ FIX: Reconstruct 'medicalInfo' object
      medicalInfo: {
        bloodGroup: formData.blood_group,
        allergies: formData.allergies ? formData.allergies.split(',').map((s: string) => s.trim()) : [],
        conditions: formData.conditions ? formData.conditions.split(',').map((s: string) => s.trim()) : [],
        doctorName: formData.doctor_name,
        doctorPhone: formData.doctor_phone
      },

      // Fields for Class Logic
      className: formData.className,
      section: formData.section,
      
      // Pass Transport separately if needed, or add to profile interface
      transport: {
        mode: formData.transport_mode,
        route_name: formData.route_name,
        pickup_point: formData.pickup_point
      }
    };

    onSave(updatedProfile); // Now this sends a valid object
    setIsSaving(false); 
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <EditIcon sx={{ color: COLORS.primary }} />Edit Student Profile
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3, pb: 4 }}>
        
        {/* --- 1. Personal & Academic --- */}
        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" sx={{ mb: 2 }}>PERSONAL & ACADEMIC</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
          <TextField name="firstName" label="First Name" value={formData.firstName || ''} onChange={handleChange} fullWidth required />
          <TextField name="lastName" label="Last Name" value={formData.lastName || ''} onChange={handleChange} fullWidth required />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender || ''} label="Gender" onChange={handleSelect}>
              <MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem><MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <TextField name="admission_no" label="Admission No" value={formData.admission_no || ''} onChange={handleChange} fullWidth required />
          <TextField name="roll_no" label="Roll No" value={formData.roll_no || ''} onChange={handleChange} fullWidth />
          <TextField name="dob" label="Date of Birth" type="date" value={formData.dob || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />

          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select name="className" value={formData.className || ''} label="Class" onChange={handleSelect}>
              <MenuItem value="Nursery">Nursery</MenuItem><MenuItem value="LKG">LKG</MenuItem><MenuItem value="UKG">UKG</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Section</InputLabel>
            <Select name="section" value={formData.section || ''} label="Section" onChange={handleSelect}>
              <MenuItem value="A">A</MenuItem><MenuItem value="B">B</MenuItem><MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
           <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status || 'active'} label="Status" onChange={handleSelect}>
              <MenuItem value="active">Active</MenuItem><MenuItem value="inactive">Inactive</MenuItem><MenuItem value="dropped">Dropped</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* --- 2. Parents Details (Accordion) --- */}
        <Accordion defaultExpanded elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', mb: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Parents & Guardian</Typography></AccordionSummary>
          <AccordionDetails>
            <Typography variant="caption" color="primary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>FATHER</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField name="father_name" label="Father's Name" value={formData.father_name || ''} onChange={handleChange} fullWidth size="small" required />
              <TextField name="father_phone" label="Father's Phone" value={formData.father_phone || ''} onChange={handleChange} fullWidth size="small" required />
              <TextField name="father_email" label="Email" value={formData.father_email || ''} onChange={handleChange} fullWidth size="small" />
              <TextField name="father_occupation" label="Occupation" value={formData.father_occupation || ''} onChange={handleChange} fullWidth size="small" />
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="caption" color="primary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>MOTHER</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField name="mother_name" label="Mother's Name" value={formData.mother_name || ''} onChange={handleChange} fullWidth size="small" required />
              <TextField name="mother_phone" label="Mother's Phone" value={formData.mother_phone || ''} onChange={handleChange} fullWidth size="small" required />
              <TextField name="mother_email" label="Email" value={formData.mother_email || ''} onChange={handleChange} fullWidth size="small" />
              <TextField name="mother_occupation" label="Occupation" value={formData.mother_occupation || ''} onChange={handleChange} fullWidth size="small" />
            </Box>

            <Divider sx={{ mb: 2 }} />
          </AccordionDetails>
        </Accordion>

        {/* --- 3. Address --- */}
        <Accordion elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', mb: 2, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Address</Typography></AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box sx={{ gridColumn: '1 / -1' }}><TextField name="street" label="Street Address" value={formData.street || ''} onChange={handleChange} fullWidth size="small" /></Box>
              <TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth size="small" />
              <TextField name="state" label="State" value={formData.state || ''} onChange={handleChange} fullWidth size="small" />
              <TextField name="zip_code" label="Zip Code" value={formData.zip_code || ''} onChange={handleChange} fullWidth size="small" />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* --- 4. Medical & Transport --- */}
        <Accordion elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', mb: 0, '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Medical & Transport</Typography></AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Blood Group</InputLabel>
                <Select name="blood_group" value={formData.blood_group || ''} label="Blood Group" onChange={handleSelect}>{['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}</Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Transport Mode</InputLabel>
                <Select name="transport_mode" value={formData.transport_mode || 'PRIVATE'} label="Transport Mode" onChange={handleSelect}>
                  <MenuItem value="BUS">School Bus</MenuItem><MenuItem value="PRIVATE">Private Drop</MenuItem><MenuItem value="WALK">Walk</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ gridColumn: '1 / -1' }}><TextField name="allergies" label="Allergies (comma separated)" value={formData.allergies || ''} onChange={handleChange} fullWidth size="small" placeholder="e.g. Peanuts, Dust" /></Box>
              <Box sx={{ gridColumn: '1 / -1' }}><TextField name="conditions" label="Medical Conditions" value={formData.conditions || ''} onChange={handleChange} fullWidth size="small" placeholder="e.g. Asthma" /></Box>
              
              <TextField name="doctor_name" label="Doctor Name" value={formData.doctor_name || ''} onChange={handleChange} fullWidth size="small" />
              <TextField name="doctor_phone" label="Doctor Phone" value={formData.doctor_phone || ''} onChange={handleChange} fullWidth size="small" />
              
              <TextField name="route_name" label="Bus Route / Area" value={formData.route_name || ''} onChange={handleChange} fullWidth size="small" />
              <TextField name="pickup_point" label="Pickup Point" value={formData.pickup_point || ''} onChange={handleChange} fullWidth size="small" />
            </Box>
          </AccordionDetails>
        </Accordion>

      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={isSaving} 
          startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : null} 
          sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark }, textTransform: 'none', fontWeight: 600, px: 3 }}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}