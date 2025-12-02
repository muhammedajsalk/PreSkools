'use client';
import React from 'react';
import { 
  Stack, 
  TextField, 
  Box, 
  Typography, 
  ToggleButtonGroup, 
  ToggleButton, 
  Chip, 
  Slider, 
  alpha, 
  IconButton 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { 
  MealFormData, 
  NapFormData, 
  HygieneFormData, 
  LearningFormData, 
  PhotoFormData, 
  formatDuration 
} from './ActivityConfig';

// --- 1. MEAL FORM ---
export const MealForm = ({ data, onChange, color }: { data: MealFormData; onChange: (d: MealFormData) => void; color: string }) => (
  <Stack spacing={2.5}>
    <TextField label="Food Item" placeholder="e.g., Dal Rice" value={data.foodItem} onChange={(e) => onChange({ ...data, foodItem: e.target.value })} fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: color } }, '& .MuiInputLabel-root.Mui-focused': { color } }} />
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>How much did they eat?</Typography>
      <ToggleButtonGroup value={data.quantity} exclusive onChange={(_, v) => v && onChange({ ...data, quantity: v })} fullWidth sx={{ '& .MuiToggleButton-root': { py: 1.5, borderRadius: 2, fontWeight: 600, textTransform: 'none', '&.Mui-selected': { bgcolor: color, color: 'white', '&:hover': { bgcolor: alpha(color, 0.9) } } } }}>
        <ToggleButton value="all">All 🍽️</ToggleButton><ToggleButton value="half">Half 🥄</ToggleButton><ToggleButton value="none">None ❌</ToggleButton>
      </ToggleButtonGroup>
    </Box>
    <TextField label="Notes (optional)" placeholder="Any observations..." value={data.notes} onChange={(e) => onChange({ ...data, notes: e.target.value })} fullWidth multiline rows={2} size="small" />
  </Stack>
);

// --- 2. NAP FORM ---
export const NapForm = ({ data, onChange, color }: { data: NapFormData; onChange: (d: NapFormData) => void; color: string }) => (
  <Stack spacing={2.5}>
    <TextField label="Start Time" type="time" value={data.startTime} onChange={(e) => onChange({ ...data, startTime: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: color } } }} />
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
        <Chip label={formatDuration(data.duration)} size="small" sx={{ bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
      </Stack>
      <Slider value={data.duration} onChange={(_, v) => onChange({ ...data, duration: v as number })} min={15} max={180} step={15} marks={[{ value: 60, label: '1h' }, { value: 120, label: '2h' }]} sx={{ color, '& .MuiSlider-thumb': { width: 24, height: 24 } }} />
    </Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Sleep Quality</Typography>
      <ToggleButtonGroup value={data.quality} exclusive onChange={(_, v) => v && onChange({ ...data, quality: v })} fullWidth sx={{ '& .MuiToggleButton-root': { py: 1.5, borderRadius: 2, fontWeight: 600, textTransform: 'none', '&.Mui-selected': { bgcolor: color, color: 'white', '&:hover': { bgcolor: alpha(color, 0.9) } } } }}>
        <ToggleButton value="good">Good 😴</ToggleButton><ToggleButton value="restless">Restless 😣</ToggleButton><ToggleButton value="refused">Refused 🙅</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  </Stack>
);

// --- 3. HYGIENE FORM ---
export const HygieneForm = ({ data, onChange, color }: { data: HygieneFormData; onChange: (d: HygieneFormData) => void; color: string }) => {
  const types = [
    { value: 'diaper', label: 'Diaper', emoji: '👶' },
    { value: 'potty', label: 'Potty', emoji: '🚽' },
    { value: 'handwash', label: 'Hand Wash', emoji: '🧼' },
    { value: 'bath', label: 'Cleanup', emoji: '🛁' },
  ];

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Activity Type</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {types.map((t) => (
            <Chip
              key={t.value}
              label={`${t.emoji} ${t.label}`}
              onClick={() => onChange({ ...data, type: t.value as any })}
              sx={{
                px: 1, py: 2.5, borderRadius: 2, fontWeight: 600,
                bgcolor: data.type === t.value ? color : alpha(color, 0.1),
                color: data.type === t.value ? 'white' : color,
                '&:hover': { bgcolor: data.type === t.value ? color : alpha(color, 0.2) }
              }}
            />
          ))}
        </Box>
      </Box>
      <TextField label="Notes" placeholder="e.g. Wet, Soiled, or clean..." value={data.notes} onChange={(e) => onChange({ ...data, notes: e.target.value })} fullWidth multiline rows={2} />
    </Stack>
  );
};

// --- 4. LEARNING FORM ---
export const LearningForm = ({ data, onChange, color }: { data: LearningFormData; onChange: (d: LearningFormData) => void; color: string }) => (
  <Stack spacing={2.5}>
    <TextField label="Activity Name" placeholder="e.g., Story Time, Drawing..." value={data.activity} onChange={(e) => onChange({ ...data, activity: e.target.value })} fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: color } }, '& .MuiInputLabel-root.Mui-focused': { color } }} />
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Participation Level</Typography>
      <ToggleButtonGroup value={data.participation} exclusive onChange={(_, v) => v && onChange({ ...data, participation: v })} fullWidth sx={{ '& .MuiToggleButton-root': { py: 1.5, borderRadius: 2, fontWeight: 600, textTransform: 'none', '&.Mui-selected': { bgcolor: color, color: 'white', '&:hover': { bgcolor: alpha(color, 0.9) } } } }}>
        <ToggleButton value="active">Active ⭐</ToggleButton><ToggleButton value="moderate">Moderate 👍</ToggleButton><ToggleButton value="passive">Passive 😐</ToggleButton>
      </ToggleButtonGroup>
    </Box>
    <TextField label="Observations" placeholder="Any milestones achieved?" value={data.notes} onChange={(e) => onChange({ ...data, notes: e.target.value })} fullWidth multiline rows={2} />
  </Stack>
);

// --- 5. PHOTO FORM ---
export const PhotoForm = ({ data, onChange, color }: { data: PhotoFormData; onChange: (d: PhotoFormData) => void; color: string }) => {
  const handleAdd = () => onChange({ ...data, photos: [...data.photos, 'placeholder.jpg'] });
  const handleRemove = (i: number) => onChange({ ...data, photos: data.photos.filter((_, idx) => idx !== i) });

  return (
    <Stack spacing={2.5}>
      <Box onClick={handleAdd} sx={{ border: '2px dashed', borderColor: alpha(color, 0.5), borderRadius: 3, p: 3, textAlign: 'center', cursor: 'pointer', bgcolor: alpha(color, 0.05), '&:hover': { bgcolor: alpha(color, 0.1) } }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha(color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1, color }}>
          <CloudUploadIcon />
        </Box>
        <Typography variant="subtitle2" fontWeight={600}>Tap to Upload</Typography>
      </Box>

      {data.photos.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.photos.map((_, i) => (
            <Box key={i} sx={{ width: 70, height: 70, borderRadius: 2, bgcolor: alpha(color, 0.1), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ImageIcon sx={{ color: alpha(color, 0.5) }} />
              <IconButton size="small" onClick={() => handleRemove(i)} sx={{ position: 'absolute', top: -5, right: -5, bgcolor: 'white', boxShadow: 1, width: 20, height: 20, '&:hover': { bgcolor: '#f5f5f5' } }}><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
            </Box>
          ))}
        </Box>
      )}
      
      <TextField label="Caption" placeholder="What's happening in this photo?" value={data.caption} onChange={(e) => onChange({ ...data, caption: e.target.value })} fullWidth multiline rows={2} />
    </Stack>
  );
};