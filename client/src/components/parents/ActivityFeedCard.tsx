'use client';

import React, { useState } from 'react';
import { 
    Card, CardContent, Stack, Avatar, Box, Typography, Chip, 
    IconButton, alpha, LinearProgress, Divider
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import HeartFilledIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

// Icons needed for rendering various types (Subtypes added)
import MealIcon from '@mui/icons-material/Restaurant';
import NapIcon from '@mui/icons-material/Hotel';
import PhotoIcon from '@mui/icons-material/CameraAlt';
import CleanIcon from '@mui/icons-material/CleanHands';
import PottyIcon from '@mui/icons-material/Wc'; // New
import DiaperIcon from '@mui/icons-material/ChildCare'; // New
import BookIcon from '@mui/icons-material/MenuBook';
import NoteIcon from '@mui/icons-material/Notes';

// Assuming ParentConfig provides necessary helpers and types
import { ActivityFeedItem, COLORS, getActivityTypeConfig, getInitials, getMealQuantityConfig, getNapQualityConfig, getMealTypeConfig } from './ParentConfig'; 

// ============================================================================
// 1. DYNAMIC HYGIENE ICON RESOLVER
// ============================================================================
const getHygieneIconAndLabel = (subtype?: string) => {
  console.log(subtype)
    const normSubtype = subtype?.toLowerCase();
    if (normSubtype === 'diaper') return { icon: DiaperIcon, label: 'Diaper Change' };
    if (normSubtype === 'potty') return { icon: PottyIcon, label: 'Potty Success' };
    return { icon: CleanIcon, label: 'Handwash' };
};

// ============================================================================
// 2. MAIN ACTIVITY FEED CARD
// ============================================================================

export default function ActivityFeedCard({ activity, onLike, onComment, onShare }: { activity: ActivityFeedItem; onLike: () => void; onComment: () => void; onShare: () => void; }) {
    const typeConfig = getActivityTypeConfig(activity.type);
    const [expanded, setExpanded] = useState(false);
    
    const longDescription = activity.description && activity.description.length > 150;
    const displayText = longDescription && !expanded ? activity.description?.substring(0, 150) + '...' : activity.description;

    // Helper to render the chip icon safely
    const ChipIcon = () => typeConfig.icon;
    
    // --- RENDER SWITCH ---
    const renderMainContent = () => {
        const data = (activity as any).data || {};
        console.log(activity)
        // Access raw data field from API response

        // 1. MEAL (EATING VISUAL)
        if (activity.type === 'meal' && activity.mealInfo) {
            const mealStatus = getMealQuantityConfig(activity.mealInfo.quantity);
            return (
                <Box sx={{ px: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 3, bgcolor: typeConfig.bgColor, borderLeft: `4px solid ${typeConfig.color}` }}>
                        <Avatar sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', bgcolor: typeConfig.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 3 }}>
                            <Typography sx={{ fontSize: '1.5rem' }}>{mealStatus.emoji}</Typography>
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" fontWeight={700} color={typeConfig.color}>
                                🍽️ {getMealTypeConfig(activity.mealInfo.mealType)?.label} - {activity.mealInfo.item}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Status: <Box component="span" sx={{ color: mealStatus.color, fontWeight: 700 }}>{mealStatus.label}</Box>
                            </Typography>
                        </Box>
                    </Box>
                    {activity.mealInfo.notes && <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, px: 2 }}>📝 {activity.mealInfo.notes}</Typography>}
                </Box>
            );
        }
        
        // 2. NAP (SLEEPING VISUAL)
        if (activity.type === 'nap' && activity.napInfo) {
            const napStatus = getNapQualityConfig(activity.napInfo.quality);
            return (
                <Box sx={{ px: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 3, bgcolor: typeConfig.bgColor, borderLeft: `4px solid ${typeConfig.color}` }}>
                        <Avatar sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: '50%', bgcolor: typeConfig.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 3 }}>
                            <Typography sx={{ fontSize: '1.5rem' }}>{napStatus.emoji}</Typography>
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" fontWeight={700} color={typeConfig.color}>
                                Nap Logged
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Quality: {napStatus.label} • Duration: {activity.napInfo.duration}
                            </Typography>
                        </Box>
                    </Box>
                    {activity.napInfo.notes && <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, px: 2 }}>📝 {activity.napInfo.notes}</Typography>}
                </Box>
            );
        }
        
        // 3. HYGIENE (SUBTYPE VISUAL)
        if (activity.type === 'hygiene') {
             const hygiene = getHygieneIconAndLabel(activity?.healthInfo?.subtype);
             const Icon = hygiene.icon;

             return (
                <Box sx={{ px: 2, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 3, borderLeft: `4px solid ${typeConfig.color}`, bgcolor: alpha(typeConfig.color, 0.05) }}>
                         <Avatar sx={{ bgcolor: typeConfig.color, color: 'white', width: 40, height: 40 }}><Icon sx={{ fontSize: 22 }} /></Avatar>
                         <Box>
                            <Typography variant="subtitle1" fontWeight={700}>💧 {hygiene.label}</Typography>
                            <Typography variant="body2" color="text.secondary">{data.description || 'Check recorded.'}</Typography>
                        </Box>
                    </Box>
                </Box>
             );
        }

        // 4. LEARNING / NOTE (STYLIZED TEXT BLOCK)
        if (activity.type === 'learning' || activity.type === 'note') {
             return (
                 <Box sx={{ px: 2, mb: 1.5 }}>
                     <Box sx={{ borderLeft: `4px solid ${typeConfig.color}`, bgcolor: alpha(typeConfig.color, 0.05), borderRadius: 2, p: 2 }}>
                        <Typography variant="subtitle1" fontWeight={700} color={typeConfig.color}>
                            <BookIcon sx={{ fontSize: 18, mr: 1 }} />
                            {activity.title || typeConfig.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {activity.description}
                        </Typography>
                    </Box>
                 </Box>
             );
        }
        
        // 5. PHOTO MEDIA
        if (activity.type === 'photo') {
            return (
                <Box sx={{ px: 2, mb: 1 }}>
                    <Box sx={{ width: '100%', height: 300, bgcolor: alpha(COLORS.primary, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                        {activity.imageUrl ? (
                            <img src={activity.imageUrl} alt={activity.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                        ) : (
                            <PhotoIcon sx={{ fontSize: 60, color: COLORS.primary, opacity: 0.5 }} />
                        )}
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', px: 1 }}>
                        {activity.description}
                    </Typography>
                </Box>
            );
        }
        
        // Default generic rendering
        return (
            <Box sx={{ px: 2, pt: 1.5, pb: 1.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{displayText}</Typography>
            </Box>
        );
    };

    return (
        <Card elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: COLORS.divider, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 40px ${alpha(COLORS.primary, 0.12)}`, borderColor: alpha(typeConfig.color, 0.3) } }}>
            
            {/* --- CARD HEADER --- */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ p: 2, pb: 1.5 }}>
                <Avatar sx={{ width: 44, height: 44, background: COLORS.gradientPrimary, fontSize: '1rem', fontWeight: 600 }}>{getInitials(activity.teacherName)}</Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{activity.teacherName}</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}><AccessTimeIcon sx={{ fontSize: 14, color: COLORS.textSecondary }} /><Typography variant="caption" color="text.secondary">{activity.time}</Typography></Stack>
                </Box>
                <Chip icon={<ChipIcon />} label={typeConfig.label} size="small" sx={{ bgcolor: typeConfig.bgColor, color: typeConfig.color, fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }} />
                <IconButton size="small" sx={{ color: COLORS.textSecondary }}><MoreHorizIcon /></IconButton>
            </Stack>
            
            {/* --- MAIN CONTENT SWITCH (Visuals) --- */}
            <Box sx={{ mb: 1.5 }}>
              {renderMainContent()}
            </Box>

            {/* --- ACTION FOOTER (Likes/Comments/Share) --- */}
            <Divider />
            <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2, py: 1.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <IconButton onClick={onLike} size="small" sx={{ color: activity.isLiked ? COLORS.error : COLORS.textSecondary }}>
                    {activity.isLiked ? <HeartFilledIcon /> : <HeartIcon />}
                  </IconButton>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>{activity.likes}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <IconButton onClick={onComment} size="small" sx={{ color: COLORS.textSecondary }}><CommentIcon fontSize="small" /></IconButton>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>{activity.comments}</Typography>
                </Stack>
              </Stack>
              <Box sx={{ flex: 1 }} />
              <IconButton onClick={onShare} size="small" sx={{ color: COLORS.textSecondary }}><ShareIcon fontSize="small" /></IconButton>
            </Stack>

        </Card>
    );
}