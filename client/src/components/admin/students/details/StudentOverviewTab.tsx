'use client';
import React from 'react';
import { Card, CardContent, Box, Typography, Stack, alpha, Chip, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning'; // Guardian Icon
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'; // Transport Icon
import { StudentProfile, COLORS } from './StudentDetailsConfig';

export default function StudentOverviewTab({ student }: { student: StudentProfile }) {
  
  // Helper to render a Card
  const InfoCard = ({ title, icon, children }: any) => (
    <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</Box>
          <Typography variant="h6" fontWeight={600}>{title}</Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  // Helper for Rows
  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', py: 1, borderBottom: '1px dashed', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140, fontWeight: 500 }}>{label}</Typography>
      <Typography variant="body2" fontWeight={500}>{value || '-'}</Typography>
    </Box>
  );

  // Check if guardian exists to conditional render
  const hasGuardian = student.parent.guardianName && student.parent.guardianName.trim() !== '';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
      
      {/* 1. Father */}
      <InfoCard title="Father's Details" icon={<PersonIcon sx={{ color: COLORS.primary }} />}>
        <Stack spacing={0}>
          <InfoRow label="Name" value={student.parent.fatherName} />
          <InfoRow label="Occupation" value={student.parent.fatherOccupation} />
          <InfoRow label="Phone" value={student.parent.fatherPhone} />
          <InfoRow label="Email" value={student.parent.fatherEmail} />
        </Stack>
      </InfoCard>

      {/* 2. Mother */}
      <InfoCard title="Mother's Details" icon={<PersonIcon sx={{ color: COLORS.primary }} />}>
        <Stack spacing={0}>
          <InfoRow label="Name" value={student.parent.motherName} />
          <InfoRow label="Occupation" value={student.parent.motherOccupation} />
          <InfoRow label="Phone" value={student.parent.motherPhone} />
          <InfoRow label="Email" value={student.parent.motherEmail} />
        </Stack>
      </InfoCard>

      {/* 3. Guardian (Conditional) */}
      {hasGuardian && (
        <Box sx={{ gridColumn: { md: '1 / -1' } }}>
          <InfoCard title="Guardian's Details" icon={<EscalatorWarningIcon sx={{ color: COLORS.warning }} />}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <InfoRow label="Name" value={student.parent.guardianName || ''} />
              <InfoRow label="Relation" value={student.parent.guardianRelation || ''} />
              <InfoRow label="Phone" value={student.parent.guardianPhone || ''} />
            </Box>
          </InfoCard>
        </Box>
      )}

      {/* 4. Contact */}
      <InfoCard title="Contact Information" icon={<PhoneIcon sx={{ color: COLORS.primary }} />}>
        <Stack spacing={0}>
          <InfoRow label="Phone" value={student.contact.phone} />
          <InfoRow label="Email" value={student.contact.email} />
          <InfoRow label="Emergency Contact" value={student.contact.emergencyContact} />
          <InfoRow label="Emergency Relation" value={student.contact.emergencyRelation} />
        </Stack>
      </InfoCard>

      {/* 5. Address */}
      <InfoCard title="Address" icon={<LocationOnIcon sx={{ color: COLORS.primary }} />}>
        <Stack spacing={0}>
          <InfoRow label="Street" value={student.address.street} />
          <InfoRow label="City" value={student.address.city} />
          <InfoRow label="State" value={student.address.state} />
          <InfoRow label="Zip Code" value={student.address.zipCode} />
          <InfoRow label="Country" value={student.address.country || 'India'} />
        </Stack>
      </InfoCard>

      {/* 6. Medical Info */}
      <Box sx={{ gridColumn: { md: '1 / -1' } }}>
        <InfoCard title="Medical Information" icon={<LocalHospitalIcon sx={{ color: COLORS.error }} />}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 2 }}>
            <Box sx={{ flex: 1, p: 2, bgcolor: alpha(COLORS.error, 0.05), borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="error">{student.medicalInfo?.bloodGroup || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">Blood Group</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2, bgcolor: alpha(COLORS.primary, 0.05), borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: COLORS.primary }}>{student.gender}</Typography>
              <Typography variant="body2" color="text.secondary">Gender</Typography>
            </Box>
          </Box>
          
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Allergies & Conditions:</Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>
              {student.medicalInfo?.allergies?.map((a) => <Chip key={a} label={a} size="small" color="error" variant="outlined" />)}
              {student.medicalInfo?.conditions?.map((c) => <Chip key={c} label={c} size="small" color="warning" variant="outlined" />)}
              {(!student.medicalInfo?.allergies?.length && !student.medicalInfo?.conditions?.length) && <Typography variant="body2" color="text.secondary">None recorded</Typography>}
          </Stack>

          <Divider sx={{ my: 1 }} />
          <InfoRow label="Doctor Name" value={student.medicalInfo?.doctorName || ''} />
          <InfoRow label="Doctor Phone" value={student.medicalInfo?.doctorPhone || ''} />
        </InfoCard>
      </Box>

      {/* 7. Transport Info */}
      <InfoCard title="Transport Details" icon={<DirectionsBusIcon sx={{ color: COLORS.warning }} />}>
        <Stack spacing={0}>
          {/* Access safely via 'any' casting if transport isn't in the strict type yet */}
          <InfoRow label="Mode" value={(student as any).transport?.mode || 'PRIVATE'} />
          <InfoRow label="Route / Area" value={(student as any).transport?.route_name || '-'} />
          <InfoRow label="Pickup Point" value={(student as any).transport?.pickup_point || '-'} />
        </Stack>
      </InfoCard>

    </Box>
  );
}