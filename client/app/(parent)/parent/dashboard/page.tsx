'use client';

import React, { useState } from 'react';
import { Box, Stack, Typography, useMediaQuery, useTheme, Menu, MenuItem, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import { MOCK_CHILDREN, MOCK_HIGHLIGHTS, MOCK_TODAY_OVERVIEW, MOCK_QUICK_STATS, MOCK_ACTIVITY_FEED, COLORS, Child, getInitials } from '../../../../src/components/parents/ParentConfig';
import ParentHeader from '../../../../src/components/parents/ParentHeader';
import MobileHeader from '../../../../src/components/parents/MobileHeader';
import StoryHighlight from '../../../../src/components/parents/StoryHighlight';
import TodayOverviewCard from '../../../../src/components/parents/TodayOverviewCard';
import QuickStatsGrid from '../../../../src/components/parents/QuickStatsGrid';
import ActivityFeedCard from '../../../../src/components/parents/ActivityFeedCard';
import BottomNav from '../../../../src/components/parents/BottomNav';
import CalendarWidget from '@/src/components/parents/CalendarWidget';


export default function ParentDashboardPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedChild, setSelectedChild] = useState<Child>(MOCK_CHILDREN[0]);
    const [activeNavTab, setActiveNavTab] = useState(0);
    const [activities, setActivities] = useState(MOCK_ACTIVITY_FEED);
    const [childMenuAnchor, setChildMenuAnchor] = useState<null | HTMLElement>(null);

    const handleLike = (id: string) => setActivities(p => p.map(a => a.id === id ? { ...a, isLiked: !a.isLiked, likes: a.isLiked ? a.likes - 1 : a.likes + 1 } : a));

    return (
        <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh' }}>

            {/* --- 1. HEADER SECTION --- */}
            {isMobile ? (
                <MobileHeader
                    selectedChild={selectedChild}
                    onChildMenuOpen={(e) => setChildMenuAnchor(e.currentTarget)}
                    notificationCount={3}
                />
            ) : (
                <ParentHeader
                    selectedChild={selectedChild}
                    childrenList={MOCK_CHILDREN}
                    onChildSelect={setSelectedChild}
                />
            )}

            {/* Child Switcher Dropdown */}
            <Menu
                anchorEl={childMenuAnchor}
                open={Boolean(childMenuAnchor)}
                onClose={() => setChildMenuAnchor(null)}
                PaperProps={{ sx: { borderRadius: 3, minWidth: 200 } }}
            >
                {MOCK_CHILDREN.map((c) => (
                    <MenuItem key={c.id} onClick={() => { setSelectedChild(c); setChildMenuAnchor(null); }} selected={c.id === selectedChild.id} sx={{ py: 1.5 }}>
                        <ListItemIcon><Avatar sx={{ width: 36, height: 36, bgcolor: c.id === selectedChild.id ? COLORS.primary : COLORS.textSecondary, fontSize: '0.85rem' }}>{getInitials(c.name)}</Avatar></ListItemIcon>
                        <ListItemText primary={c.nickname} secondary={c.className} primaryTypographyProps={{ fontWeight: 600 }} />
                    </MenuItem>
                ))}
            </Menu>

            {/* --- 2. MAIN CONTENT (Layout using Flexbox) --- */}
            <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 3 }, pb: 18 }}>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                    {/* === RIGHT COLUMN (Overview & Stats) === */}
                    {/* Order: 1 on Mobile (Top), 2 on Desktop (Right) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 350 },
                            flexShrink: 0,
                            order: { xs: 1, md: 2 }
                        }}
                    >
                        <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>

                            {/* Stories */}
                            <Box sx={{ mb: 3, bgcolor: 'white', p: 2, borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 2, px: 0.5 }}>HIGHLIGHTS</Typography>
                                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                                    {MOCK_HIGHLIGHTS.map(s => <StoryHighlight key={s.id} story={s} onClick={() => console.log(s.id)} size="medium" />)}
                                </Stack>
                            </Box>

                            {/* New Calendar Widget */}
                            <Box sx={{ mb: 3 }}>
                                <CalendarWidget />
                            </Box>

                            {/* Overview Card */}
                            <Box sx={{ mb: 3 }}>
                                <TodayOverviewCard overview={MOCK_TODAY_OVERVIEW} childName={selectedChild.nickname} isCompact={isMobile} />
                            </Box>

                            {/* Quick Stats */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" fontWeight={600} sx={{ mb: 2, px: 0.5 }}>QUICK STATS</Typography>
                                <QuickStatsGrid stats={MOCK_QUICK_STATS} />
                            </Box>

                        </Box>
                    </Box>

                    {/* === LEFT COLUMN (Activity Feed) === */}
                    {/* Order: 2 on Mobile (Bottom), 1 on Desktop (Left) */}
                    <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 3, px: 0.5 }}>Activity Feed</Typography>
                        <Stack spacing={3}>
                            {activities.map(a => (
                                <ActivityFeedCard
                                    key={a.id}
                                    activity={a}
                                    onLike={() => handleLike(a.id)}
                                    onComment={() => { }}
                                    onShare={() => { }}
                                />
                            ))}
                        </Stack>
                    </Box>

                </Box>
            </Box>

            {/* Bottom Navigation */}
            <Box sx={{ mt: 14 }}>
                <BottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />
            </Box>
        </Box>
    );
}