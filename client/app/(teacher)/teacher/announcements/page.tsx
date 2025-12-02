'use client';
import React, { useState } from 'react';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import { MOCK_NOTICES, COLORS, Notice, NoticeFormData } from '../../../../src/components/teacher/announcements/AnnouncementConfig';
import NoticeHeader from '../../../../src/components/teacher/announcements/NoticeHeader';
import NoticeCard from '../../../../src/components/teacher/announcements/NoticeCard';
import NoticeDialog from '../../../../src/components/teacher/announcements/NoticeDialog';
import DeleteDialog from '../../../../src/components/teacher/announcements/DeleteDialog';
import EmptyNoticeState from '../../../../src/components/teacher/announcements/EmptyNoticeState'; // (Simple placeholder)

export default function TeacherAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = notices.filter(n => activeTab === 0 ? n.type === 'school' : n.type === 'class').sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleSave = (data: NoticeFormData) => {
    if (editingNotice) setNotices(p => p.map(n => n.id === editingNotice.id ? { ...n, ...data } : n));
    else setNotices(p => [{ id: Date.now().toString(), ...data, sender: { name: 'You', role: 'teacher' }, createdAt: new Date(), type: 'class' }, ...p]);
    setDialogOpen(false); setEditingNotice(null);
  };

  const handleDelete = () => { setNotices(p => p.filter(n => n.id !== deleteId)); setDeleteId(null); };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: COLORS.bgLight, pb: 4 }}>
      <NoticeHeader onAdd={() => { setEditingNotice(null); setDialogOpen(true); }} />
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'white', borderBottom: '1px solid', borderColor: COLORS.divider }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="fullWidth" sx={{ '& .MuiTabs-indicator': { bgcolor: activeTab === 0 ? COLORS.admin : COLORS.teacher }, '& .Mui-selected': { color: activeTab === 0 ? COLORS.admin : COLORS.teacher } }}>
          <Tab icon={<SchoolIcon />} label="School" iconPosition="start" />
          <Tab icon={<ClassIcon />} label="My Class" iconPosition="start" />
        </Tabs>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 680, mx: 'auto' }}>
        {filtered.length === 0 ? <EmptyNoticeState /> : (
          <Stack spacing={2}>
            {filtered.map(n => (
              <NoticeCard key={n.id} notice={n} showActions={activeTab === 1 && n.sender.role === 'teacher'} onEdit={(n) => { setEditingNotice(n); setDialogOpen(true); }} onDelete={(id) => setDeleteId(id)} />
            ))}
          </Stack>
        )}
      </Box>

      <NoticeDialog open={dialogOpen} notice={editingNotice} onClose={() => setDialogOpen(false)} onSave={handleSave} />
      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </Box>
  );
}