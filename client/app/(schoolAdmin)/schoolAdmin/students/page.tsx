'use client';
import React, { useState } from 'react'; // Removed useMemo for filtering
import { Box, Stack, Typography, Button, alpha, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

// Config & Components
import { COLORS, StatusType } from '@/src/components/students/StudentConfig';
import StudentFilterBar from '@/src/components/students/StudentFilterBar';
import StudentTable from '@/src/components/students/StudentTable';
import ActionMenu from '@/src/components/students/ActionMenu';

// 1. Import API Hooks
import { useGetStudentsQuery, useGetClassesQuery } from '@/src/store/api/academicApiSlice';

export default function StudentDirectoryPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 2. State (Managed for Backend Query)
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all'); 
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // UI State
  const [actionAnchor, setActionAnchor] = useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 3. Fetch Classes (For the Filter Dropdown)
  const { data: classData } = useGetClassesQuery();
  const classes = classData?.data || [];

  // 4. Fetch Students (Pass filters to Backend)
  // ⚡️ This effectively moves filtering to the Backend!
  const { data: studentResponse, isLoading, isFetching } = useGetStudentsQuery({
    search: searchQuery,
    class_id: classFilter === 'all' ? undefined : classFilter, 
    // status: statusFilter === 'all' ? undefined : statusFilter, // Uncomment if backend supports status
    page: page + 1, // Backend expects 1-based page
    limit: rowsPerPage,
  });

  const students = studentResponse?.students || [];
  const totalCount = studentResponse?.total || 0;

  // 5. Handlers (Reset page when filter changes)
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setPage(0); // Reset to page 1 on new search
  };

  const handleClassFilter = (val: string) => {
    setClassFilter(val);
    setPage(0);
  };

  const handleActionOpen = (e: React.MouseEvent<HTMLElement>, id: string) => { 
    setActionAnchor(e.currentTarget); 
    setSelectedId(id); 
  };
  
  const handleActionClose = () => { 
    setActionAnchor(null); 
    setSelectedId(null); 
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: COLORS.background, minHeight: '100vh' }}>
      
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>Student Directory</Typography>
          <Typography variant="body2" color="text.secondary">Manage all students across all classes</Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: COLORS.primary, color: COLORS.primary, fontWeight: 600 }}>{isMobile ? 'Export' : 'Export CSV'}</Button>
        </Stack>
      </Stack>

      {/* Filter Bar */}
      <StudentFilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={handleSearch} 
        classFilter={classFilter} 
        setClassFilter={handleClassFilter} 
        statusFilter={statusFilter} 
        setStatusFilter={(v) => setStatusFilter(v)}
        stats={{ total: totalCount, active: 0, filtered: students.length }}
        classesList={classes} 
      />
      
      {/* Table */}
      {(isLoading || isFetching) && students.length === 0 ? (
         <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
      ) : (
        <StudentTable 
          students={students as any} 
          page={page} 
          rowsPerPage={rowsPerPage} 
          onPageChange={handleChangePage} 
          onRowsPerPageChange={handleChangeRowsPerPage} 
          onActionMenu={handleActionOpen} 
          searchQuery={searchQuery} 
          count={totalCount} 
        />
      )}
      
      <ActionMenu 
        anchorEl={actionAnchor} 
        onClose={handleActionClose} 
        onView={() => { if(selectedId) router.push(`/schoolAdmin/students/${selectedId}`); handleActionClose(); }} 
        onEdit={handleActionClose} 
        onDelete={handleActionClose} 
      />
    </Box>
  );
}