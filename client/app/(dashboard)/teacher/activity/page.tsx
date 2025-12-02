'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { Box, Stack, Typography, IconButton, FormControlLabel, Switch, Snackbar, Alert, Card, CardContent, alpha } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { COLORS, ACTIVITY_CONFIGS, MOCK_STUDENTS, CLASS_INFO, ActivityType, getCurrentTime, MealFormData, NapFormData,HygieneFormData,LearningFormData,PhotoFormData } from '../../../../src/components/teacher/activity/ActivityConfig';
import ActivitySelector from '../../../../src/components/teacher/activity/ActivitySelector';
import StudentSelector from '../../../../src/components/teacher/activity/StudentSelector';
import { MealForm, NapForm,HygieneForm,LearningForm,PhotoForm } from '../../../../src/components/teacher/activity/ActivityForms';
import BottomActionBar from '../../../../src/components/teacher/activity/BottomActionBar';

export default function TeacherActivityLogPage() {
  // --- 1. UI State ---
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>('meal');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ 
    open: false, message: '', severity: 'success' 
  });

  // --- 2. Form Data State (One state per activity type) ---
  const [mealData, setMealData] = useState<MealFormData>({ foodItem: '', quantity: 'all', notes: '' });
  const [napData, setNapData] = useState<NapFormData>({ startTime: getCurrentTime(), duration: 60, quality: 'good' });
  const [hygieneData, setHygieneData] = useState<HygieneFormData>({ type: 'handwash', notes: '' });
  const [learningData, setLearningData] = useState<LearningFormData>({ activity: '', participation: 'active', notes: '' });
  const [photoData, setPhotoData] = useState<PhotoFormData>({ caption: '', photos: [] });

  // --- 3. Computed Values ---
  const currentConfig = useMemo(() => 
    ACTIVITY_CONFIGS.find((a) => a.id === selectedActivity)!, 
  [selectedActivity]);

  // --- 4. Handlers ---

  // Handle toggling individual students
  const handleStudentToggle = useCallback((id: string) => {
    setSelectedStudents(prev => {
      const isSelected = prev.includes(id);
      
      if (isSelected) {
        // Unselect
        setSelectAll(false);
        return prev.filter(s => s !== id);
      } else {
        // Select
        const newSelection = [...prev, id];
        // Check if all are now selected
        if (newSelection.length === MOCK_STUDENTS.length) {
          setSelectAll(true);
        }
        return newSelection;
      }
    });
  }, []);

  // Handle "Select All" Switch
  const handleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedStudents([]);
      setSelectAll(false);
    } else {
      setSelectedStudents(MOCK_STUDENTS.map(s => s.id));
      setSelectAll(true);
    }
  }, [selectAll]);

  // Handle Submit Button
  const handleSubmit = async () => {
    if (selectedStudents.length === 0) return;

    setSaving(true);
    
    // Simulate API Call
    await new Promise(r => setTimeout(r, 1500));
    
    // In real app: POST /api/activity/log with formData
    console.log(`Logged ${selectedActivity} for`, selectedStudents);

    setSaving(false);
    setSnackbar({ 
      open: true, 
      message: `${currentConfig.label} Logged Successfully!`, 
      severity: 'success' 
    });
    
    // Optional: Reset selection after submit
    setSelectedStudents([]);
    setSelectAll(false);
  };

  // --- 5. Render Logic ---
  const renderForm = () => {
    const color = currentConfig.color;
    switch (selectedActivity) {
      case 'meal': return <MealForm data={mealData} onChange={setMealData} color={color} />;
      case 'nap': return <NapForm data={napData} onChange={setNapData} color={color} />;
      case 'hygiene': return <HygieneForm data={hygieneData} onChange={setHygieneData} color={color} />;
      case 'learning': return <LearningForm data={learningData} onChange={setLearningData} color={color} />;
      case 'photo': return <PhotoForm data={photoData} onChange={setPhotoData} color={color} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: { xs: 20, sm: 16 } }}>
      
      {/* --- Header (Sticky) --- */}
      <Box sx={{ bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider, position: 'sticky', top: 0, zIndex: 30 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton component={Link} href="/teacher" sx={{ color: COLORS.textSecondary }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700} color="text.primary">Log Activity</Typography>
              <Typography variant="caption" color="text.secondary">{CLASS_INFO.name}-{CLASS_INFO.section}</Typography>
            </Box>
          </Stack>
          
          <FormControlLabel 
            control={
              <Switch 
                checked={selectAll} 
                onChange={handleSelectAll} 
                sx={{ 
                  '& .MuiSwitch-switchBase.Mui-checked': { color: currentConfig.color }, 
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: currentConfig.color } 
                }} 
              />
            } 
            label={<Typography variant="caption" fontWeight={600}>All</Typography>} 
            labelPlacement="start" 
            sx={{ mr: 0 }} 
          />
        </Stack>
        
        {/* Horizontal Activity List */}
        <ActivitySelector selectedActivity={selectedActivity} onSelect={setSelectedActivity} />
      </Box>

      {/* --- Student Grid --- */}
      <StudentSelector 
        selectedStudents={selectedStudents} 
        onToggle={handleStudentToggle} 
        activeColor={currentConfig.color} 
      />

      {/* --- Dynamic Form Card --- */}
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>
          {currentConfig.label.toUpperCase()} DETAILS
        </Typography>
        
        <Card elevation={0} sx={{ border: '2px solid', borderColor: alpha(currentConfig.color, 0.3), borderRadius: 3, bgcolor: alpha(currentConfig.bgColor, 0.3) }}>
          <CardContent sx={{ p: 2.5 }}>
            {renderForm()}
          </CardContent>
        </Card>
      </Box>

      {/* --- Bottom Sticky Footer --- */}
      <BottomActionBar 
        selectedStudents={selectedStudents} 
        onSubmit={handleSubmit} 
        saving={saving} 
        canSubmit={selectedStudents.length > 0} 
        activityLabel={currentConfig.label} 
        activityIcon={currentConfig.icon} 
        color={currentConfig.color} 
      />

      {/* --- Feedback Snackbar --- */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}