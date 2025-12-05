'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, useMediaQuery, useTheme, Menu, MenuItem, ListItemIcon, Avatar, ListItemText, CircularProgress, Card } from '@mui/material';
import dayjs from 'dayjs';

// Config & Components
import { MOCK_HIGHLIGHTS, MOCK_TODAY_OVERVIEW, MOCK_QUICK_STATS, COLORS, Child, getInitials } from '../../../../src/components/parents/ParentConfig';
import ParentHeader from '../../../../src/components/parents/ParentHeader';
import MobileHeader from '../../../../src/components/parents/MobileHeader';
import StoryHighlight from '../../../../src/components/parents/StoryHighlight';
import TodayOverviewCard from '../../../../src/components/parents/TodayOverviewCard';
import QuickStatsGrid from '../../../../src/components/parents/QuickStatsGrid';
import ActivityFeedCard from '../../../../src/components/parents/ActivityFeedCard';
import BottomNav from '../../../../src/components/parents/BottomNav';
import CalendarWidget from '../../../../src/components/parents/CalendarWidget';
import EmptyActivityFeed from '@/src/components/parents/EmptyActivityFeed'; // Final Empty State

// API Hooks
import { useGetMeQuery } from '@/src/store/api/authApiSlice';
import { useGetStudentFeedQuery } from '@/src/store/api/activityApiSlice';
import { useGetMyChildrenQuery, StudentChild, useGetQuickStatsQuery } from '@/src/store/api/parentApiSlice';
import { useGetTodayOverviewQuery } from '@/src/store/api/activityApiSlice';

// Define a minimal empty child object for initial state safety
const emptyChild: Child = {
    _id: '',
    id: '',
    name: '',
    nickname: 'Child',
    className: 'Loading Class',
    avatarUrl: '',
    gender: 'male',
};


export default function ParentDashboardPage() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    // 1. Fetch Context & Children
    const { data: userData, isLoading: loadingMe } = useGetMeQuery(undefined);
    const { data: childrenResponse, isLoading: loadingChildren } = useGetMyChildrenQuery(
        undefined,
        { skip: !userData?.data?._id }
    );






    // UI State for Child Switcher (Initialized to a safe empty object)
    const [selectedChild, setSelectedChild] = useState<Child | StudentChild>(emptyChild);
    const [activeNavTab, setActiveNavTab] = useState(0);
    const [childMenuAnchor, setChildMenuAnchor] = useState<null | HTMLElement>(null);

    // Resolve Active Student ID and Nickname
    const activeChildrenList = childrenResponse?.data || [];
    const initialActiveChild = activeChildrenList[0] || null;
    const currentActiveChild = selectedChild._id ? selectedChild : initialActiveChild;
    const activeStudentId = currentActiveChild?._id;
    const studentNickname = currentActiveChild?.name?.split(' ')[0] || "Child";

    // Update selected child state when API data first loads
    useEffect(() => {
        if (initialActiveChild && selectedChild._id === '') {
            setSelectedChild(initialActiveChild);
        }
    }, [initialActiveChild, selectedChild._id]);


    // 2. Fetch Live Activity Feed using the resolved Student ID
    const { data: feedResponse, isLoading: loadingFeed } = useGetStudentFeedQuery(
        { studentId: activeStudentId, page: 1, limit: 10 },
        { skip: !activeStudentId }
    );

    const { data: overviewResponse, isLoading: loadingOverview } = useGetTodayOverviewQuery(
        activeStudentId,
        { skip: !activeStudentId }
    );

    const { data: statsResponse, isLoading: loadingStats } = useGetQuickStatsQuery(
        activeStudentId,
        { skip: !activeStudentId }
    );

    const overviewData = overviewResponse?.data || MOCK_TODAY_OVERVIEW;

    const quickStats = useMemo(() => {
        // MOCK_QUICK_STATS is assumed to be the original array holding icons/colors
        const baseStats = MOCK_QUICK_STATS;
        const liveStats = statsResponse?.data || [];

        if (liveStats.length === 0) return baseStats;

        // Merge API values onto the base mock structure
        return baseStats.map((mockStat) => {
            const liveEntry = liveStats.find(live => live.id === mockStat.id);

            if (liveEntry) {
                return {
                    ...mockStat,
                    value: liveEntry.value, // Inject the calculated value from backend
                };
            }
            return mockStat;
        });
    }, [statsResponse]);

    // 3. Mapping Activities (Backend -> Frontend UI Structure)
    // 4. Mapping Activities (Correctly extracting subtypes from log.data)
    const activities = useMemo(() => {
        const feed = feedResponse?.data?.feed || [];

        if (feed.length === 0) return [];

        return feed.map((log: any) => {
            const data = log.data || {}; // Flat data object from the API

            // 1. Synthesize Nested Info Objects
            const mealInfo = log.type === 'MEAL' ? {
                item: data.food_item || 'Food Item',
                quantity: data.quantity?.toLowerCase() || 'some',
                notes: data.description, // Reusing description for notes/details
                mealType: 'lunch', // Default, as backend might not specify this detail
            } : undefined;

            const napInfo = log.type === 'NAP' ? {
                duration: `${data.duration || 60} min`, // Ensure duration is a formatted string
                quality: data.quality?.toLowerCase() || 'good',
                notes: data.description,
            } : undefined;

            const healthInfo = log.type === 'HYGIENE' ? {
                // We map the flat data.subtype to the required frontend object:
                subtype: data.subtype?.toLowerCase() || 'handwash',
                // ...
            } : undefined;

            // 2. Determine base description for generic types
            const baseDescription = log.data?.description || log.data?.food_item || log.data?.title || log.type;

            // 3. Construct Final Activity Card Item
            return {
                id: log._id,
                type: log.type.toLowerCase(),
                time: dayjs(log.date).format('h:mm A'),

                description: baseDescription,
                imageUrl: log.data?.media_urls?.[0],
                teacherName: log.teacher_id?.name || 'Teacher',

                // Mock interaction stats
                likes: Math.floor(Math.random() * 20),
                isLiked: Math.random() > 0.5,
                comments: Math.floor(Math.random() * 5),

                // Final structured sub-types
                mealInfo: mealInfo,
                napInfo: napInfo,
                healthInfo: healthInfo,
            };
        });
    }, [feedResponse]);


    // 4. Loading & Error UI
    if (loadingMe || loadingChildren || loadingFeed || !selectedChild._id) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    // Handle Unlinked Account Scenario
    if (!currentActiveChild) {
        return <Box sx={{ p: 5, textAlign: 'center' }}>Error: No student linked to this parent account.</Box>;
    }


    return (
        <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 4 }}>

            {/* --- HEADER SECTION --- */}
            {isMobile ? (
                <MobileHeader
                    selectedChild={{ ...currentActiveChild, nickname: studentNickname }}
                    onChildMenuOpen={(e) => setChildMenuAnchor(e.currentTarget)}
                    notificationCount={5}
                />
            ) : (
                <ParentHeader
                    selectedChild={{ ...currentActiveChild, nickname: studentNickname }}
                    childrenList={childrenResponse?.data || []}
                    onChildSelect={setSelectedChild}
                />
            )}

            {/* Child Switcher Dropdown is handled by ParentHeader component */}

            {/* --- MAIN CONTENT --- */}
            <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 }, pb: 18 }}>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                    {/* === RIGHT COLUMN (Overview & Stats) === */}
                    <Box sx={{ width: { xs: '100%', md: 350 }, flexShrink: 0, order: { xs: 1, md: 2 } }}>
                        <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>

                            <Box sx={{ mb: 3 }}>
                                <TodayOverviewCard overview={overviewData} childName={studentNickname} isCompact={isMobile} />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <CalendarWidget />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 2, px: 0.5 }}>QUICK STATS</Typography>
                                <QuickStatsGrid stats={quickStats} />
                            </Box>

                        </Box>
                    </Box>

                    {/* === LEFT COLUMN (Activity Feed - LIVE) === */}
                    <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, px: 0.5 }}>Today's Activity Feed</Typography>

                        {/* 5. Display Activity Feed or Empty State */}
                        {activities.length > 0 ? (
                            <Stack spacing={3}>
                                {activities.map((a: any) => (
                                    <ActivityFeedCard
                                        key={a.id}
                                        activity={a}
                                        onLike={() => { /* API Mutate Logic */ }}
                                        onComment={() => { /* Open Comment Modal */ }}
                                        onShare={() => { /* Share Logic */ }}
                                    />
                                ))}
                            </Stack>
                        ) : (
                            <EmptyActivityFeed />
                        )}
                    </Box>

                </Box>
            </Box>

            {/* Bottom Navigation */}
            <div className="mt-20">
                <BottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />
            </div>
        </Box>
    );
}