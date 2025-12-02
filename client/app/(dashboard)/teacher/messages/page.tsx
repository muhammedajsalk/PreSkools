'use client';
import React, { useState, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, Message, COLORS } from '../../../../src/components/teacher/messages/MessagesConfig';
import ChatList from '../../../../src/components/teacher/messages/ChatList';
import ConversationView from '../../../../src/components/teacher/messages/ConversationView';
import EmptyChatState from '../../../../src/components/teacher/messages/EmptyChatState';

export default function TeacherMessagesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const filteredConversations = useMemo(() => {
    const type = tabValue === 0 ? 'parent' : 'admin';
    return MOCK_CONVERSATIONS.filter(c => c.type === type && c.user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tabValue, searchQuery]);

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeChatId);
  const activeMessages = activeChatId ? messages[activeChatId] || [] : [];

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChatId) return;
    const newMessage: Message = { id: `m${Date.now()}`, conversationId: activeChatId, senderId: 'me', text: messageText, timestamp: 'Now', status: 'sent', isMe: true };
    setMessages(p => ({ ...p, [activeChatId]: [...(p[activeChatId] || []), newMessage] }));
    setMessageText('');
  };

  const showChatList = isMobile ? activeChatId === null : true;
  const showConversation = isMobile ? activeChatId !== null : true;

  return (
    <Box sx={{ display: 'flex', height: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 64px)' }, bgcolor: COLORS.background }}>
      {showChatList && (
        <ChatList
          tabValue={tabValue} setTabValue={setTabValue}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          conversations={filteredConversations} activeChatId={activeChatId}
          onSelect={setActiveChatId} unreadCounts={{ parents: 2, admin: 1 }}
        />
      )}
      {showConversation && (
        <Box sx={{ flex: 1 }}>
          {activeConversation ? (
            <ConversationView
              conversation={activeConversation} messages={activeMessages}
              onBack={() => setActiveChatId(null)} messageText={messageText}
              setMessageText={setMessageText} onSend={handleSendMessage} isMobile={isMobile}
            />
          ) : <EmptyChatState />}
        </Box>
      )}
    </Box>
  );
}