'use client';
import React from 'react';
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import { steps, adminTheme } from './SchoolConfig';

// Custom Styles
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`&.${stepConnectorClasses.active}`]: { [`& .${stepConnectorClasses.line}`]: { background: adminTheme.primary.gradient } },
  [`&.${stepConnectorClasses.completed}`]: { [`& .${stepConnectorClasses.line}`]: { background: adminTheme.primary.gradient } },
  [`& .${stepConnectorClasses.line}`]: { height: 3, border: 0, backgroundColor: '#E5E7EB', borderRadius: 1 },
}));

const CustomStepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean } }>(({ ownerState }) => ({
  backgroundColor: '#E5E7EB', zIndex: 1, color: '#9CA3AF', width: 48, height: 48, display: 'flex', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease',
  ...(ownerState.active && { background: adminTheme.primary.gradient, color: 'white', boxShadow: `0 4px 20px ${adminTheme.primary.main}50` }),
  ...(ownerState.completed && { background: adminTheme.primary.gradient, color: 'white' }),
}));

function CustomStepIcon(props: { active?: boolean; completed?: boolean; icon: React.ReactNode; className?: string }) {
  const { active, completed, className, icon } = props;
  return <CustomStepIconRoot ownerState={{ active, completed }} className={className}>{completed ? <CheckIcon sx={{ fontSize: 24 }} /> : icon}</CustomStepIconRoot>;
}

export default function SchoolStepper({ activeStep }: { activeStep: number }) {
  return (
    <Box sx={{ p: { xs: 3, md: 4 }, borderBottom: '1px solid #E5E7EB', background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)' }}>
      <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} icon={step.icon} />}>
              <Typography variant="body2" sx={{ fontWeight: activeStep === index ? 700 : 500, color: activeStep >= index ? adminTheme.primary.main : '#6B7280' }}>{step.label}</Typography>
              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.7rem', display: { xs: 'none', sm: 'block' } }}>{step.description}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}