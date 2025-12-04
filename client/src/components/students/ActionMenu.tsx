import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { COLORS } from './StudentConfig';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionMenu({ anchorEl, onClose, onView, onEdit, onDelete }: Props) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} PaperProps={{ elevation: 3, sx: { minWidth: 180, borderRadius: 2, mt: 1 } }}>
      <MenuItem onClick={onView}><ListItemIcon><VisibilityIcon fontSize="small" sx={{ color: COLORS.primary }} /></ListItemIcon><ListItemText>View Profile</ListItemText></MenuItem>
      <Divider />
    </Menu>
  );
}