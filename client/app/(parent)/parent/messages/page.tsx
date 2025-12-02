'use client';
import React, { useState, useMemo } from 'react';
import { Box, Stack, Typography, Tabs, Tab, Badge, Paper, InputBase, IconButton, alpha, List } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon, Face, AdminPanelSettings, Campaign, Event } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { COLORS, TabType, MOCK_TEACHER_CHATS, MOCK_ADMIN_CHATS, MOCK_CLASS_NOTICES, MOCK_SCHOOL_EVENTS, SchoolEvent } from '../../../../src/components/parents/messages/MessageConfig';
import ChatListItem from '../../../../src/components/parents/messages/ChatListItem';
import NoticeCard from '../../../../src/components/parents/messages/NoticeCard';
import EventCard from '../../../../src/components/parents/messages/EventCard';
import EventDialog from '../../../../src/components/parents/messages/EventDialog';
import EmptyState from '../../../../src/components/parents/messages/EmptyState';
import BottomNav from '../../../../src/components/parents/BottomNav';

export default function ParentMessagesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('teachers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [eventOpen, setEventOpen] = useState(false);

  const tabs = [
    { id: 'teachers', label: 'Teachers', icon: <Face />, color: COLORS.teachers, count: MOCK_TEACHER_CHATS.reduce((s, c) => s + c.unreadCount, 0) },
    { id: 'admin', label: 'Admin', icon: <AdminPanelSettings />, color: COLORS.admin, count: MOCK_ADMIN_CHATS.reduce((s, c) => s + c.unreadCount, 0) },
    { id: 'class', label: 'Notices', icon: <Campaign />, color: COLORS.classNotices, count: MOCK_CLASS_NOTICES.filter(n => !n.isRead).length },
    { id: 'school', label: 'Events', icon: <Event />, color: COLORS.schoolEvents, count: MOCK_SCHOOL_EVENTS.filter(e => !e.isRead).length },
  ];

  const renderContent = () => {
    if (activeTab === 'teachers') return <List>{MOCK_TEACHER_CHATS.map(c => <ChatListItem key={c.id} chat={c} type="teacher" onClick={() => router.push(`/parent/messages/chat/${c.id}`)} />)}</List>;
    if (activeTab === 'admin') return <List>{MOCK_ADMIN_CHATS.map(c => <ChatListItem key={c.id} chat={c} type="admin" onClick={() => router.push(`/parent/messages/chat/${c.id}`)} />)}</List>;
    if (activeTab === 'class') return <Stack spacing={2}>{MOCK_CLASS_NOTICES.map(n => <NoticeCard key={n.id} notice={n} />)}</Stack>;
    if (activeTab === 'school') return <Stack spacing={2}>{MOCK_SCHOOL_EVENTS.map(e => <EventCard key={e.id} event={e} onClick={() => { setSelectedEvent(e); setEventOpen(true); }} />)}</Stack>;
    return <EmptyState icon={<Face />} title="No Messages" subtitle="" color={COLORS.primary} />;
  };

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 12 }}>
      <Box sx={{ bgcolor: COLORS.cardBg, position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid', borderColor: COLORS.divider }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>Inbox</Typography>
          <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderRadius: 3, border: '1px solid', borderColor: COLORS.divider }}>
            <SearchIcon sx={{ color: COLORS.textSecondary, mr: 1 }} /><InputBase placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} fullWidth />
          </Paper>
        </Box>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ px: 1, '& .MuiTabs-indicator': { bgcolor: tabs.find(t => t.id === activeTab)?.color } }}>
          {tabs.map(t => (
            <Tab key={t.id} value={t.id} icon={<Badge badgeContent={t.count} color="error"><Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: activeTab === t.id ? alpha(t.color, 0.15) : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeTab === t.id ? t.color : COLORS.textSecondary }}>{t.icon}</Box></Badge>} label={<Typography variant="body2" fontWeight={activeTab === t.id ? 700 : 500} color={activeTab === t.id ? t.color : 'text.secondary'}>{t.label}</Typography>} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ px: 2, py: 2, maxWidth: 800, mx: 'auto' }}>{renderContent()}</Box>
      <EventDialog event={selectedEvent} open={eventOpen} onClose={() => setEventOpen(false)} />
      <BottomNav />
    </Box>
  );
}