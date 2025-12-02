'use client';
import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Avatar, Box, Typography, Chip, Tooltip, IconButton, alpha } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Chat';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Student, COLORS, getAvatarColor, getInitials, formatPhone } from './RosterConfig';

interface Props {
  students: Student[];
  onClick: (id: string) => void;
  onCall: (e: React.MouseEvent, phone: string) => void;
  onMessage: (e: React.MouseEvent, id: string) => void;
}

export default function StudentTable({ students, onClick, onCall, onMessage }: Props) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(COLORS.primary, 0.04) }}>
            <TableCell sx={{ fontWeight: 600, py: 2 }}>Student</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Roll No</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Parent Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id} hover onClick={() => onClick(s.id)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: alpha(COLORS.primary, 0.02) }, '&:last-child td': { border: 0 } }}>
              <TableCell><Stack direction="row" alignItems="center" spacing={1.5}><Avatar sx={{ width: 40, height: 40, bgcolor: getAvatarColor(s.name, s.gender), fontSize: '0.9rem', fontWeight: 600 }}>{getInitials(s.name)}</Avatar><Box><Typography variant="body2" fontWeight={600}>{s.name}</Typography><Typography variant="caption" color="text.secondary">{s.admissionNo}</Typography></Box></Stack></TableCell>
              <TableCell><Chip label={`#${s.rollNo}`} size="small" sx={{ bgcolor: alpha(COLORS.textSecondary, 0.1), fontWeight: 600, fontFamily: 'monospace' }} /></TableCell>
              <TableCell><Stack direction="row" alignItems="center" spacing={0.5}>{s.gender === 'male' ? <MaleIcon sx={{ fontSize: 18, color: COLORS.male }} /> : <FemaleIcon sx={{ fontSize: 18, color: COLORS.female }} />}<Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{s.gender}</Typography></Stack></TableCell>
              <TableCell><Typography variant="body2">{s.parent.name}</Typography><Typography variant="caption" color="text.secondary">({s.parent.relation})</Typography></TableCell>
              <TableCell><Typography variant="body2" sx={{ color: COLORS.primary, '&:hover': { textDecoration: 'underline' } }} onClick={(e) => onCall(e, s.parent.phone)}>{s.parent.phone}</Typography></TableCell>
              <TableCell><Chip label={s.isPresent ? 'Present' : 'Absent'} size="small" sx={{ bgcolor: s.isPresent ? COLORS.successLight : COLORS.errorLight, color: s.isPresent ? COLORS.success : COLORS.error, fontWeight: 600, fontSize: '0.7rem' }} /></TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                  <Tooltip title="Call"><IconButton size="small" onClick={(e) => onCall(e, s.parent.phone)} sx={{ color: COLORS.primary }}><PhoneIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Message"><IconButton size="small" onClick={(e) => onMessage(e, s.id)} sx={{ color: COLORS.secondary }}><MessageIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Profile"><IconButton size="small" sx={{ color: COLORS.textSecondary }}><ChevronRightIcon fontSize="small" /></IconButton></Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}