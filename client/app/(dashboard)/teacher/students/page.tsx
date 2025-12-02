'use client';
import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { COLORS, MOCK_STUDENTS, ViewMode, formatPhone } from '../../../../src/components/teacher/students/RosterConfig';
import RosterHeader from '../../../../src/components/teacher/students/RosterHeader';
import StudentGridCard from '../../../../src/components/teacher/students/StudentGridCard';
import StudentTable from '../../../../src/components/teacher/students/StudentTable';
import EmptyRosterState from '../../../../src/components/teacher/students/EmptyRosterState';

export default function TeacherStudentRosterPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? 'grid' : 'list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_STUDENTS;
    const q = searchQuery.toLowerCase();
    return MOCK_STUDENTS.filter(s => s.name.toLowerCase().includes(q) || s.rollNo.includes(q) || s.parent.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const stats = useMemo(() => {
    const present = MOCK_STUDENTS.filter((s) => s.isPresent).length;
    const boys = MOCK_STUDENTS.filter((s) => s.gender === 'male').length;
    const girls = MOCK_STUDENTS.filter((s) => s.gender === 'female').length;
    return { present, absent: MOCK_STUDENTS.length - present, boys, girls };
  }, []);

  const handleCall = (e: React.MouseEvent, phone: string) => { e.stopPropagation(); window.location.href = `tel:${formatPhone(phone)}`; };
  const handleMessage = (e: React.MouseEvent, id: string) => { e.stopPropagation(); router.push(`/teacher/messages?student=${id}`); };
  const handleClick = (id: string) => router.push(`/teacher/students/${id}`);

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 4 }}>
      <Box sx={{ bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider, position: 'sticky', top: 0, zIndex: 10 }}>
        <RosterHeader stats={stats} searchQuery={searchQuery} setSearchQuery={setSearchQuery} viewMode={viewMode} setViewMode={setViewMode} />
      </Box>

      <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 2, display: 'block' }}>{filteredStudents.length} STUDENT{filteredStudents.length !== 1 ? 'S' : ''} FOUND</Typography>
        
        {filteredStudents.length === 0 ? <EmptyRosterState /> : viewMode === 'grid' ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mx: -1 }}>
            {filteredStudents.map((s) => (
              <Box key={s.id} sx={{ width: { xs: 'calc(50% - 8px)', sm: 'calc(33.333% - 11px)', md: 'calc(25% - 12px)', lg: 'calc(20% - 13px)' }, minWidth: 160 }}>
                <StudentGridCard student={s} onClick={() => handleClick(s.id)} onCall={(e) => handleCall(e, s.parent.phone)} onMessage={(e) => handleMessage(e, s.id)} />
              </Box>
            ))}
          </Box>
        ) : (
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3, overflow: 'hidden' }}>
            <StudentTable students={filteredStudents} onClick={handleClick} onCall={handleCall} onMessage={handleMessage} />
          </Paper>
        )}
      </Box>
    </Box>
  );
}