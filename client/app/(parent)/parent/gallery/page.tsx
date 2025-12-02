'use client';
import React, { useState, useMemo } from 'react';
import { Box, Typography, Stack, Chip, useMediaQuery, useTheme, Card, CardContent, CardActionArea, alpha,IconButton } from '@mui/material';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import GridViewIcon from '@mui/icons-material/GridView';
import { MOCK_PHOTOS, MOCK_ALBUMS, FILTERS, Photo } from '../../../../src/components/parents/gallery/GalleryConfig';
import {COLORS} from '../../../../src/components/parents/ParentConfig'
import PhotoGrid from '../../../../src/components/parents/gallery/PhotoGrid';
import Lightbox from '../../../../src/components/parents/gallery/Lightbox';
import BottomNav from '../../../../src/components/parents/BottomNav'; // Reusing nav

export default function ParentGalleryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'photos' | 'albums'>('photos');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = useMemo(() => {
    return activeFilter === 'All' 
      ? MOCK_PHOTOS 
      : MOCK_PHOTOS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <Box sx={{ bgcolor: COLORS.background, minHeight: '100vh', pb: 12 }}>
      
      {/* Header */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 40, bgcolor: alpha(COLORS.cardBg, 0.95), backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: COLORS.divider, px: 2, pt: 2, pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={800} color="text.primary">Memories</Typography>
          <Stack direction="row" spacing={1} sx={{ bgcolor: alpha(COLORS.divider, 0.5), p: 0.5, borderRadius: 3 }}>
            <IconButton 
              size="small" 
              onClick={() => setViewMode('photos')}
              sx={{ bgcolor: viewMode === 'photos' ? 'white' : 'transparent', boxShadow: viewMode === 'photos' ? 1 : 0, color: viewMode === 'photos' ? COLORS.primary : 'text.secondary' }}
            >
              <GridViewIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setViewMode('albums')}
              sx={{ bgcolor: viewMode === 'albums' ? 'white' : 'transparent', boxShadow: viewMode === 'albums' ? 1 : 0, color: viewMode === 'albums' ? COLORS.primary : 'text.secondary' }}
            >
              <PhotoAlbumIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Filter Chips */}
        {viewMode === 'photos' && (
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
            {FILTERS.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onClick={() => setActiveFilter(filter)}
                sx={{
                  bgcolor: activeFilter === filter ? COLORS.primary : 'transparent',
                  color: activeFilter === filter ? 'white' : 'text.secondary',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: activeFilter === filter ? COLORS.primary : COLORS.divider,
                  '&:hover': { bgcolor: activeFilter === filter ? COLORS.primaryDark : alpha(COLORS.primary, 0.1) }
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ p: 2, maxWidth: 1000, mx: 'auto' }}>
        {viewMode === 'photos' ? (
          <PhotoGrid 
            photos={filteredPhotos} 
            onPhotoClick={setSelectedPhoto} 
            isMobile={isMobile} 
          />
        ) : (
          <Stack spacing={2}>
            {MOCK_ALBUMS.map((album) => (
              <Card key={album.id} elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                <CardActionArea>
                  <Box sx={{ height: 160, bgcolor: 'grey.200' }}>
                    <img src={album.coverUrl} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <Typography variant="h6" color="white" fontWeight={700}>{album.title}</Typography>
                    <Typography variant="caption" color="white" sx={{ opacity: 0.8 }}>{album.count} Photos</Typography>
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Lightbox 
        open={!!selectedPhoto} 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />

      <BottomNav activeTab={1} onTabChange={() => {}} />
    </Box>
  );
}