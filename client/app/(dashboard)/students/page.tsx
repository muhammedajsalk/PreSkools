'use client';
import React, { useState, useMemo } from 'react';
import { Box, Stack, Typography, Button, alpha, useMediaQuery, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { COLORS, MOCK_STUDENTS, StatusType } from '../../../src/components/students/StudentConfig';
import StudentFilterBar from '../../../src/components/students/StudentFilterBar';
import StudentTable from '../../../src/components/students/StudentTable';
import ActionMenu from '../../../src/components/students/ActionMenu';

export default function StudentDirectoryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State
  const [students] = useState(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filters
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.admissionNo.includes(searchQuery);
      const matchClass = classFilter === 'all' || s.classId === classFilter;
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchClass && matchStatus;
    });
  }, [students, searchQuery, classFilter, statusFilter]);

  const paginatedStudents = useMemo(() => filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredStudents, page, rowsPerPage]);

  const stats = { total: students.length, active: students.filter(s => s.status === 'active').length, filtered: filteredStudents.length };

  const handleActionOpen = (e: React.MouseEvent<HTMLElement>, id: string) => { setActionAnchor(e.currentTarget); setSelectedId(id); };
  const handleActionClose = () => { setActionAnchor(null); setSelectedId(null); };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: COLORS.background, minHeight: '100vh' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>Student Directory</Typography>
          <Typography variant="body2" color="text.secondary">Manage all students across all classes</Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: COLORS.primary, color: COLORS.primary, fontWeight: 600 }}>{isMobile ? 'Export' : 'Export CSV'}</Button>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: COLORS.secondary, fontWeight: 600, '&:hover': { bgcolor: COLORS.secondaryDark } }}>{isMobile ? 'Add' : 'Add Student'}</Button>
        </Stack>
      </Stack>

      <StudentFilterBar searchQuery={searchQuery} setSearchQuery={(v) => { setSearchQuery(v); setPage(0); }} classFilter={classFilter} setClassFilter={(v) => { setClassFilter(v); setPage(0); }} statusFilter={statusFilter} setStatusFilter={(v) => { setStatusFilter(v); setPage(0); }} stats={stats} />
      
      <StudentTable students={paginatedStudents} page={page} rowsPerPage={rowsPerPage} onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} onActionMenu={handleActionOpen} searchQuery={searchQuery} count={filteredStudents.length} />
      
      <ActionMenu anchorEl={actionAnchor} onClose={handleActionClose} onView={handleActionClose} onEdit={handleActionClose} onDelete={handleActionClose} />
    </Box>
  );
}