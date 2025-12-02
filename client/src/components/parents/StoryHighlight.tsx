'use client';
import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { HighlightStory, getHighlightConfig, COLORS } from './ParentConfig';

export default function StoryHighlight({ story, onClick, size = 'medium' }: { story: HighlightStory; onClick: () => void; size?: 'medium' | 'large' }) {
  
  const { color, gradient, icon } = getHighlightConfig(story.type);

  const dim = size === 'medium' ? 72 : 84;
  const iconSize = size === 'medium' ? 24 : 28;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.08)',
        },
      }}
    >
      {/* Outer Ring */}
      <Box
        sx={{
          width: dim,
          height: dim,
          borderRadius: '50%',
          p: '3px',
          background: story.isNew ? gradient : COLORS.divider,
          position: 'relative',
        }}
      >
        {/* White Separator */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            bgcolor: COLORS.cardBg,
            p: '2px',
          }}
        >
          {/* Icon Circle */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              bgcolor: alpha(color, 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
              // FIX: Control font size here via CSS inheritance
              fontSize: iconSize,
              '& .MuiSvgIcon-root': {
                fontSize: 'inherit',
              },
            }}
          >
            {/* Render directly without cloneElement */}
            {icon}
          </Box>
        </Box>

        {/* Counter Badge */}
        {story.count && story.count > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 22,
              height: 22,
              borderRadius: '50%',
              bgcolor: color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.65rem',
              fontWeight: 700,
              border: '2px solid white',
            }}
          >
            {story.count}
          </Box>
        )}
      </Box>

      {/* Label */}
      <Typography
        variant="caption"
        fontWeight={story.isNew ? 600 : 500}
        color={story.isNew ? 'text.primary' : 'text.secondary'}
        sx={{ mt: 0.75, fontSize: '0.7rem' }}
      >
        {story.label}
      </Typography>
    </Box>
  );
}