'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Stack, Typography, IconButton, Chip, Button, CircularProgress, alpha } from '@mui/material';
import { ArrowBack, Refresh, DoneAll, Save } from '@mui/icons-material';
import Link from 'next/link';
import { toast } from 'sonner';
import dayjs from 'dayjs';

// Components
import { COLORS, AttendanceStatus } from '@/src/components/teacher/attendance/AttendanceConfig';
import AttendanceSummary from '@/src/components/teacher/attendance/AttendanceSummary';
import StudentRow from '@/src/components/teacher/attendance/StudentRow';
import BottomActionBar from '@/src/components/teacher/attendance/BottomActionBar';

// API Hooks
import { useGetMeQuery } from '@/src/store/api/authApiSlice';
import { useGetClassesQuery, useGetStudentsQuery } from '@/src/store/api/academicApiSlice';
import { useGetAttendanceQuery, useMarkAttendanceMutation } from '@/src/store/api/attendanceApiSlice';

export default function TeacherAttendancePage() {
  // 1. State & Setup
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // Local state to hold changes before saving
  const [localAttendance, setLocalAttendance] = useState<Record<string, AttendanceStatus>>({}); 
  
  // 2. Fetch Context Data
  const { data: userData } = useGetMeQuery(undefined);
  const { data: classData } = useGetClassesQuery();
  
  // Find the class assigned to this teacher
  const myClass = useMemo(() => {
    if (!userData || !classData) return null;
    return classData.data.find((c: any) => c.teacher_id?._id === userData.data._id || c.teacher_id === userData.data._id);
  }, [userData, classData]);

  const classId = myClass?._id;

  // 3. Fetch Students & Existing Attendance
  const { data: studentData, isLoading: loadingStudents } = useGetStudentsQuery(
    { class_id: classId, limit: 100 }, // Fetch all students
    { skip: !classId }
  );

  const { data: attendanceData, isLoading: loadingAttendance } = useGetAttendanceQuery(
    { class_id: classId!, date: selectedDate.toISOString() },
    { skip: !classId }
  );

  const [markAttendance, { isLoading: isSaving }] = useMarkAttendanceMutation();

  // 4. Merge Data (Server Data -> Local State)
  useEffect(() => {
    if (studentData?.students) {
      const initialMap: Record<string, AttendanceStatus> = {};
      
      studentData.students.forEach(student => {
        // Check if record exists in DB for today
        const existingRecord = attendanceData?.data?.records.find((r: any) => 
          (r.student_id._id || r.student_id) === student._id
        );
        
        // Default to 'unmarked' if no record, otherwise use DB status (lowercase for UI)
        initialMap[student._id] = existingRecord 
          ? (existingRecord.status.toLowerCase() as AttendanceStatus) 
          : 'unmarked';
      });
      
      setLocalAttendance(initialMap);
    }
  }, [studentData, attendanceData]);

  // 5. Handlers
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setLocalAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = () => {
    const newMap = { ...localAttendance };
    Object.keys(newMap).forEach(id => newMap[id] = 'present');
    setLocalAttendance(newMap);
    toast.success("Marked all as Present (Unsaved)");
  };

  const handleReset = () => {
    const newMap = { ...localAttendance };
    Object.keys(newMap).forEach(id => newMap[id] = 'unmarked');
    setLocalAttendance(newMap);
  };

  const handleSave = async () => {
    if (!classId) return;

    // Check for unmarked students
    const unmarkedCount = Object.values(localAttendance).filter(s => s === 'unmarked').length;
    if (unmarkedCount > 0) {
      toast.error(`Please mark attendance for remaining ${unmarkedCount} students`);
      return;
    }

    try {
      const payload = {
        class_id: classId,
        date: selectedDate.toISOString(),
        records: Object.entries(localAttendance).map(([student_id, status]) => ({
          student_id,
          status: status.toUpperCase() // Backend expects UPPERCASE
        }))
      };

      await markAttendance(payload).unwrap();
      toast.success("Attendance Saved Successfully! 🎉");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save attendance");
    }
  };

  // Stats Calculation
  const stats = useMemo(() => {
    const values = Object.values(localAttendance);
    return {
      present: values.filter(s => s === 'present').length,
      absent: values.filter(s => s === 'absent').length,
      late: values.filter(s => s === 'late').length,
      unmarked: values.filter(s => s === 'unmarked').length
    };
  }, [localAttendance]);

  // 6. Loading / Empty States
  if (!classId && !loadingStudents) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error">No Class Assigned</Typography>
        <Typography color="text.secondary">Please ask the admin to assign you to a class.</Typography>
      </Box>
    );
  }

  if (loadingStudents || loadingAttendance) {
    return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ color: COLORS.primary }} /></Box>;
  }

  const studentsList = studentData?.students || [];

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: { xs: 12, sm: 10 } }}>
      {/* Header */}
      <Box sx={{ bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider, position: 'sticky', top: 0, zIndex: 20 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton component={Link} href="/teacher" sx={{ color: COLORS.textSecondary }}><ArrowBack /></IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700} color="text.primary">Mark Attendance</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Chip label={`${myClass?.name}-${myClass?.section}`} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 600, height: 22 }} />
                <Typography variant="caption" color="text.secondary">{selectedDate.format('ddd, MMM D')}</Typography>
              </Stack>
            </Box>
          </Stack>
          <IconButton onClick={handleReset} sx={{ color: COLORS.textSecondary }}><Refresh /></IconButton>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<DoneAll />} 
          onClick={handleMarkAll} 
          disabled={stats.unmarked === 0 && stats.present === studentsList.length}
          sx={{ mb: 2, py: 1.5, borderColor: COLORS.primary, color: COLORS.primary, borderRadius: 3, fontWeight: 600, textTransform: 'none' }}
        >
          Mark All Present
        </Button>

        <Box sx={{ mb: 2 }}>
          <AttendanceSummary {...stats} total={studentsList.length} />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 1.5, px: 0.5 }}>
          STUDENTS ({studentsList.length})
        </Typography>

        <Stack spacing={1.5}>
          {studentsList.map((student: any) => (
            <StudentRow 
              key={student._id} 
              data={{
                student: {
                  id: student._id,
                  name: student.name,
                  rollNo: student.admission_no,
                  avatar: '', // Add avatar logic if available
                  gender: student.gender.toLowerCase()
                },
                status: localAttendance[student._id] || 'unmarked'
              }} 
              onStatusChange={handleStatusChange} 
            />
          ))}
        </Stack>
      </Box>

      <BottomActionBar stats={stats} onSave={handleSave} saving={isSaving} />
    </Box>
  );
}