import React, { useMemo } from 'react';
import { Box, Stack, Typography, Button, IconButton, Avatar, Tooltip, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, alpha } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GroupsIcon from '@mui/icons-material/Groups';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { COLORS, Classroom, Student, getTeacherById, getAvatarColor, getInitials } from './AcademicConfig';
import EmptyState from './EmptyState';

interface Props {
  selectedClassId: string | null;
  classrooms: Classroom[];
  students: Student[];
  onBack: () => void;
  onAddStudent: () => void;
  onEditTeacher: () => void;
  isMobile: boolean;
}

const StatsCard = ({ label, value, icon, color }: { label: string, value: number, icon: any, color: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.08) }}>
    <Box sx={{ color }}>{icon}</Box>
    <Box><Typography variant="h6" fontWeight={700}>{value}</Typography><Typography variant="caption" color="text.secondary">{label}</Typography></Box>
  </Box>
);

export default function ClassDetails({ selectedClassId, classrooms, students, onBack, onAddStudent, onEditTeacher, isMobile }: Props) {
  const selectedClassroom = useMemo(() => classrooms.find(c => c.id === selectedClassId), [classrooms, selectedClassId]);
  const teacher = useMemo(() => selectedClassroom ? getTeacherById(selectedClassroom.teacherId) : undefined, [selectedClassroom]);
  const classStudents = useMemo(() => selectedClassId ? students.filter(s => s.classId === selectedClassId) : [], [students, selectedClassId]);
  
  const stats = useMemo(() => ({
    total: classStudents.length,
    boys: classStudents.filter(s => s.gender === 'male').length,
    girls: classStudents.filter(s => s.gender === 'female').length
  }), [classStudents]);

  if (!selectedClassroom || !teacher) return <EmptyState />;

  return (
    <Box sx={{ flex: 1, display: { xs: !selectedClassId && isMobile ? 'none' : 'flex', md: 'flex' }, flexDirection: 'column', bgcolor: COLORS.background, height: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2.5, bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {isMobile && <IconButton onClick={onBack} size="small"><ArrowBackIcon /></IconButton>}
            <Box>
              <Typography variant="h5" fontWeight={700}>{selectedClassroom.name}-{selectedClassroom.section}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: getAvatarColor(teacher.name), fontSize: '0.75rem' }}>{getInitials(teacher.name)}</Avatar>
                <Typography variant="body2" color="text.secondary">{teacher.name}</Typography>
                <Tooltip title="Change Teacher"><IconButton size="small" onClick={onEditTeacher} sx={{ color: COLORS.primary }}><EditIcon fontSize="small" /></IconButton></Tooltip>
              </Stack>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAddStudent} sx={{ bgcolor: COLORS.secondary, '&:hover': { bgcolor: COLORS.secondaryDark } }}>Add Student</Button>
        </Stack>
        <Stack direction="row" spacing={2} pb={0.5} overflow="auto">
          <StatsCard label="Total" value={stats.total} icon={<GroupsIcon />} color={COLORS.primary} />
          <StatsCard label="Boys" value={stats.boys} icon={<MaleIcon />} color={COLORS.male} />
          <StatsCard label="Girls" value={stats.girls} icon={<FemaleIcon />} color={COLORS.female} />
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table stickyHeader>
            <TableHead><TableRow><TableCell>Student</TableCell><TableCell>Admission No</TableCell><TableCell>Gender</TableCell><TableCell>Parent</TableCell><TableCell>Phone</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
            <TableBody>
              {classStudents.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell><Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 36, height: 36, bgcolor: getAvatarColor(s.name), fontSize: '0.85rem' }}>{getInitials(s.name)}</Avatar><Typography variant="body2" fontWeight={500}>{s.name}</Typography></Stack></TableCell>
                  <TableCell>{s.admissionNo}</TableCell>
                  <TableCell><Chip icon={s.gender === 'male' ? <MaleIcon /> : <FemaleIcon />} label={s.gender} size="small" sx={{ bgcolor: alpha(s.gender === 'male' ? COLORS.male : COLORS.female, 0.1), color: s.gender === 'male' ? COLORS.male : COLORS.female }} /></TableCell>
                  <TableCell>{s.parentName}</TableCell>
                  <TableCell>{s.parentPhone}</TableCell>
                  <TableCell><Chip label={s.status} size="small" sx={{ bgcolor: alpha(s.status === 'active' ? COLORS.success : COLORS.error, 0.1), color: s.status === 'active' ? COLORS.success : COLORS.error }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}