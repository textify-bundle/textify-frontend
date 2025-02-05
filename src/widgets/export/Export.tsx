import  { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { keyframes } from '@mui/system';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const fadeInBackground = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideDownContent = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiBackdrop-root': {
          animation: `${fadeInBackground} 0.5s ease-out`,
        },
        '& .MuiDialog-paper': {
          animation: `${slideDownContent} 0.5s ease-out`,
          position: 'absolute',
          right: 0,
          top: '50px',
          width: '300px', 
          borderRadius: '8px',
          padding: '10px',
        },
      }}
    >
      <DialogTitle sx={{ width: '300px', fontSize: '16px' }}>Экспортировать</DialogTitle>
      <hr style={{ margin: '10px 0', border: '1px solid #ccc' }} />
      <List sx={{ width: '300px', pt: 0, padding: '0' }}>
        <ListItem disableGutters sx={{ width: '300px', padding: '5px 0' }}>
          <ListItemButton 
            onClick={() => handleListItemClick('HTML')}
            sx={{ 
              width: '100%', 
              height: '36px',  
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListItemText primary="Экспортировать в HTML" sx={{ fontSize: '14px' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters sx={{ width: '300px', padding: '5px 0' }}>
          <ListItemButton
            onClick={() => handleListItemClick('PDF')}
            sx={{
              width: '100%',  
              height: '36px',  
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListItemText primary="Экспортировать в PDF" sx={{ fontSize: '14px' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
    
      <br />
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: 'black',
          border: 'none',
          margin: 0,
          height: '30px',
          fontSize: '12px',
          position: 'absolute',
          top:10,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Экспортировать
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
