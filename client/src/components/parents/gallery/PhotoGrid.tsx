'use client';
import React from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, IconButton, alpha, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Photo } from './GalleryConfig';

interface Props {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  isMobile: boolean;
}

export default function PhotoGrid({ photos, onPhotoClick, isMobile }: Props) {
  return (
    <Box sx={{ pb: 10 }}>
      <ImageList variant="masonry" cols={isMobile ? 2 : 4} gap={12}>
        {photos.map((photo) => (
          <ImageListItem 
            key={photo.id} 
            onClick={() => onPhotoClick(photo)}
            sx={{ 
              cursor: 'pointer',
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              '&:hover .MuiImageListItemBar-root': { opacity: 1 },
              '& img': { transition: 'transform 0.3s ease' },
              '&:hover img': { transform: 'scale(1.05)' }
            }}
          >
            <img
              src={`${photo.url}?w=248&fit=crop&auto=format`}
              srcSet={`${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={photo.title}
              loading="lazy"
              style={{ borderRadius: 12 }}
            />
            {/* Overlay on Desktop Hover */}
            <ImageListItemBar
              sx={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                opacity: isMobile ? 1 : 0, // Always visible on mobile
                transition: 'opacity 0.2s',
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
              title={<Typography variant="body2" fontWeight={600}>{photo.title}</Typography>}
              subtitle={photo.date}
              actionIcon={
                <IconButton sx={{ color: 'white' }}>
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}