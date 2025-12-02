import React, { useMemo } from 'react';
import { Box, Stack, Typography, Button, TextField, InputAdornment, Card, CardActionArea, CardContent, Badge, Avatar, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { COLORS, Classroom, Student, getTeacherById, getAvatarColor, getInitials } from './AcademicConfig';

interface Props {
  classrooms: Classroom[];
  students: Student[];
  selectedClassId: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelect: (id: string) => void;
  onCreate: () => void;
  isMobile: boolean;
}

export default function ClassList({ classrooms, students, selectedClassId, searchQuery, setSearchQuery, onSelect, onCreate, isMobile }: Props) {
  const filteredClassrooms = useMemo(() => {
    if (!searchQuery.trim()) return classrooms;
    return classrooms.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [classrooms, searchQuery]);

  return (
    <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: { md: 300 }, maxWidth: { md: 380 }, bgcolor: COLORS.cardBg, borderRight: { md: '1px solid' }, borderColor: 'divider', display: { xs: selectedClassId && isMobile ? 'none' : 'flex', md: 'flex' }, flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={700}>Classrooms</Typography>
          <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={onCreate} sx={{ bgcolor: COLORS.primary, '&:hover': { bgcolor: COLORS.primaryDark } }}>Create</Button>
        </Stack>
        <TextField fullWidth size="small" placeholder="Search classes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={1.5}>
          {filteredClassrooms.map((c) => {
            const teacher = getTeacherById(c.teacherId);
            const count = students.filter(s => s.classId === c.id).length;
            const isSelected = selectedClassId === c.id;
            return (
              <Card key={c.id} elevation={isSelected ? 2 : 0} sx={{ border: isSelected ? `2px solid ${COLORS.primary}` : '1px solid divider', bgcolor: isSelected ? alpha(COLORS.primary, 0.04) : COLORS.cardBg }}>
                <CardActionArea onClick={() => onSelect(c.id)}>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                          <Typography variant="h6" fontWeight={700}>{c.name}-{c.section}</Typography>
                          <Badge badgeContent={count} color="primary"><GroupsIcon fontSize="small" sx={{ color: COLORS.textSecondary }} /></Badge>
                        </Stack>
                        {teacher && <Stack direction="row" alignItems="center" spacing={1}><Avatar sx={{ width: 24, height: 24, bgcolor: getAvatarColor(teacher.name), fontSize: '0.7rem' }}>{getInitials(teacher.name)}</Avatar><Typography variant="body2" color="text.secondary">{teacher.name}</Typography></Stack>}
                      </Box>
                      <ChevronRightIcon sx={{ color: isSelected ? COLORS.primary : COLORS.textSecondary }} />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}