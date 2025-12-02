'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { MOCK_PARTICIPANTS, MOCK_MESSAGES, COLORS, Message, MessageStatus, formatTime, generateId } from '../../../../../../src/components/parents/messages/chat/ChatConfig';
import ChatHeader from '../../../../../../src/components/parents/messages/chat/ChatHeader';
import MessageBubble from '../../../../../../src/components/parents/messages/chat/MessageBubble';
import ChatInput from '../../../../../../src/components/parents/messages/chat/ChatInput';
import DateSeparator from '../../../../../../src/components/parents/messages/chat/DateSeparator';
import TypingIndicator from '../../../../../../src/components/parents/messages/chat/TypingIndicator';

export default function ChatConversationPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;

  const participant = MOCK_PARTICIPANTS[chatId];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => { setMessages(MOCK_MESSAGES[chatId] || []); setIsLoading(false); }, 500);
  }, [chatId]);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, isLoading]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isMe) {
      setTimeout(() => { setIsTyping(true); setTimeout(() => setIsTyping(false), 3000); }, 1000);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = { id: generateId(), conversationId: chatId, senderId: 'me', text: inputText, timestamp: formatTime(), date: 'Today', status: 'sending', isMe: true, type: 'text' };
    setMessages(p => [...p, newMsg]); setInputText(''); setShowQuick(false); setIsSending(true);
    setTimeout(() => {
      setMessages(p => p.map(m => m.id === newMsg.id ? { ...m, status: 'sent' as MessageStatus } : m));
      setTimeout(() => { setMessages(p => p.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' as MessageStatus } : m)); setIsSending(false); }, 500);
    }, 800);
  };

  if (!participant) return <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Chat Not Found</Typography></Box>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: COLORS.background }}>
      <ChatHeader participant={participant} onBack={() => router.push('/parent/messages')} />
      
      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: COLORS.chatBg, py: 2 }}>
        {isLoading ? <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box> : (
          <>
            {messages.map((m, i) => (
              <React.Fragment key={m.id}>
                {(i === 0 || m.date !== messages[i - 1].date) && <DateSeparator date={m.date} />}
                <MessageBubble message={m} participantName={participant.name} participantType={participant.type} showAvatar={!messages[i - 1] || messages[i - 1].isMe !== m.isMe} />
              </React.Fragment>
            ))}
            {isTyping && <TypingIndicator name={participant.name.split(' ')[0]} />}
            <div ref={endRef} />
          </>
        )}
      </Box>

      <ChatInput inputText={inputText} setInputText={setInputText} onSend={handleSend} isSending={isSending} showQuick={showQuick} setShowQuick={setShowQuick} />
    </Box>
  );
}