'use client';
import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { COLORS } from '@/src/components/academic/AcademicConfig';
import ClassList from '@/src/components/academic/ClassList';
import ClassDetails from '@/src/components/academic/ClassDetails';
import CreateClassDialog from '@/src/components/academic/dialogs/CreateClassDialog';
import AddStudentDialog from '@/src/components/academic/dialogs/AddStudentDialog';

// 1. Import Hooks
import { useGetClassesQuery, useGetStudentsQuery } from '@/src/store/api/academicApiSlice';

export default function AcademicManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);

  // 2. Fetch Real Data
  const { data: classData, isLoading: classLoading } = useGetClassesQuery();
  
  // Only fetch students if a class is selected
  const { data: studentData, isLoading: studentLoading } = useGetStudentsQuery(
    { class_id: selectedClassId, search: searchQuery }, 
    { skip: !selectedClassId } // Don't fetch if no class selected
  );

  const classrooms = classData?.data || [];
  const students = studentData?.data || [];

  // Logic for Dialogs
  const selectedClass = classrooms.find((c: any) => c._id === selectedClassId);
  const className = selectedClass ? `${selectedClass.name}-${selectedClass.section}` : '';

  if (classLoading) return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ color: COLORS.primary }} /></Box>;

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: { xs: 'auto', md: 'calc(100vh - 64px)' }, minHeight: { xs: 'calc(100vh - 64px)' }, bgcolor: COLORS.background }}>
      
      {/* Left: Class List */}
      <ClassList 
        classrooms={classrooms as any} 
        students={[]} // Note: Backend doesn't send student count in class list yet (optimization for later)
        selectedClassId={selectedClassId}
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onSelect={setSelectedClassId} 
        onCreate={() => setCreateOpen(true)} 
        isMobile={isMobile}
      />

      {/* Right: Details */}
      <ClassDetails 
        selectedClassId={selectedClassId} 
        classrooms={classrooms as any} 
        students={students as any}
        onBack={() => setSelectedClassId(null)} 
        onAddStudent={() => setStudentOpen(true)} 
        onEditTeacher={() => {}} 
        isMobile={isMobile}
      />
      
      {/* Dialogs */}
      <CreateClassDialog open={createOpen} onClose={() => setCreateOpen(false)} />
      <AddStudentDialog open={studentOpen} onClose={() => setStudentOpen(false)} className={className} classId={selectedClassId} />
    </Box>
  );
}