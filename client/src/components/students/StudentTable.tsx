'use client';
import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Avatar, Box, Typography, Chip, Link, IconButton, Tooltip, TablePagination, alpha } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { COLORS, Student, getAvatarColor, getInitials, getStatusConfig, formatPhone } from './StudentConfig';
import EmptyState from './EmptyState';

interface Props {
  students: Student[];
  page: number;
  rowsPerPage: number;
  onPageChange: (e: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onActionMenu: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  searchQuery: string;
  count: number;
}

export default function StudentTable({ students, page, rowsPerPage, onPageChange, onRowsPerPageChange, onActionMenu, searchQuery, count }: Props) {
  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(COLORS.primary, 0.04) }}>
              <TableCell sx={{ fontWeight: 600, color: COLORS.textPrimary, py: 2 }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 600, color: COLORS.textPrimary }}>Class</TableCell>
              <TableCell sx={{ fontWeight: 600, color: COLORS.textPrimary }}>Parent Info</TableCell>
              <TableCell sx={{ fontWeight: 600, color: COLORS.textPrimary }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 600, color: COLORS.textPrimary }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: COLORS.textPrimary }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 ? (
              students.map((student) => {
                const statusConfig = getStatusConfig(student.status);
                return (
                  <TableRow key={student.id} hover sx={{ '&:hover': { bgcolor: alpha(COLORS.primary, 0.02) } }}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ width: 44, height: 44, bgcolor: getAvatarColor(student.name), fontSize: '1rem', fontWeight: 600 }}>{getInitials(student.name)}</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600} color="text.primary">{student.name}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{student.admissionNo} • Roll #{student.rollNo}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Chip label={`${student.className}-${student.section}`} size="small" sx={{ bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primaryDark, fontWeight: 600 }} /></TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" color="text.primary">{student.parentName}</Typography>
                        <Link href={`tel:${formatPhone(student.parentPhone)}`} underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: COLORS.primary, fontSize: '0.75rem' }}><PhoneIcon sx={{ fontSize: 14 }} />{student.parentPhone}</Link>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        {student.gender === 'male' ? <MaleIcon fontSize="small" sx={{ color: COLORS.male }} /> : <FemaleIcon fontSize="small" sx={{ color: COLORS.female }} />}
                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{student.gender}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell><Chip label={statusConfig.label} size="small" sx={{ bgcolor: statusConfig.bgColor, color: statusConfig.color, fontWeight: 600, fontSize: '0.75rem' }} /></TableCell>
                    <TableCell align="right">
                      <Tooltip title="More actions"><IconButton size="small" onClick={(e) => onActionMenu(e, student.id)} sx={{ color: COLORS.textSecondary }}><MoreVertIcon fontSize="small" /></IconButton></Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow><TableCell colSpan={6} sx={{ border: 0 }}><EmptyState searchQuery={searchQuery} /></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {students.length > 0 && <TablePagination component="div" count={count} page={page} onPageChange={onPageChange} rowsPerPage={rowsPerPage} onRowsPerPageChange={onRowsPerPageChange} rowsPerPageOptions={[5, 10, 25, 50]} sx={{ borderTop: '1px solid', borderColor: COLORS.divider }} />}
    </Paper>
  );
}