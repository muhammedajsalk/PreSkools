'use client';
import React from 'react';
import { Box, Stack, Typography, Chip, Divider, Card, CardContent, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoodIcon from '@mui/icons-material/Mood';
import ActivityIcon from '@mui/icons-material/DirectionsRun';
import TempIcon from '@mui/icons-material/Thermostat';
import CloseIcon from '@mui/icons-material/Close'; // For Absent status

// Assuming ParentConfig provides necessary types and COLORS
import { COLORS, TodayOverview } from './ParentConfig'; 

// Helper logic integrated here for simplicity, or imported from ParentConfig
const getMoodConfig = (mood: string) => {
    const normMood = mood ? mood.toLowerCase() : 'normal';
    if (normMood === 'happy') return { label: 'Happy', color: COLORS.success, icon: <MoodIcon /> };
    if (normMood === 'tired' || normMood === 'sleepy') return { label: 'Tired', color: COLORS.info, icon: <MoodIcon /> };
    return { label: 'Content', color: COLORS.warning, icon: <MoodIcon /> };
};

const getAttendanceConfig = (status: string) => {
    const normStatus = status ? status.toLowerCase() : 'absent';
    if (normStatus === 'present') return { label: 'Present', icon: <CheckCircleIcon />, color: COLORS.success };
    return { label: 'Absent', icon: <CloseIcon />, color: COLORS.error };
};

export default function TodayOverviewCard({ overview, childName, isCompact = false }: { overview: TodayOverview; childName: string; isCompact?: boolean }) {
  
    console.log("overrive",overview)

    const moodConfig = getMoodConfig(overview.mood);
    const attendanceConfig = getAttendanceConfig(overview.attendanceStatus);
    
    // Fallback for gradient if missing in COLORS
    const gradient = (COLORS as any).gradientPrimary || COLORS.primary;

    return (
        <Card elevation={0} sx={{ borderRadius: 5, overflow: 'hidden', background: gradient, color: 'white', boxShadow: `0 10px 40px ${alpha(COLORS.primary, 0.3)}` }}>
            <CardContent sx={{ p: isCompact ? 2.5 : 3 }}>
                <Stack spacing={isCompact ? 2 : 2.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                            <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1 }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</Typography>
                            <Typography variant={isCompact ? 'h6' : 'h5'} fontWeight={700}>{childName}'s Day</Typography>
                        </Box>
                        
                        {/* 1. DYNAMIC CHIPS */}
                        <Stack direction="row" spacing={1}>
                            <Chip 
                                icon={React.cloneElement(moodConfig.icon as React.ReactElement, { sx: { color: 'white !important', fontSize: 16 } })} 
                                label={moodConfig.label} 
                                size="small" 
                                sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600 }} 
                            />
                            <Chip 
                                icon={React.cloneElement(attendanceConfig.icon as React.ReactElement, { sx: { color: 'white !important', fontSize: 16 } })} 
                                label={attendanceConfig.label} 
                                size="small" 
                                sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600 }} 
                            />
                            
                            {/* 2. TEMPERATURE CHIP */}
                            {/* {overview.temperature && (
                                <Chip 
                                    icon={<TempIcon sx={{ color: 'white !important', fontSize: 16 }} />} 
                                    label={overview.temperature} 
                                    size="small" 
                                    sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 600 }} 
                                />
                            )} */}
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ bgcolor: alpha('#fff', 0.12), borderRadius: 3, p: 2 }}>
                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mb={0.5}><CheckCircleIcon sx={{ fontSize: 18, opacity: 0.8 }} /><Typography variant="caption" sx={{ opacity: 0.85 }}>Checked In</Typography></Stack>
                            <Typography variant="h6" fontWeight={700}>{overview.checkInTime || 'N/A'}</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ bgcolor: alpha('#fff', 0.2) }} />
                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mb={0.5}><ActivityIcon sx={{ fontSize: 18, opacity: 0.8 }} /><Typography variant="caption" sx={{ opacity: 0.85 }}>Last Activity</Typography></Stack>
                            <Typography variant="h6" fontWeight={700}>{overview.currentActivity || 'Free Play'}</Typography>
                        </Box>
                    </Stack>

                    {/* <Box sx={{ bgcolor: alpha('#fff', 0.12), borderRadius: 3, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: alpha('#fff', 0.2), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AccessTimeIcon sx={{ fontSize: 20 }} /></Box>
                            <Box><Typography variant="caption" sx={{ opacity: 0.8 }}>Coming Up Next</Typography><Typography variant="subtitle2" fontWeight={600}>{overview.nextActivity || 'Check Out'}</Typography></Box>
                        </Stack>
                        <Chip label={overview.nextActivityTime || 'TBD'} size="small" sx={{ bgcolor: alpha('#fff', 0.2), color: 'white', fontWeight: 700 }} />
                    </Box> */}
                </Stack>
            </CardContent>
        </Card>
    );
}