'use client';
import React, { useState, useMemo } from 'react';
import {
  Box, Stack, Typography, Button, IconButton, Avatar, Tooltip,
  TableContainer, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, Chip, alpha, TextField, InputAdornment, MenuItem,
  Select, FormControl, CircularProgress, TablePagination
} from '@mui/material';
import {
  ArrowBack, Edit, Add, Groups, Male, Female, Search
} from '@mui/icons-material';
import { COLORS, getAvatarColor, getInitials, getTeacherById } from './AcademicConfig';
import EmptyState from './EmptyState';
import { useGetStudentsQuery } from '@/src/store/api/academicApiSlice';
import AssignTeacherDialog from './dialogs/AssignTeacherDialog';
import { useRouter } from 'next/navigation';

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
  const [statusFilter, setStatusFilter] = useState(''); // Default empty for 'All'

  const [assignTeacherOpen, setAssignTeacherOpen] = useState(false);

  const router = useRouter();

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleStudentClick = (studentId: string) => {
    router.push(`/schoolAdmin/students/${studentId}`);
  };

  // 1. Fetch Students (Pass ALL filters to Backend)
  const { data: studentResponse, isLoading, isFetching } = useGetStudentsQuery(
    {
      class_id: selectedClassId,
      search: searchQuery,
      // If status is 'ALL' or empty, don't send it. If specific, send it.
      // (Assumes you add 'status' to your API slice definition)
      // status: statusFilter === 'ALL' ? undefined : statusFilter, 
      page: page + 1,
      limit: rowsPerPage
    },
    { skip: !selectedClassId }
  );

  // 2. Use Data Directly (No Client-Side Filtering)
  const students = studentResponse?.students || (studentResponse as any)?.data || [];
  const totalCount = studentResponse?.total || 0;

  // Pagination Handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Debounce Search (Optional optimization, for now direct state update)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page on new search
  };

  // Class Logic
  const selectedClassroom = useMemo(() => {
    return classrooms.find(c => (c._id || c.id) === selectedClassId);
  }, [classrooms, selectedClassId]);

  const teacherName = useMemo(() => {
    if (!selectedClassroom) return undefined;
    if (selectedClassroom.teacher_id?.name) return selectedClassroom.teacher_id.name;
    if (selectedClassroom.teacherId) return getTeacherById(selectedClassroom.teacherId)?.name;
    return "Unassigned";
  }, [selectedClassroom]);

  // Stats (Note: These are now page-specific unless backend sends total stats)
  const stats = useMemo(() => ({
    total: totalCount, // Total from backend
    boys: students.filter((s: any) => (s.gender || '').toLowerCase() === 'male').length,
    girls: students.filter((s: any) => (s.gender || '').toLowerCase() === 'female').length
  }), [students, totalCount]);

  if (!selectedClassroom) return <EmptyState />;

  return (
    <Box sx={{ flex: 1, display: { xs: !selectedClassId && isMobile ? 'none' : 'flex', md: 'flex' }, flexDirection: 'column', bgcolor: COLORS.background, height: '100%', overflow: 'hidden' }}>

      {/* --- HEADER --- */}
      <Box sx={{ p: 2.5, bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {isMobile && <IconButton onClick={onBack} size="small"><ArrowBack /></IconButton>}
            <Box>
              <Typography variant="h5" fontWeight={700}>{selectedClassroom.name}-{selectedClassroom.section}</Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: getAvatarColor(teacherName || "T"), fontSize: '0.75rem' }}>{getInitials(teacherName || "T")}</Avatar>
                <Typography variant="body2" color="text.secondary">{teacherName}</Typography>
                <Tooltip title="Change Teacher">
                  <IconButton size="small" onClick={() => setAssignTeacherOpen(true)} sx={{ color: COLORS.primary }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Stack>
          <Button variant="contained" startIcon={<Add />} onClick={onAddStudent} sx={{ bgcolor: COLORS.secondary, '&:hover': { bgcolor: COLORS.secondaryDark } }}>Add Student</Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
          {/* Search Input */}
          <TextField
            size="small"
            placeholder="Search students..."
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search fontSize="small" sx={{ color: COLORS.textSecondary }} /></InputAdornment>
            }}
            sx={{ bgcolor: COLORS.background, '& fieldset': { border: 'none' }, borderRadius: 2 }}
          />

          {/* Filter (Visual only unless backend supports status filter) */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ bgcolor: COLORS.background, '& fieldset': { border: 'none' }, borderRadius: 2 }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="DROPPED">Dropped</MenuItem>
              <MenuItem value="ALUMNI">Alumni</MenuItem>
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
              {/* Show Loading Spinner if Fetching or Loading */}
              {(isLoading || isFetching) ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 10 }}><CircularProgress /></TableCell>
                </TableRow>
              ) : students.length > 0 ? (
                students.map((s: any) => (
                  <TableRow key={s._id || s.id} hover onClick={() => handleStudentClick(s._id || s.id)}>
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
                    <TableCell>
                      <Chip
                        label={s.status}
                        size="small"
                        sx={{
                          // Check both Upper and Lower case
                          bgcolor: alpha(
                            s.status.toLowerCase() === 'active' ? COLORS.success : COLORS.error,
                            0.1
                          ),
                          color: s.status.toLowerCase() === 'active' ? COLORS.success : COLORS.error,
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
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

        {/* Pagination Component */}
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
      <AssignTeacherDialog
        open={assignTeacherOpen}
        onClose={() => setAssignTeacherOpen(false)}
        classId={selectedClassId}
        currentTeacherId={selectedClassroom?.teacher_id?._id || selectedClassroom?.teacherId}
      />
    </Box>
  );
}