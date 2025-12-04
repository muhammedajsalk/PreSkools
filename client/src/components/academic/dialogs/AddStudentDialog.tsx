'use client';
import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Box, Typography, Divider, 
  TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Tabs, Tab 
} from '@mui/material';
import { PersonAdd, MedicalServices, DirectionsBus, Person, PersonOutline } from '@mui/icons-material';
import { toast } from 'sonner';
import { useCreateStudentMutation } from '@/src/store/api/academicApiSlice';
import { COLORS } from '../AcademicConfig';

interface Props {
  open: boolean;
  onClose: () => void;
  className: string;
  classId: string | null;
}

export default function AddStudentDialog({ open, onClose, className, classId }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  // Form State
  const [formData, setFormData] = useState({
    // Basic
    name: '', admissionNo: '', rollNo: '', gender: 'Male', dob: '',
    // Primary Parent (Simplified Input)
    parentName: '', parentPhone: '', parentEmail: '', parentRelation: 'Father', parentOccupation: '',
    // Address
    street: '', city: '', state: '', zipCode: '',
    // Medical
    bloodGroup: '', allergies: '', conditions: '', docName: '', docPhone: '',
    // Transport
    transportMode: 'PRIVATE', routeName: '', pickupPoint: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = (e: any) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!classId) return toast.error("No class selected!");
    if (!formData.name || !formData.admissionNo || !formData.parentName || !formData.parentPhone) {
      return toast.error("Please fill in required fields (Name, Admission, Parent Details)");
    }

    try {
      // 1. Construct Parents Payload dynamically
      // We only populate the selected parent type. The others are sent as empty objects
      // because our backend validation now allows optional fields.
      const parentsPayload: any = {
        father: {},
        mother: {},
        guardian: {}
      };
      
      const parentData = {
        name: formData.parentName,
        phone: formData.parentPhone,
        email: formData.parentEmail,
        occupation: formData.parentOccupation
      };

      if (formData.parentRelation === 'Father') {
        parentsPayload.father = parentData;
      } else if (formData.parentRelation === 'Mother') {
        parentsPayload.mother = parentData;
      } else {
        parentsPayload.guardian = {
            name: formData.parentName,
            phone: formData.parentPhone,
            relation: 'Guardian' // or custom relation if needed
        };
      }

      // 2. Final Payload
      const payload = {
        class_id: classId,
        name: formData.name,
        admission_no: formData.admissionNo,
        roll_no: formData.rollNo,
        gender: formData.gender,
        dob: formData.dob,
        
        // Flat fields for User Account Creation & Quick Search
        parent_name: formData.parentName,
        parent_phone: formData.parentPhone,
        parent_email: formData.parentEmail,

        // Nested Objects
        parents: parentsPayload,

        address: { 
            street: formData.street, 
            city: formData.city, 
            state: formData.state, 
            zip_code: formData.zipCode 
        },

        medical_info: {
          blood_group: formData.bloodGroup,
          doctor_name: formData.docName,
          doctor_phone: formData.docPhone,
          allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
          conditions: formData.conditions ? formData.conditions.split(',').map(s => s.trim()) : []
        },

        transport: {
          mode: formData.transportMode,
          route_name: formData.routeName,
          pickup_point: formData.pickupPoint
        }
      };

      await createStudent(payload).unwrap();
      toast.success("Student Added Successfully!");
      
      // Reset form
      setFormData({
        name: '', admissionNo: '', rollNo: '', gender: 'Male', dob: '',
        parentName: '', parentPhone: '', parentEmail: '', parentRelation: 'Father', parentOccupation: '',
        street: '', city: '', state: '', zipCode: '',
        bloodGroup: '', allergies: '', conditions: '', docName: '', docPhone: '',
        transportMode: 'PRIVATE', routeName: '', pickupPoint: ''
      });
      setActiveTab(0);
      onClose();

    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to add student");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3, height: '85vh' } }}>
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonAdd sx={{ color: COLORS.secondary }} />
        <Box>
            <Typography variant="h6" fontWeight={600}>Add New Student</Typography>
            <Typography variant="caption" color="text.secondary">to {className}</Typography>
        </Box>
      </DialogTitle>
      <Divider />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto">
          <Tab icon={<PersonOutline />} iconPosition="start" label="Personal" />
          <Tab icon={<Person />} iconPosition="start" label="Parent" />
          <Tab icon={<MedicalServices />} iconPosition="start" label="Medical" />
          <Tab icon={<DirectionsBus />} iconPosition="start" label="Transport" />
        </Tabs>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        
        {/* TAB 1: PERSONAL */}
        <Box role="tabpanel" hidden={activeTab !== 0}>
          <Stack spacing={3}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} required fullWidth />
              <TextField name="admissionNo" label="Admission No" value={formData.admissionNo} onChange={handleChange} required fullWidth />
              <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select name="gender" value={formData.gender} label="Gender" onChange={handleSelect}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                  </Select>
              </FormControl>
              <TextField name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
              <TextField name="rollNo" label="Roll No" value={formData.rollNo} onChange={handleChange} fullWidth />
            </Box>
            <Typography variant="subtitle2" color="text.secondary">ADDRESS</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
               <Box sx={{ gridColumn: '1 / -1' }}><TextField name="street" label="Street Address" value={formData.street} onChange={handleChange} fullWidth multiline rows={2} /></Box>
               <TextField name="city" label="City" value={formData.city} onChange={handleChange} fullWidth />
               <TextField name="state" label="State" value={formData.state} onChange={handleChange} fullWidth />
               <TextField name="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleChange} fullWidth />
            </Box>
          </Stack>
        </Box>

        {/* TAB 2: PARENT (SIMPLIFIED) */}
        <Box role="tabpanel" hidden={activeTab !== 1}>
          <Stack spacing={3}>
            <Typography variant="subtitle2" color="primary">PRIMARY CONTACT DETAILS</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Relationship</InputLabel>
                <Select name="parentRelation" value={formData.parentRelation} label="Relationship" onChange={handleSelect}>
                  <MenuItem value="Father">Father</MenuItem>
                  <MenuItem value="Mother">Mother</MenuItem>
                  <MenuItem value="Guardian">Guardian</MenuItem>
                </Select>
              </FormControl>
              <TextField name="parentName" label="Parent Name" value={formData.parentName} onChange={handleChange} required fullWidth />
              <TextField name="parentPhone" label="Phone Number" value={formData.parentPhone} onChange={handleChange} required fullWidth placeholder="10-digit number" />
              <TextField name="parentEmail" label="Email Address" value={formData.parentEmail} onChange={handleChange} fullWidth />
              <TextField name="parentOccupation" label="Occupation" value={formData.parentOccupation} onChange={handleChange} fullWidth />
            </Box>
            <Typography variant="caption" color="text.secondary">This phone number will be used for the parent login.</Typography>
          </Stack>
        </Box>

        {/* TAB 3: MEDICAL */}
        <Box role="tabpanel" hidden={activeTab !== 2}>
          <Stack spacing={3}>
            <FormControl fullWidth>
                <InputLabel>Blood Group</InputLabel>
                <Select name="bloodGroup" value={formData.bloodGroup} label="Blood Group" onChange={handleSelect}>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField name="allergies" label="Allergies (comma separated)" value={formData.allergies} onChange={handleChange} fullWidth />
            <TextField name="conditions" label="Medical Conditions" value={formData.conditions} onChange={handleChange} fullWidth />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField name="docName" label="Doctor Name" value={formData.docName} onChange={handleChange} fullWidth />
              <TextField name="docPhone" label="Doctor Phone" value={formData.docPhone} onChange={handleChange} fullWidth />
            </Box>
          </Stack>
        </Box>

        {/* TAB 4: TRANSPORT */}
        <Box role="tabpanel" hidden={activeTab !== 3}>
          <Stack spacing={3}>
            <FormControl fullWidth>
                <InputLabel>Transport Mode</InputLabel>
                <Select name="transportMode" value={formData.transportMode} label="Transport Mode" onChange={handleSelect}>
                    <MenuItem value="PRIVATE">Private Drop</MenuItem>
                    <MenuItem value="BUS">School Bus</MenuItem>
                    <MenuItem value="WALK">Walk</MenuItem>
                </Select>
            </FormControl>
            {formData.transportMode === 'BUS' && (
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField name="routeName" label="Bus Route / Area" value={formData.routeName} onChange={handleChange} fullWidth />
                <TextField name="pickupPoint" label="Pickup Point" value={formData.pickupPoint} onChange={handleChange} fullWidth />
              </Box>
            )}
          </Stack>
        </Box>

      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={isLoading} 
            sx={{ bgcolor: COLORS.secondary, '&:hover': { bgcolor: COLORS.secondaryDark }, px: 4 }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save Student"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}