'use client';
import React from 'react';
import { Box, Stack, Typography, Chip, Card, CardContent, Avatar, Badge, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import { getAvatarColor, getInitials } from './ActivityConfig';

interface Props {
  selectedStudents: string[];
  onToggle: (id: string) => void;
  activeColor: string;
  // 1. Add students prop
  students: any[]; 
}

export default function StudentSelector({ 
  selectedStudents, 
  onToggle, 
  activeColor, 
  students = [] // 2. Default to empty array
}: Props) {
  
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
          SELECT STUDENTS
        </Typography>
        <Chip 
          icon={<GroupsIcon sx={{ fontSize: 16 }} />} 
          label={`${selectedStudents.length}/${students.length} selected`} 
          size="small" 
          sx={{ 
            bgcolor: selectedStudents.length > 0 ? alpha(activeColor, 0.1) : 'action.hover', 
            color: selectedStudents.length > 0 ? activeColor : 'text.secondary', 
            fontWeight: 600, 
            '& .MuiChip-icon': { color: 'inherit' } 
          }} 
        />
      </Stack>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', mx: -0.5 }}>
            
            {/* 3. Map over the PASSED students prop, not MOCK_STUDENTS */}
            {students.map((student) => {
              // Handle both _id (Real) and id (Mapped)
              const studentId = student.id || student._id;
              const isSelected = selectedStudents.includes(studentId);
              
              return (
                <Box 
                  key={studentId} 
                  sx={{ width: { xs: 'calc(25% - 4px)', sm: 'calc(16.666% - 4px)' }, minWidth: 72, m: 0.25 }}
                >
                  <Box 
                    onClick={() => onToggle(studentId)} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      cursor: 'pointer', 
                      p: 1, 
                      borderRadius: 2, 
                      transition: 'all 0.2s ease', 
                      bgcolor: isSelected ? alpha(activeColor, 0.08) : 'transparent', 
                      '&:hover': { bgcolor: alpha(activeColor, 0.04) }, 
                      '&:active': { transform: 'scale(0.95)' } 
                    }}
                  >
                    <Badge 
                      overlap="circular" 
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
                      badgeContent={isSelected ? (
                        <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: activeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                          <CheckCircleIcon sx={{ fontSize: 14, color: 'white' }} />
                        </Box>
                      ) : null}
                    >
                      <Avatar 
                        sx={{ 
                          width: 56, 
                          height: 56, 
                          bgcolor: getAvatarColor(student.name, student.gender), 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          border: isSelected ? `3px solid ${activeColor}` : '3px solid transparent', 
                          opacity: isSelected ? 1 : 0.7, 
                          transition: 'all 0.2s ease', 
                          boxShadow: isSelected ? `0 0 0 3px ${alpha(activeColor, 0.2)}` : 'none' 
                        }}
                      >
                        {getInitials(student.name)}
                      </Avatar>
                    </Badge>
                    <Typography 
                      variant="caption" 
                      fontWeight={isSelected ? 600 : 400} 
                      color={isSelected ? 'text.primary' : 'text.secondary'} 
                      sx={{ mt: 0.5, textAlign: 'center', maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {student.name.split(' ')[0]}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {students.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ p: 2, width: '100%', textAlign: 'center' }}>
                    No students found in this class.
                </Typography>
            )}

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}