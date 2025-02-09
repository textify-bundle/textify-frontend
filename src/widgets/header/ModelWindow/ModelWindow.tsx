import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ModelWindow.scss';

interface ModelWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModelWindow: React.FC<ModelWindowProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>{title}</Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModelWindow;
