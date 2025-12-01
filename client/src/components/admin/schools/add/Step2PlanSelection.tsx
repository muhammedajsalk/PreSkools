'use client';
import React from 'react';
import { Box, Typography, Stack, Card, CardActionArea, CardContent, Avatar, Divider, Collapse, Alert, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { planOptions, PlanType, FormErrors, adminTheme } from './SchoolConfig';

interface Props {
  selectedPlan: PlanType | null;
  onSelect: (plan: PlanType) => void;
  error?: string;
  setError: (err: FormErrors) => void;
}

export default function Step2PlanSelection({ selectedPlan, onSelect, error, setError }: Props) {
  return (
    <Fade in timeout={500}>
      <Box>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: adminTheme.background.dark }}>Choose the perfect plan</Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>Select a subscription plan that fits the school's needs.</Typography>
        </Box>

        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError({})}>{error}</Alert>
        </Collapse>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="stretch">
          {planOptions.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <Card key={plan.id} elevation={isSelected ? 12 : 0} sx={{ flex: 1, border: isSelected ? `3px solid ${plan.color}` : '2px solid #E5E7EB', borderRadius: 4, transition: 'all 0.3s', backgroundColor: isSelected ? plan.lightColor : 'white', transform: isSelected ? 'scale(1.02)' : 'scale(1)', '&:hover': { borderColor: plan.color, transform: 'translateY(-8px) scale(1.01)', boxShadow: `0 20px 40px ${plan.color}25` } }}>
                {plan.popular && <Box sx={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', backgroundColor: plan.color, color: 'white', px: 2.5, py: 0.5, borderRadius: 2, fontSize: '0.75rem', fontWeight: 700, zIndex: 1 }}>⭐ Most Popular</Box>}
                {isSelected && <Box sx={{ position: 'absolute', top: -14, right: -14, width: 36, height: 36, borderRadius: '50%', backgroundColor: plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}><CheckCircleIcon sx={{ color: 'white' }} /></Box>}
                
                <CardActionArea onClick={() => onSelect(plan.id)} sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={2.5} sx={{ height: '100%' }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ width: 56, height: 56, backgroundColor: isSelected ? plan.color : plan.lightColor, color: isSelected ? 'white' : plan.color, fontSize: '1.5rem' }}>{plan.emoji}</Avatar>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: plan.color }}>{plan.name}</Typography>
                          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600 }}>{plan.tagline}</Typography>
                        </Box>
                      </Stack>
                      <Typography variant="body2" sx={{ color: '#4B5563', lineHeight: 1.7 }}>{plan.description}</Typography>
                      <Divider sx={{ borderColor: plan.borderColor }} />
                      <Stack spacing={1.25} sx={{ flex: 1 }}>
                        {plan.features.map((feature, i) => (<Stack key={i} direction="row" alignItems="flex-start" spacing={1.25}><CheckCircleIcon sx={{ fontSize: 18, color: plan.color, mt: 0.25 }} /><Typography variant="body2" sx={{ color: '#374151' }}>{feature}</Typography></Stack>))}
                      </Stack>
                      <Box sx={{ backgroundColor: isSelected ? plan.color : plan.lightColor, borderRadius: 3, p: 2.5, textAlign: 'center', mt: 'auto' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: isSelected ? 'white' : plan.color }}>{plan.price}</Typography>
                        <Typography variant="body2" sx={{ color: isSelected ? 'rgba(255,255,255,0.8)' : '#6B7280' }}>{plan.priceNote}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </Fade>
  );
}