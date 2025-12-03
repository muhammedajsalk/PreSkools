'use client';
import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { Badge, School, Work, CalendarMonth, Class, Email } from '@mui/icons-material';
import dayjs from 'dayjs'; // ✅ Switched to dayjs (consistent with project)
import { Teacher, COLORS } from './TeacherDetailsConfig';

export default function TeacherOverview({ teacher }: { teacher: Teacher }) {
  
  // Helper Component
  const Item = ({ icon, label, value, highlight }: any) => (
    <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: 'grey.50', height: '100%' }}>
      <Stack direction="row" alignItems="center" gap={1} mb={1}>
        {icon}
        <Typography variant="body2" color="text.secondary" fontWeight={500}>{label}</Typography>
      </Stack>
      <Typography variant="body1" fontWeight={600} color={highlight ? 'text.primary' : 'inherit'}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, color: COLORS.tealDark }}>
          <Badge sx={{ fontSize: 24 }} /> Professional Overview
        </Typography>

        {/* ✅ FIXED: Replaced Grid with CSS Grid Box */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, // 1 col mobile, 2 cols desktop
            gap: 3 
          }}
        >
          
          <Item 
            icon={<School sx={{ fontSize: 20, color: COLORS.teal }} />} 
            label="Qualification" 
            value={teacher.qualification} 
          />
          
          <Item 
            icon={<Work sx={{ fontSize: 20, color: COLORS.orange }} />} 
            label="Total Experience" 
            value={teacher.experience} 
          />
          
          <Item 
            icon={<CalendarMonth sx={{ fontSize: 20, color: COLORS.purple }} />} 
            label="Joining Date" 
            value={dayjs(teacher.joiningDate).format('MMMM DD, YYYY')} 
          />
          
          <Item 
            icon={<Class sx={{ fontSize: 20, color: COLORS.blue }} />} 
            label="Assigned Class" 
            value={teacher.classAssigned || 'Not Assigned Yet'} 
            highlight={!!teacher.classAssigned} 
          />

          {/* Full width item for Email */}
          <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
            <Item 
              icon={<Email sx={{ fontSize: 20, color: COLORS.tealDark }} />} 
              label="Email Address" 
              value={teacher.email} 
            />
          </Box>

        </Box>
      </CardContent>
    </Card>
  );
}