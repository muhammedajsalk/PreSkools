'use client';
import React, { useState } from 'react';
import { Box, Stack, Button, Card, Tabs, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import DescriptionIcon from '@mui/icons-material/Description';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Link from 'next/link';
import { COLORS, STUDENT_PROFILE } from '../../../../src/components/students/profile/ProfileConfig';
import ProfileCard from '../../../../src/components/students/profile/ProfileCard';
import OverviewTab from '../../../../src/components/students/profile/OverviewTab';
import GuardianTab from '../../../../src/components/students/profile/GuardianTab';
// import DocumentsTab and TimelineTab similarly...

function TabPanel({ children, value, index }: { children?: React.ReactNode; value: number; index: number }) {
  return <Box hidden={value !== index} sx={{ py: 3 }}>{value === index && children}</Box>;
}

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState(0);
  const [student] = useState(STUDENT_PROFILE);

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh' }}>
      <Box sx={{ px: { xs: 2, sm: 3 }, pt: 3 }}>
        <Button component={Link} href="/students" startIcon={<ArrowBackIcon />} sx={{ color: COLORS.textSecondary }}>Back to Students</Button>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          <Box sx={{ width: { xs: '100%', md: '30%' }, minWidth: { md: 280 }, maxWidth: { md: 340 }, position: { md: 'sticky' }, top: { md: 24 } }}>
            <ProfileCard student={student} onEdit={() => console.log('Edit')} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: COLORS.divider, borderRadius: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ px: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 }, '& .MuiTabs-indicator': { bgcolor: COLORS.primary } }}>
                  <Tab icon={<PersonIcon />} iconPosition="start" label="Overview" />
                  <Tab icon={<EscalatorWarningIcon />} iconPosition="start" label="Guardians" />
                  <Tab icon={<DescriptionIcon />} iconPosition="start" label="Documents" />
                  <Tab icon={<ScheduleIcon />} iconPosition="start" label="Timeline" />
                </Tabs>
              </Box>
              <Box sx={{ px: 3, pb: 3 }}>
                <TabPanel value={activeTab} index={0}><OverviewTab student={student} /></TabPanel>
                <TabPanel value={activeTab} index={1}><GuardianTab guardians={student.guardians} /></TabPanel>
                {/* Add other panels */}
              </Box>
            </Card>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}