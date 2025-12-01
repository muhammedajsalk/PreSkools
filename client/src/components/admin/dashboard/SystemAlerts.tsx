'use client';
import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography, Stack, Chip, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { adminTheme, SystemAlert } from './AdminConfig';

const AlertIcon = ({ type }: { type: string }) => {
  if(type === 'warning') return <WarningAmberIcon sx={{ color: adminTheme.status.warning }} />;
  if(type === 'error') return <ErrorOutlineIcon sx={{ color: adminTheme.status.error }} />;
  if(type === 'success') return <CheckCircleOutlineIcon sx={{ color: adminTheme.status.success }} />;
  return <InfoOutlinedIcon sx={{ color: adminTheme.status.info }} />;
};

export default function SystemAlerts({ alerts }: { alerts: SystemAlert[] }) {
  return (
    <Card elevation={0} sx={{ height: '100%', minHeight: 420, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2, background: `${adminTheme.status.warning}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WarningAmberIcon sx={{ color: adminTheme.status.warning }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A2E' }}>System Alerts</Typography>
              <Typography variant="caption" sx={{ color: '#6B7280' }}>Recent system notifications</Typography>
            </Box>
          </Stack>
        }
        action={<Chip label={`${alerts.filter(a => a.type === 'error' || a.type === 'warning').length} Active`} size="small" sx={{ backgroundColor: '#FEF3C7', color: '#D97706', fontWeight: 700, fontSize: '0.75rem' }} />}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 1, flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {alerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              <ListItem secondaryAction={alert.action && <Button size="small" variant="outlined" sx={{ textTransform: 'none', fontSize: '0.7rem' }}>{alert.action}</Button>}>
                <ListItemIcon sx={{ minWidth: 40 }}><AlertIcon type={alert.type} /></ListItemIcon>
                <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>{alert.message}</Typography>} secondary={<Typography variant="caption" sx={{ color: '#9CA3AF' }}>{alert.timestamp}</Typography>} />
              </ListItem>
              {index < alerts.length - 1 && <Divider sx={{ mx: 2, my: 0.5 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}