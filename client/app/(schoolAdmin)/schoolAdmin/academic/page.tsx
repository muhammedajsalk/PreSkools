'use client';
import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { mockClassrooms, mockStudents, COLORS, CreateClassFormData, AddStudentFormData } from '../../../../src/components/academic/AcademicConfig';
import ClassList from '../../../../src/components/academic/ClassList';
import ClassDetails from '../../../../src/components/academic/ClassDetails';
import CreateClassDialog from '../../../../src/components/academic/dialogs/CreateClassDialog';
import AddStudentDialog from '../../../../src/components/academic/dialogs/AddStudentDialog';
import EditTeacherDialog from '../../../../src/components/academic/dialogs/EditTeacherDialog';

export default function AcademicManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [students, setStudents] = useState(mockStudents);
  
  // Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);

  const handleCreateClass = (data: CreateClassFormData) => {
    setClassrooms([...classrooms, { id: `c${classrooms.length + 1}`, ...data, academicYear: '2024-25' }]);
  };

  const handleAddStudent = (data: AddStudentFormData) => {
    if (!selectedClassId) return;
    setStudents([...students, { id: `s${students.length + 1}`, ...data, classId: selectedClassId, status: 'active', avatar: '', admissionDate: '2024' }]);
  };

  const handleUpdateTeacher = (teacherId: string) => {
    if (!selectedClassId) return;
    setClassrooms(classrooms.map(c => c.id === selectedClassId ? { ...c, teacherId } : c));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: { xs: 'auto', md: 'calc(100vh - 64px)' }, minHeight: { xs: 'calc(100vh - 64px)' }, bgcolor: COLORS.background }}>
      <ClassList 
        classrooms={classrooms} students={students} selectedClassId={selectedClassId}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        onSelect={setSelectedClassId} onCreate={() => setCreateOpen(true)} isMobile={isMobile}
      />
      <ClassDetails 
        selectedClassId={selectedClassId} classrooms={classrooms} students={students}
        onBack={() => setSelectedClassId(null)} onAddStudent={() => setStudentOpen(true)} onEditTeacher={() => setTeacherOpen(true)} isMobile={isMobile}
      />
      
      <CreateClassDialog open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={handleCreateClass} />
      <AddStudentDialog open={studentOpen} onClose={() => setStudentOpen(false)} onSubmit={handleAddStudent} className="" />
      <EditTeacherDialog open={teacherOpen} onClose={() => setTeacherOpen(false)} currentTeacherId="" onSubmit={handleUpdateTeacher} className="" />
    </Box>
  );
}