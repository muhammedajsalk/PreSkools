import React from 'react';
import { Card, CardContent, Box, Stack, Typography, Table, TableBody, TableRow, TableCell, Chip, Divider, alpha } from '@mui/material';
import { Person as PersonIcon, Cake as CakeIcon, Male as MaleIcon, Female as FemaleIcon, Bloodtype as BloodtypeIcon, Home as HomeIcon, MedicalServices as MedicalServicesIcon, Warning as WarningIcon, LocalHospital as LocalHospitalIcon, VerifiedUser as VerifiedUserIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { COLORS, StudentProfile } from './ProfileConfig';

export default function OverviewTab({ student }: { student: StudentProfile }) {
  return (
    <Stack spacing={3}>
      <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 2 }}>
        <Box sx={{ px: 2.5, py: 2, bgcolor: alpha(COLORS.primary, 0.04), borderBottom: '1px solid', borderColor: COLORS.divider }}>
          <Stack direction="row" alignItems="center" spacing={1}><PersonIcon sx={{ color: COLORS.primary }} /><Typography variant="subtitle1" fontWeight={600}>Personal Details</Typography></Stack>
        </Box>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableBody>
              <TableRow><TableCell sx={{ fontWeight: 500, color: COLORS.textSecondary, width: '40%', border: 0, py: 1.5 }}><Stack direction="row" spacing={1}><CakeIcon fontSize="small" /><span>Date of Birth</span></Stack></TableCell><TableCell sx={{ border: 0 }}>{student.dateOfBirth} ({student.age})</TableCell></TableRow>
              <TableRow><TableCell sx={{ fontWeight: 500, color: COLORS.textSecondary, border: 0 }}><Stack direction="row" spacing={1}>{student.gender === 'male' ? <MaleIcon fontSize="small" /> : <FemaleIcon fontSize="small" />}<span>Gender</span></Stack></TableCell><TableCell sx={{ border: 0, textTransform: 'capitalize' }}>{student.gender}</TableCell></TableRow>
              <TableRow><TableCell sx={{ fontWeight: 500, color: COLORS.textSecondary, border: 0 }}><Stack direction="row" spacing={1}><BloodtypeIcon fontSize="small" /><span>Blood Group</span></Stack></TableCell><TableCell sx={{ border: 0 }}><Chip label={student.medicalInfo.bloodGroup} size="small" sx={{ bgcolor: alpha(COLORS.error, 0.1), color: COLORS.error, fontWeight: 600 }} /></TableCell></TableRow>
              <TableRow><TableCell sx={{ fontWeight: 500, color: COLORS.textSecondary, border: 0 }}><Stack direction="row" spacing={1}><HomeIcon fontSize="small" /><span>Address</span></Stack></TableCell><TableCell sx={{ border: 0 }}>{student.address}, {student.city} - {student.pincode}</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 2 }}>
        <Box sx={{ px: 2.5, py: 2, bgcolor: alpha(COLORS.error, 0.04), borderBottom: '1px solid', borderColor: COLORS.divider }}>
          <Stack direction="row" alignItems="center" spacing={1}><MedicalServicesIcon sx={{ color: COLORS.error }} /><Typography variant="subtitle1" fontWeight={600}>Medical Information</Typography></Stack>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Stack spacing={2.5}>
            {student.medicalInfo.allergies.length > 0 && <Box><Typography variant="caption" color="text.secondary" fontWeight={600}>ALLERGIES</Typography><Stack direction="row" gap={1} mt={1}>{student.medicalInfo.allergies.map((a, i) => <Chip key={i} label={a} size="small" icon={<WarningIcon />} sx={{ bgcolor: alpha(COLORS.error, 0.1), color: COLORS.error }} />)}</Stack></Box>}
            <Box><Typography variant="caption" color="text.secondary" fontWeight={600}>CONDITIONS</Typography><Stack direction="row" gap={1} mt={1}>{student.medicalInfo.conditions.map((c, i) => <Chip key={i} label={c} size="small" icon={<LocalHospitalIcon />} sx={{ bgcolor: alpha(COLORS.warning, 0.1), color: COLORS.secondaryDark }} />)}</Stack></Box>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}