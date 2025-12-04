'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Box, Stack, Typography, IconButton, FormControlLabel, Switch, Card, CardContent, alpha, CircularProgress, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { toast } from 'sonner'; // Use Sonner for better toasts

// Config & Components
import {
  COLORS, ACTIVITY_CONFIGS, CLASS_INFO, ActivityType, getCurrentTime,
  MealFormData, NapFormData, HygieneFormData, LearningFormData, PhotoFormData
} from '@/src/components/teacher/activity/ActivityConfig';
import ActivitySelector from '@/src/components/teacher/activity/ActivitySelector';
import StudentSelector from '@/src/components/teacher/activity/StudentSelector';
import BottomActionBar from '@/src/components/teacher/activity/BottomActionBar';
import { MealForm, NapForm, HygieneForm, LearningForm, PhotoForm } from '@/src/components/teacher/activity/ActivityForms';

// 1. Import API Hooks
import { useCreateActivityMutation } from '@/src/store/api/activityApiSlice';
import { useGetClassesQuery, useGetStudentsQuery } from '@/src/store/api/academicApiSlice';
import { useGetMeQuery } from '@/src/store/api/authApiSlice';

export default function TeacherActivityLogPage() {
  // --- API Hooks ---
  const [createActivity, { isLoading: isSaving }] = useCreateActivityMutation();
  const { data: userData } = useGetMeQuery(undefined);
  const { data: classData } = useGetClassesQuery();

  // Find Teacher's Class
  const myClass = useMemo(() => {
    if (!userData || !classData) return null;
    // Check if teacher is assigned to any class
    return classData.data.find((c: any) =>
      c.teacher_id?._id === userData.data._id || c.teacher_id === userData.data._id
    );
  }, [userData, classData]);

  // Fetch REAL Students
  const { data: studentData, isLoading: isLoadingStudents } = useGetStudentsQuery(
    { class_id: myClass?._id, limit: 100 },
    { skip: !myClass }
  );
  const students = studentData?.students || [];

  // --- State ---
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>('meal');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Form Data State
  const [mealData, setMealData] = useState<MealFormData>({ foodItem: '', quantity: 'all', notes: '' });
  const [napData, setNapData] = useState<NapFormData>({ startTime: getCurrentTime(), duration: 60, quality: 'good' });
  const [hygieneData, setHygieneData] = useState<HygieneFormData>({ type: 'handwash', notes: '' });
  const [learningData, setLearningData] = useState<LearningFormData>({ activity: '', participation: 'active', notes: '' });
  const [photoData, setPhotoData] = useState<PhotoFormData>({ caption: '', photos: [] });

  const currentConfig = useMemo(() => ACTIVITY_CONFIGS.find((a) => a.id === selectedActivity)!, [selectedActivity]);

  // --- Handlers ---

  const handleStudentToggle = useCallback((id: string) => {
    setSelectedStudents(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        setSelectAll(false);
        return prev.filter(s => s !== id);
      }
      const newSel = [...prev, id];
      if (newSel.length === students.length) setSelectAll(true);
      return newSel;
    });
  }, [students]);

  const handleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedStudents([]);
      setSelectAll(false);
    } else {
      // Map _id from real students
      setSelectedStudents(students.map((s: any) => s._id));
      setSelectAll(true);
    }
  }, [selectAll, students]);

  const handleSubmit = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }
    if (!myClass) {
      toast.error("No class assigned to you");
      return;
    }

    try {
      // Prepare Payload based on Activity Type
      let activityData: any = {};

      switch (selectedActivity) {
        case 'meal':
          activityData = {
            food_item: mealData.foodItem,
            quantity: mealData.quantity.toUpperCase(), // Backend expects uppercase enum
            description: mealData.notes
          };
          break;
        case 'nap':
          activityData = {
            start_time: napData.startTime,
            duration: Number(napData.duration),
            quality: napData.quality.toUpperCase(),
            description: `Slept for ${napData.duration} mins`
          };
          break;
        case 'hygiene':
          activityData = {
            subtype: hygieneData.type.toUpperCase(), // DIAPER / POTTY / HANDWASH
            description: hygieneData.notes
          };
          break;
        case 'learning':
          if (!learningData.activity) { toast.error("Activity name is required"); return; }
          activityData = {
            title: learningData.activity,
            description: `${learningData.participation} participation. ${learningData.notes}`
          };
          break;
        case 'photo':
          activityData = {
            title: "Class Photo",
            description: photoData.caption,
            // ✅ FIX: Use the state variable that holds the real URLs
            media_urls: photoData.photos
          };
          break;
      }

      // Call API
      await createActivity({
        student_ids: selectedStudents,
        class_id: myClass._id,
        type: selectedActivity.toUpperCase() as any,
        date: new Date().toISOString(),
        data: activityData
      }).unwrap();

      toast.success(`${currentConfig.label} Logged Successfully! 🎉`);

      // Reset Selection
      setSelectedStudents([]);
      setSelectAll(false);

      // Reset form data (optional, resets specific form)
      if (selectedActivity === 'meal') setMealData({ foodItem: '', quantity: 'all', notes: '' });

    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to log activity");
    }
  };

  // --- Render Logic ---
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

  if (isLoadingStudents) {
    return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ color: COLORS.primary }} /></Box>;
  }

  if (!myClass) {
    return (
      <Box sx={{ p: 5, textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="textSecondary">No Class Assigned</Typography>
        <Typography variant="body2" color="textSecondary">Please contact the admin to assign you to a class.</Typography>
        <Button component={Link} href="/teacher" sx={{ mt: 2 }} variant="outlined">Back to Dashboard</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: { xs: 20, sm: 16 } }}>

      {/* Header */}
      <Box sx={{ bgcolor: COLORS.cardBg, borderBottom: '1px solid', borderColor: COLORS.divider, position: 'sticky', top: 0, zIndex: 30 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton component={Link} href="/teacher" sx={{ color: COLORS.textSecondary }}><ArrowBackIcon /></IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700} color="text.primary">Log Activity</Typography>
              <Typography variant="caption" color="text.secondary">{myClass?.name}-{myClass?.section}</Typography>
            </Box>
          </Stack>

          <FormControlLabel
            control={<Switch checked={selectAll} onChange={handleSelectAll} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: currentConfig.color }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: currentConfig.color } }} />}
            label={<Typography variant="caption" fontWeight={600}>All</Typography>}
            labelPlacement="start" sx={{ mr: 0 }}
          />
        </Stack>
        <ActivitySelector selectedActivity={selectedActivity} onSelect={setSelectedActivity} />
      </Box>

      {/* Pass REAL students to selector */}
      <StudentSelector
        selectedStudents={selectedStudents}
        onToggle={handleStudentToggle}
        activeColor={currentConfig.color}
        // We map _id to id for the UI component compatibility
        // @ts-ignore
        students={students.map((s: any) => ({ ...s, id: s._id, name: s.name, avatar: s.avatar || '', gender: s.gender }))}
      />

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

      <BottomActionBar
        selectedStudents={selectedStudents}
        onSubmit={handleSubmit}
        saving={isSaving}
        canSubmit={selectedStudents.length > 0}
        activityLabel={currentConfig.label}
        activityIcon={currentConfig.icon}
        color={currentConfig.color}
        students={students}
      />
    </Box>
  );
}