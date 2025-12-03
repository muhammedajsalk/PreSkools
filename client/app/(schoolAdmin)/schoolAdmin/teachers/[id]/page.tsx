'use client';
import React, { useState, useMemo } from 'react';
import { Box, Button, Breadcrumbs, Link as MuiLink, Typography, CircularProgress } from '@mui/material';
import { ArrowBack, Groups } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter,useParams } from 'next/navigation';
import { toast } from 'sonner';

// Components
import { COLORS, Teacher, EditTeacherForm } from '@/src/components/admin/teacher/details/TeacherDetailsConfig';
import TeacherIdentityCard from '@/src/components/admin/teacher/details/TeacherIdentityCard';
import TeacherOverview from '@/src/components/admin/teacher/details/TeacherOverview';
import TeacherPerformanceStats from '@/src/components/admin/teacher/details/TeacherPerformanceStats';
import EditTeacherDialog from '@/src/components/admin/teacher/details/EditTeacherDialog';
import TeacherNotFound from '@/src/components/admin/teacher/details/TeacherNotFound';

// 1. Import API Hooks
import { useGetTeacherByIdQuery, useUpdateTeacherMutation } from '@/src/store/api/teacherApiSlice';

export default function TeacherDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [editOpen, setEditOpen] = useState(false);

  // 2. Fetch Real Data
  const { data, isLoading, isError } = useGetTeacherByIdQuery(id);
  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();

  // 3. Normalize Data (Backend '_id' vs Frontend 'id')
  const teacherData = data?.data;
  
  const teacher: Teacher | null = teacherData ? {
    id: teacherData._id,
    fullName: teacherData.name, // Map backend 'name' to frontend 'fullName'
    phone: teacherData.phone,
    email: teacherData.email,
    qualification: teacherData.qualification || 'N/A',
    experience: teacherData.experience || 'N/A',
    joiningDate: new Date(teacherData.joiningDate),
    classAssigned: teacherData.classAssigned || null,
    isActive: teacherData.isActive,
    avatar: ''
  } : null;

  // 4. Mock Stats (Backend doesn't provide these yet, so we keep them mocked/calculated)
  const stats = useMemo(() => ({ 
    attendanceRate: 95, 
    totalStudents: 25, 
    classesHandled: teacher?.classAssigned ? 1 : 0 
  }), [teacher]);

  // 5. Handle Update
  const handleSave = async (formData: EditTeacherForm) => {
    try {
      await updateTeacher({
        id: id,
        fullName: formData.fullName, // Backend maps this to 'name'
        phone: formData.phone,
        email: formData.email,
        qualification: formData.qualification
      }).unwrap();
      
      toast.success("Teacher Profile Updated");
      setEditOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  // 6. Loading & Error States
  if (isLoading) return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ color: COLORS.teal }} /></Box>;
  if (isError || !teacher) return <TeacherNotFound />;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto', minHeight: '100vh', bgcolor: 'grey.50' }}>
      
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }} separator="›">
        <MuiLink component={Link} href="/schoolAdmin/teachers" underline="hover" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, '&:hover': { color: COLORS.teal } }}>
          <Groups sx={{ fontSize: 18 }} />Teachers
        </MuiLink>
        <Typography color="text.primary" fontWeight={600}>{teacher.fullName}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 3, color: 'text.secondary', '&:hover': { bgcolor: COLORS.tealLighter, color: COLORS.tealDark } }}>
        Back to Staff Room
      </Button>

      {/* Layout */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        
        {/* Left Column */}
        <Box sx={{ width: { xs: '100%', md: '30%', lg: '25%' }, minWidth: { md: 300 } }}>
          <TeacherIdentityCard teacher={teacher} onEdit={() => setEditOpen(true)} />
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TeacherOverview teacher={teacher} />
          <Box mt={3}>
            <TeacherPerformanceStats teacher={teacher} stats={stats} />
          </Box>
        </Box>

      </Box>

      {/* Edit Dialog */}
      <EditTeacherDialog 
        open={editOpen} 
        onClose={() => setEditOpen(false)} 
        teacher={teacher} 
        onSave={handleSave} 
      />
    </Box>
  );
}