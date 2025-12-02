'use client';
import React from 'react';
import { Dialog, Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { Photo } from './GalleryConfig';

interface Props {
  open: boolean;
  photo: Photo | null;
  onClose: () => void;
}

export default function Lightbox({ open, photo, onClose }: Props) {
  if (!photo) return null;

  return (
    <Dialog 
      fullScreen 
      open={open} 
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: 'black' } }}
    >
      {/* Header Actions */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 2, zIndex: 10, display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)' }}>
        <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ color: 'white' }}><ShareIcon /></IconButton>
          <IconButton sx={{ color: 'white' }}><DownloadIcon /></IconButton>
        </Stack>
      </Box>

      {/* Main Image */}
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={photo.url} 
          alt={photo.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </Box>

      {/* Bottom Caption */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">{photo.title}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>{photo.date} • {photo.category}</Typography>
          </Box>
          <IconButton sx={{ color: photo.isLiked ? '#F56565' : 'white' }}>
            {photo.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Stack>
      </Box>
    </Dialog>
  );
}