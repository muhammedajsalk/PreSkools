'use client';
import React, { useState, useMemo } from 'react';
import { 
  Box, Stack, Typography, Button, IconButton, Avatar, Tooltip, 
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, 
  TableBody, Chip, alpha, TextField, InputAdornment, MenuItem, 
  Select, FormControl, CircularProgress, TablePagination // 1. Import TablePagination
} from '@mui/material';
import { 
  ArrowBack, Edit, Add, Groups, Male, Female, Search 
} from '@mui/icons-material';
import { COLORS, getAvatarColor, getInitials, getTeacherById } from './AcademicConfig';
import EmptyState from './EmptyState';
import { useGetStudentsQuery } from '@/src/store/api/academicApiSlice';

interface Props {
  selectedClassId: string | null;
  classrooms: any[];
  onBack: () => void;
  onAddStudent: () => void;
  onEditTeacher: () => void;
  isMobile: boolean;
}

const StatsCard = ({ label, value, icon, color }: { label: string, value: number, icon: any, color: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.08), flex: 1 }}>
    <Box sx={{ color }}>{icon}</Box>
    <Box><Typography variant="h6" fontWeight={700}>{value}</Typography><Typography variant="caption" color="text.secondary">{label}</Typography></Box>
  </Box>
);

export default function ClassDetails({ selectedClassId, classrooms, onBack, onAddStudent, onEditTeacher, isMobile }: Props) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // 2. Pagination State
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 3. Fetch Students (Pass page & limit)
  const { data: studentResponse, isLoading } = useGetStudentsQuery(
    { 
      class_id: selectedClassId, 
      search: searchQuery,
      page: page + 1, // API expects 1-based index
      limit: rowsPerPage
    }, 
    { skip: !selectedClassId }
  );

  const students = studentResponse?.students || [];
  const totalCount = studentResponse?.total || 0;

  // 4. Handle Pagination Changes
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // --- 5. Filtering (Keep as fallback or for status) ---
  const filteredStudents = useMemo(() => {
    if (statusFilter === 'ALL') return students;
    return students.filter((s: any) => s.status === statusFilter);
  }, [students, statusFilter]);

  // --- Class Logic ---
  const selectedClassroom = useMemo(() => {
    return classrooms.find(c => (c._id || c.id) === selectedClassId);
  }, [classrooms, selectedClassId]);

  const teacherName = useMemo(() => {
    if (!selectedClassroom) return undefined;
    if (selectedClassroom.teacher_id?.name) return selectedClassroom.teacher_id.name;
    if (selectedClassroom.teacherId) return getTeacherById(selectedClassroom.teacherId)?.name;
    return "Unassigned";
  }, [selectedClassroom]);
  
  // Stats (Using total from API if available, otherwise local)
  const stats = useMemo(() => ({
    total: totalCount,
    boys: students.filter((s: any) => (s.gender || '').toLowerCase() === 'male').length, // Note: accurate only for current page
    girls: students.filter((s: any) => (s.gender || '').toLowerCase() === 'female').length
  }), [students, totalCount]);

  if (!selectedClassroom) return <EmptyState />;

  return (
    <Box sx={{ flex: 1, display: { xs: !selectedClassId && isMobile ? 'none' : 'flex', md: 'flex' }, flexDirection: 'column', bgcolor: COLORS.background, height: '100%', overflow: 'hidden' }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ p: 2.5, bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: 'divider' }}>
         {/* ... (Keep existing header code) ... */}
         {/* Same as previous: Title, Add Button, Search, Filters, Stats */}
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {isMobile && <IconButton onClick={onBack} size="small"><ArrowBack /></IconButton>}
            <Box>
              <Typography variant="h5" fontWeight={700}>{selectedClassroom.name}-{selectedClassroom.section}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: getAvatarColor(teacherName || "T"), fontSize: '0.75rem' }}>{getInitials(teacherName || "T")}</Avatar>
                <Typography variant="body2" color="text.secondary">{teacherName}</Typography>
                <Tooltip title="Change Teacher"><IconButton size="small" onClick={onEditTeacher} sx={{ color: COLORS.primary }}><Edit fontSize="small" /></IconButton></Tooltip>
              </Stack>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<Add />} onClick={onAddStudent} sx={{ bgcolor: COLORS.secondary, '&:hover': { bgcolor: COLORS.secondaryDark } }}>Add Student</Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
          <TextField 
            size="small" placeholder="Search students..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }} // Reset page on search
            fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" sx={{ color: COLORS.textSecondary }} /></InputAdornment> }} sx={{ bgcolor: COLORS.background, '& fieldset': { border: 'none' }, borderRadius: 2 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty sx={{ bgcolor: COLORS.background, '& fieldset': { border: 'none' }, borderRadius: 2 }}>
              <MenuItem value="ALL">All Status</MenuItem><MenuItem value="ACTIVE">Active</MenuItem><MenuItem value="DROPPED">Dropped</MenuItem><MenuItem value="ALUMNI">Alumni</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} pb={0.5} overflow="auto">
          <StatsCard label="Total" value={stats.total} icon={<Groups />} color={COLORS.primary} />
          <StatsCard label="Boys" value={stats.boys} icon={<Male />} color={COLORS.male} />
          <StatsCard label="Girls" value={stats.girls} icon={<Female />} color={COLORS.female} />
        </Stack>
      </Box>

      {/* --- TABLE --- */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', flex: 1 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Admission No</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Parent</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 10 }}><CircularProgress /></TableCell></TableRow>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((s: any) => (
                  <TableRow key={s._id || s.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: getAvatarColor(s.name), fontSize: '0.85rem' }}>{getInitials(s.name)}</Avatar>
                        <Typography variant="body2" fontWeight={500}>{s.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{s.admission_no || s.admissionNo}</TableCell>
                    <TableCell><Chip icon={s.gender.toLowerCase() === 'male' ? <Male /> : <Female />} label={s.gender} size="small" sx={{ bgcolor: alpha(s.gender.toLowerCase() === 'male' ? COLORS.male : COLORS.female, 0.1), color: s.gender.toLowerCase() === 'male' ? COLORS.male : COLORS.female }} /></TableCell>
                    <TableCell>{s.parent_name || s.parentName}</TableCell>
                    <TableCell>{s.parent_phone || s.parentPhone}</TableCell>
                    <TableCell><Chip label={s.status} size="small" sx={{ bgcolor: alpha(s.status === 'ACTIVE' || s.status === 'active' ? COLORS.success : COLORS.error, 0.1), color: s.status === 'ACTIVE' || s.status === 'active' ? COLORS.success : COLORS.error, fontWeight: 500 }} /></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>No students found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* 6. Add Pagination Component */}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ borderTop: '1px solid', borderColor: COLORS.divider, bgcolor: COLORS.cardBg }}
        />
      </Box>
    </Box>
  );
}