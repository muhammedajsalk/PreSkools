import { alpha } from '@mui/material/styles';

// --- THEME ---
export const COLORS = {
  primary: '#4DB6AC', primaryDark: '#00897B',
  secondary: '#FF9800', background: '#F0F4F8', cardBg: '#FFFFFF',
  textPrimary: '#2D3748', textSecondary: '#718096',
  success: '#48BB78', error: '#F56565', info: '#4299E1',
  divider: '#E2E8F0', online: '#48BB78', purple: '#9F7AEA',
  sentBubble: '#4DB6AC', sentText: '#FFFFFF',
  receivedBubble: '#FFFFFF', receivedText: '#2D3748',
  chatBg: '#E8F4F3',
};

// --- TYPES ---
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'text' | 'image' | 'file' | 'voice';

export interface Attachment { id: string; type: 'image' | 'file'; name: string; url: string; size?: string; }
export interface Message {
  id: string; conversationId: string; senderId: string; text: string;
  timestamp: string; date: string; status: MessageStatus; isMe: boolean;
  type: MessageType; attachments?: Attachment[];
}
export interface ChatParticipant { id: string; name: string; role: string; avatar: string; isOnline: boolean; lastSeen?: string; type: 'teacher' | 'admin'; }
export interface QuickReply { id: string; text: string; }

// --- MOCK DATA ---
export const MOCK_PARTICIPANTS: Record<string, ChatParticipant> = {
  t1: { id: 't1', name: 'Ms. Sarah Johnson', role: 'Class Teacher', avatar: '', isOnline: true, type: 'teacher' },
  a1: { id: 'a1', name: 'School Reception', role: 'Front Desk', avatar: '', isOnline: true, type: 'admin' },
};

export const MOCK_MESSAGES: Record<string, Message[]> = {
  t1: [
    { id: 'm1', conversationId: 't1', senderId: 'me', text: 'Good morning!', timestamp: '9:00 AM', date: 'Today', status: 'read', isMe: true, type: 'text' },
    { id: 'm2', conversationId: 't1', senderId: 't1', text: 'Good morning! Rohan is doing great.', timestamp: '9:15 AM', date: 'Today', status: 'read', isMe: false, type: 'text' },
  ],
};

export const QUICK_REPLIES: QuickReply[] = [
  { id: 'qr1', text: 'Thank you! 🙏' }, { id: 'qr2', text: 'Okay, noted.' }, { id: 'qr3', text: 'Will do!' }, { id: 'qr4', text: 'Please call me.' },
];

// --- HELPERS ---
export const getInitials = (n: string) => n.split(' ').map(c => c[0]).join('').slice(0, 2);
export const getAvatarColor = (t: 'teacher' | 'admin') => t === 'teacher' ? COLORS.primary : COLORS.purple;
export const formatTime = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
export const generateId = () => `m${Date.now()}`;