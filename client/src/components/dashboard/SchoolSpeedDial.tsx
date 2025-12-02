'use client';
import React, { useState } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { brandColors, MOCK_DATA } from './DashboardConfig';

export default function SchoolSpeedDial() {
  const [open, setOpen] = useState(false);
  return (
    <SpeedDial
      ariaLabel="Quick Add"
      sx={{ position: 'fixed', bottom: 24, right: 24, '& .MuiFab-primary': { background: brandColors.secondary.gradient, '&:hover': { background: brandColors.secondary.gradient } } }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {MOCK_DATA.speedDialActions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={() => setOpen(false)} sx={{ '& .MuiSpeedDialAction-fab': { bgcolor: action.color, color: 'white', '&:hover': { bgcolor: action.color } } }} />
      ))}
    </SpeedDial>
  );
}