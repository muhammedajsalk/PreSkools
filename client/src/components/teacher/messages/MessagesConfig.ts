import { alpha } from '@mui/material/styles';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryLight: '#80CBC4', primaryDark: '#00897B',
  secondary: '#FF9800', secondaryLight: '#FFB74D', secondaryDark: '#F57C00',
  background: '#F5F7FA', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  divider: '#E2E8F0', online: '#48BB78', offline: '#A0AEC0',
  sentBubble: '#4DB6AC', sentText: '#FFFFFF',
  receivedBubble: '#F7FAFC', receivedText: '#2D3748',
  chatBg: '#E8F4F3',
};

// --- TYPES ---
export type ChatType = 'parent' | 'admin';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface User { id: string; name: string; avatar: string; role: 'parent' | 'admin' | 'teacher'; isOnline: boolean; lastSeen?: string; }
export interface Student { id: string; name: string; }
export interface Message { id: string; conversationId: string; senderId: string; text: string; timestamp: string; status: MessageStatus; isMe: boolean; attachments?: { type: 'image' | 'file'; url: string; name: string; }[]; }
export interface Conversation { id: string; type: ChatType; user: User; student?: Student; lastMessage: string; lastMessageTime: string; unreadCount: number; isTyping?: boolean; }
export interface QuickReply { id: string; text: string; emoji: string; }

// --- MOCK DATA ---
export const QUICK_REPLIES: QuickReply[] = [
  { id: 'q1', text: 'Okay 👍', emoji: '👍' },
  { id: 'q2', text: 'Noted, thank you', emoji: '📝' },
  { id: 'q3', text: 'Please call me', emoji: '📞' },
  { id: 'q4', text: 'Sending photo', emoji: '📷' },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 'c1', type: 'parent', user: { id: 'u1', name: 'Rahul Sharma', avatar: '', role: 'parent', isOnline: true }, student: { id: 's1', name: 'Aarav' }, lastMessage: 'Thanks!', lastMessageTime: '10:30 AM', unreadCount: 2 },
  { id: 'c2', type: 'parent', user: { id: 'u2', name: 'Priya Patel', avatar: '', role: 'parent', isOnline: false, lastSeen: '9:45 AM' }, student: { id: 's2', name: 'Ananya' }, lastMessage: 'Will she need lunch?', lastMessageTime: '9:15 AM', unreadCount: 0 },
  { id: 'c6', type: 'admin', user: { id: 'u6', name: 'Principal Mehra', avatar: '', role: 'admin', isOnline: true }, lastMessage: 'Submit report', lastMessageTime: '11:00 AM', unreadCount: 1 },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id: 'm1', conversationId: 'c1', senderId: 'u1', text: 'Good morning!', timestamp: '9:00 AM', status: 'read', isMe: false },
    { id: 'm2', conversationId: 'c1', senderId: 'me', text: 'Good morning! Aarav is doing great.', timestamp: '9:15 AM', status: 'read', isMe: true },
  ],
};

// --- HELPERS ---
export const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
export const getAvatarColor = (name: string) => { const c = [COLORS.primary, COLORS.secondary, '#9F7AEA']; return c[name.charCodeAt(0) % c.length]; };