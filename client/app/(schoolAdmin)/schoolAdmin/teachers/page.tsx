'use client';
import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Paper, TextField, InputAdornment, Stack, CircularProgress } from '@mui/material';
import { Groups, PersonAdd, Search } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // ✅ Fixed Adapter

import { COLORS } from '@/src/components/admin/teacher/TeacherConfig';
import TeacherCard from '@/src/components/admin/teacher/TeacherCard';
import TeacherStats from '@/src/components/admin/teacher/TeacherStats';
import AddTeacherDialog from '@/src/components/admin/teacher/AddTeacherDialog';
import EmptyTeacherState from '@/src/components/admin/teacher/EmptyTeacherState';
import { useRouter } from 'next/navigation';

// 1. Import API Hooks
import { useGetTeachersQuery, useUpdateTeacherMutation } from '@/src/store/api/teacherApiSlice';

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  // 2. Fetch Real Data from Backend
  const { data: teacherData, isLoading } = useGetTeachersQuery(searchQuery);
  const [updateTeacher] = useUpdateTeacherMutation();

  const teachers = teacherData?.data || [];

  const handleViewProfile = (id: string) => {
    router.push(`/schoolAdmin/teachers/${id}`);
  };

  // 3. Calculate Real Stats
  const stats = useMemo(() => ({
    total: teachers.length,
    active: teachers.filter((t: any) => t.isActive).length,
    // Logic: If classAssigned is missing or empty string, count as unassigned
    unassigned: teachers.filter((t: any) => !t.classAssigned).length 
  }), [teachers]);

  // 4. Handle Status Toggle (Active/Inactive)
  const handleToggle = async (id: string) => {
    const teacher = teachers.find((t: any) => t._id === id);
    if (teacher) {
       try {
         await updateTeacher({ id, isActive: !teacher.isActive }).unwrap();
       } catch (err) {
         console.error("Failed to update status", err);
       }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1600, mx: 'auto', minHeight: '100vh', bgcolor: 'grey.50' }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: COLORS.tealDark, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Groups sx={{ fontSize: 36 }} />
              Staff Room
            </Typography>
            <Typography variant="body1" color="text.secondary">Manage teaching staff</Typography>
          </Box>
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<PersonAdd />} 
            onClick={() => setDialogOpen(true)} 
            sx={{ bgcolor: COLORS.teal, px: 4, py: 1.5, borderRadius: 2.5, fontWeight: 700, '&:hover': { bgcolor: COLORS.tealDark } }}
          >
            Add Teacher
          </Button>
        </Box>

        {/* Stats & Search Bar */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
            <Box sx={{ width: '100%' }}>
              <TextField 
                fullWidth 
                placeholder="Search by name or phone..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: COLORS.teal }} /></InputAdornment> }} 
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5, bgcolor: 'grey.50' } }} 
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TeacherStats {...stats} />
            </Box>
          </Stack>
        </Paper>

        {/* Content Area */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
            <CircularProgress sx={{ color: COLORS.teal }} />
          </Box>
        ) : teachers.length > 0 ? (
          // Teacher Grid (Using Flexbox to avoid Grid version conflicts)
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
            {teachers.map((t: any) => (
              <Box 
                key={t._id} 
                sx={{ 
                  p: 1.5, 
                  width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, 
                  display: 'flex' 
                }}
              >
                <Box sx={{ width: '100%' }}>
                  {/* Map Backend Data to UI Props */}
                  <TeacherCard 
                    teacher={{
                      id: t._id, // Backend uses _id
                      fullName: t.name, // Backend uses name
                      phone: `+${t.phone}`,
                      email: t.email,
                      qualification: t.qualification || 'N/A',
                      experience: t.experience || 'New',
                      joiningDate: new Date(t.joiningDate),
                      classAssigned: t.classAssigned || null,
                      isActive: t.isActive,
                      avatar: ''
                    }} 
                    onToggleStatus={handleToggle} 
                    onClick={() => handleViewProfile(t._id || t.id)}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <EmptyTeacherState searchQuery={searchQuery} onAdd={() => setDialogOpen(true)} />
        )}

        {/* Add Teacher Dialog */}
        <AddTeacherDialog open={dialogOpen} onClose={() => setDialogOpen(false)}/>
      </Box>
    </LocalizationProvider>
  );
}