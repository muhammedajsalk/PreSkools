'use client';
import React from 'react';
// 1. Import CardActionArea
import { Card, CardContent, Box, Avatar, Typography, Stack, Divider, Tooltip, Chip, FormControlLabel, Switch, CardActionArea } from '@mui/material';
import { School, Work, Phone, Email, CheckCircle, Warning } from '@mui/icons-material';
import { format } from 'date-fns';
import { Teacher, COLORS, getAvatarColor, getInitials, formatPhone } from './TeacherConfig';
import dayjs from 'dayjs';

// 2. Add 'onClick' to interface
interface Props { 
  teacher: Teacher; 
  onToggleStatus: (id: string) => void;
  onClick: () => void; // <--- NEW PROP
}

export default function TeacherCard({ teacher, onToggleStatus, onClick }: Props) {
  
  // Helper to stop click from bubbling up to the Card
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        borderRadius: 3, 
        border: '1px solid', 
        borderColor: teacher.isActive ? 'divider' : COLORS.errorLight, 
        opacity: teacher.isActive ? 1 : 0.75, 
        position: 'relative', 
        overflow: 'hidden',
        transition: 'all 0.3s', 
        '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', borderColor: COLORS.teal } 
      }}
    >
      {/* 3. Wrap content in CardActionArea for click effect */}
      <CardActionArea onClick={onClick} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
        
        <Box sx={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, borderRadius: '50%', bgcolor: teacher.isActive ? COLORS.success : COLORS.error, boxShadow: `0 0 0 3px ${teacher.isActive ? COLORS.successLight : COLORS.errorLight}` }} />
        
        <CardContent sx={{ p: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2.5 }}>
            <Avatar src={teacher.avatar} sx={{ width: 88, height: 88, bgcolor: getAvatarColor(teacher.fullName), fontSize: '1.75rem', fontWeight: 700, mb: 2, border: '4px solid', borderColor: teacher.isActive ? COLORS.tealLight : 'grey.200' }}>{getInitials(teacher.fullName)}</Avatar>
            <Typography variant="h6" fontWeight={700} textAlign="center">{teacher.fullName}</Typography>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 1 }}><School sx={{ fontSize: 16, color: COLORS.teal }} /><Typography variant="body2" color="text.secondary" noWrap>{teacher.qualification}</Typography></Stack>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.5 }}><Work sx={{ fontSize: 16, color: COLORS.orange }} /><Typography variant="body2" color="text.secondary">{teacher.experience}</Typography></Stack>
          </Box>

          <Divider sx={{ my: 2 }} />
          
          {/* STOP PROPAGATION on links so clicking phone/email doesn't open profile */}
          <Stack spacing={1.5} onClick={handleStopPropagation}>
            <Tooltip title="Call"><Box component="a" href={`tel:+${teacher.phone}`} sx={{ display: 'flex', gap: 1.5, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: COLORS.tealDark } }}><Phone sx={{ fontSize: 20 }} /><Typography variant="body2">{formatPhone(teacher.phone)}</Typography></Box></Tooltip>
            <Tooltip title="Email"><Box component="a" href={`mailto:${teacher.email}`} sx={{ display: 'flex', gap: 1.5, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: COLORS.tealDark } }}><Email sx={{ fontSize: 20 }} /><Typography variant="body2" noWrap>{teacher.email}</Typography></Box></Tooltip>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip icon={teacher.classAssigned ? <CheckCircle style={{fontSize: 16}} /> : <Warning style={{fontSize: 16}} />} label={teacher.classAssigned || 'Unassigned'} size="small" sx={{ bgcolor: teacher.classAssigned ? COLORS.tealLight : COLORS.orangeLight, color: teacher.classAssigned ? COLORS.tealDark : COLORS.orangeDark, fontWeight: 600, fontSize: '0.75rem' }} />
            
            {/* STOP PROPAGATION on Switch */}
            <div onClick={handleStopPropagation}>
              <FormControlLabel 
                control={<Switch checked={teacher.isActive} onChange={() => onToggleStatus(teacher.id)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: COLORS.teal }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: COLORS.teal } }} />} 
                label={<Typography variant="caption" fontWeight={500} color={teacher.isActive ? 'success.main' : 'error.main'}>{teacher.isActive ? 'Active' : 'Inactive'}</Typography>} 
                labelPlacement="start" 
                sx={{ m: 0, gap: 0.5 }} 
              />
            </div>
          </Box>
          
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            Joined: {dayjs(teacher.joiningDate).format('MMM DD, YYYY')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}