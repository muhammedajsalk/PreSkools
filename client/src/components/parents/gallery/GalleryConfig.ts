import { alpha } from '@mui/material/styles';
import { COLORS } from '../ParentConfig'; // Reusing your parent theme

// --- TYPES ---
export interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  category: 'Art' | 'Event' | 'Daily' | 'Trip';
  likes: number;
  isLiked: boolean;
}

export interface Album {
  id: string;
  title: string;
  count: number;
  coverUrl: string;
}

// --- MOCK DATA (Using Unsplash for realism) ---
export const MOCK_ALBUMS: Album[] = [
  { id: 'a1', title: 'Diwali Celebration', count: 12, coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80' },
  { id: 'a2', title: 'Zoo Field Trip', count: 24, coverUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=400&q=80' },
  { id: 'a3', title: 'Art Exhibition', count: 8, coverUrl: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=400&q=80' },
];

export const MOCK_PHOTOS: Photo[] = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80', title: 'Playing in sand', date: 'Today', category: 'Daily', likes: 12, isLiked: false },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1596464716127-f9a0859b4bce?auto=format&fit=crop&w=600&q=80', title: 'Water colors', date: 'Today', category: 'Art', likes: 8, isLiked: true },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80', title: 'Reading time', date: 'Yesterday', category: 'Daily', likes: 24, isLiked: false },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=600&q=80', title: 'Group photo', date: 'Yesterday', category: 'Event', likes: 45, isLiked: true },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80', title: 'Lunch break', date: 'Last Week', category: 'Daily', likes: 6, isLiked: false },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79bb0?auto=format&fit=crop&w=600&q=80', title: 'Music class', date: 'Last Week', category: 'Event', likes: 15, isLiked: false },
];

export const FILTERS = ['All', 'Art', 'Event', 'Daily', 'Trip'];