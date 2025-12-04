'use client';
import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, Card, CircularProgress, alpha } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

// Config & Components
import { COLORS, FilterType } from '@/src/components/teacher/activity/history/HistoryConfig';
import DateNavigator from '@/src/components/teacher/activity/history/DateNavigator';
import StudentFilter from '@/src/components/teacher/activity/history/StudentFilter';
import TypeFilter from '@/src/components/teacher/activity/history/TypeFilter';
import ActivityCard from '@/src/components/teacher/activity/history/ActivityCard';
import EmptyHistoryState from '@/src/components/teacher/activity/history/EmptyHistoryState';

// API Hooks
import { useGetClassHistoryQuery } from '@/src/store/api/activityApiSlice';
import { useGetStudentsQuery, useGetClassesQuery } from '@/src/store/api/academicApiSlice';
import { useGetMeQuery } from '@/src/store/api/authApiSlice';

// Init Dayjs
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function ActivityHistoryPage() {
  // --- State ---
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // --- 1. Context: Get Teacher's Class ---
  const { data: userData } = useGetMeQuery(undefined);
  const { data: classData } = useGetClassesQuery();
  
  const myClassId = useMemo(() => {
    if (!userData || !classData) return undefined;
    const myClass = classData.data.find((c: any) => 
      c.teacher_id?._id === userData.data._id || c.teacher_id === userData.data._id
    );
    return myClass?._id;
  }, [userData, classData]);

  // --- 2. Fetch Students (For Filter Bar) ---
  const { data: studentData } = useGetStudentsQuery(
    { class_id: myClassId, limit: 100 },
    { skip: !myClassId }
  );

  // Transform students for the Filter UI
  const filterStudents = useMemo(() => {
    const list = studentData?.students || [];
    return [
      { id: 'all', name: 'All Students', avatar: '', initials: 'ALL', color: COLORS.primary },
      ...list.map((s: any) => ({
        id: s._id,
        name: s.name,
        avatar: s.avatar || '',
        initials: s.name.substring(0, 2).toUpperCase(),
        color: s.gender === 'Female' ? '#EC407A' : '#42A5F5'
      }))
    ];
  }, [studentData]);

  // --- 3. Map Frontend Filter to Backend Enum ---
  const backendType = useMemo(() => {
     const map: Record<string, string> = {
       'all': 'all',
       'meals': 'MEAL', 
       'naps': 'NAP',
       'photos': 'PHOTO',
       'hygiene': 'HYGIENE',
       'learning': 'LEARNING',
       'notes': 'NOTE'
     };
     return map[filterType] || 'ALL';
  }, [filterType]);

  // --- 4. Fetch History (The Core Data) ---
  const { data: historyData, isLoading, isFetching } = useGetClassHistoryQuery(
    {
      class_id: myClassId,
      date: selectedDate.toISOString(),
      student_id: selectedStudentId || undefined,
      type: backendType
    },
    { skip: !myClassId }
  );

  const activities = historyData?.data || [];

  // --- 5. Map & Group Data ---
  const uiActivities = useMemo(() => {
    // Step A: Standard Mapping
    const mapped = activities.map((act: any) => {
      let description = '';
      let details = '';

      if (act.type === 'MEAL') {
        description = `${act.data?.food_item || 'Meal'} (${act.data?.quantity?.toLowerCase()})`;
        details = act.data?.description;
      } else if (act.type === 'NAP') {
        description = `Nap: ${act.data?.start_time}`;
        details = `Duration: ${act.data?.duration} mins • Quality: ${act.data?.quality?.toLowerCase()}`;
      } else if (act.type === 'HYGIENE') {
        description = `Hygiene: ${act.data?.subtype}`;
        details = act.data?.description;
      } else {
        description = act.data?.title || act.type;
        details = act.data?.description;
      }

      return {
        id: act._id,
        studentId: act.student_id?._id,
        studentName: act.student_id?.name || 'Unknown',
        type: act.type,
        time: dayjs(act.date).format('h:mm A'),
        description: description,
        details: details,
        imageUrl: act.data?.media_urls?.[0],
        loggedBy: act.teacher_id?.name || 'Teacher',
        createdAt: dayjs(act.createdAt)
      };
    });

    // Step B: Grouping Logic (Only if "All Students" is selected)
    if (!selectedStudentId) {
        const groups = new Map();
        
        mapped.forEach((act: any) => {
            // Unique Key: Type + Time + Desc + Details
            // This groups identical activities logged at the same time
            const key = `${act.type}|${act.time}|${act.description}|${act.details}`;
            
            if (!groups.has(key)) {
                groups.set(key, { ...act, count: 1 });
            } else {
                const g = groups.get(key);
                g.count++;
            }
        });

        return Array.from(groups.values()).map((group: any) => {
            // If grouped, change the name to "All Students" or "X Students"
            if (group.count > 1) {
                const totalStudents = Math.max(1, filterStudents.length - 1); // -1 to exclude 'All' option
                // If count matches total class size (or close to it), say "All Students"
                const isAll = group.count >= totalStudents;
                
                return {
                    ...group,
                    // ✅ THE REQUESTED CHANGE:
                    studentName: isAll ? "All Students (Ticked)" : `${group.count} Students`,
                    // Force a generic avatar initial if grouped
                    studentId: 'group' 
                };
            }
            return group;
        });
    }

    return mapped;
  }, [activities, selectedStudentId, filterStudents]);

  // --- 6. Header Counts ---
  const counts = useMemo(() => ({
    total: activities.length, // Use raw length for total stats
    meals: activities.filter((a: any) => a.type === 'MEAL').length,
    naps: activities.filter((a: any) => a.type === 'NAP').length,
    photos: activities.filter((a: any) => a.type === 'PHOTO').length
  }), [activities]);

  // --- Render ---
  if (!myClassId && !isLoading) {
    return (
        <Box sx={{ p: 5, textAlign: 'center', mt: 10 }}>
            <Typography variant="h6" color="textSecondary">No Class Assigned</Typography>
        </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pb: 10 }}>
        
        {/* Sticky Header */}
        <Paper elevation={0} sx={{ position: 'sticky', top: 0, zIndex: 100, px: 2, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h5" align="center" fontWeight={800} sx={{ background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
            📒 Class Diary
          </Typography>
          
          <DateNavigator 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
            onOpenPicker={() => setDatePickerOpen(true)} 
          />
          
          <DatePicker 
            open={datePickerOpen} 
            onClose={() => setDatePickerOpen(false)} 
            value={selectedDate} 
            onChange={(d) => { if (d) setSelectedDate(d); setDatePickerOpen(false); }} 
            slotProps={{ textField: { sx: { display: 'none' } } }} 
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
             {[
               {l:'Total', c:counts.total, co:COLORS.primary},
               {l:'Meals', c:counts.meals, co:COLORS.meal},
               {l:'Naps', c:counts.naps, co:COLORS.nap}
             ].map(i => (
               <Box key={i.l} sx={{ display: 'flex', gap: 0.5, bgcolor: alpha(i.co, 0.1), px: 1.5, py: 0.5, borderRadius: 2 }}>
                 <Typography fontWeight={800} color={i.co} variant="caption">{i.c}</Typography>
                 <Typography variant="caption" color="text.secondary">{i.l}</Typography>
               </Box>
             ))}
          </Box>
        </Paper>

        {/* Main Content */}
        <Box sx={{ px: 2, py: 3, maxWidth: 800, mx: 'auto' }}>
          
          <StudentFilter 
            students={filterStudents} 
            selectedId={selectedStudentId} 
            onSelect={setSelectedStudentId} 
          />

          <TypeFilter 
            selected={filterType} 
            onSelect={setFilterType} 
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">TIMELINE</Typography>
            <Chip label={`${uiActivities.length} Entries`} size="small" sx={{ fontWeight: 600, bgcolor: alpha(COLORS.primary, 0.1), color: COLORS.primary }} />
          </Box>

          {(isLoading || isFetching) ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
          ) : uiActivities.length > 0 ? (
            uiActivities.map((a: any, i: number) => (
              <ActivityCard key={a.id} activity={a} isLast={i === uiActivities.length - 1} />
            ))
          ) : (
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px dashed', borderColor: COLORS.divider }}>
               <EmptyHistoryState date={selectedDate} />
            </Card>
          )}
        </Box>

      </Box>
    </LocalizationProvider>
  );
}