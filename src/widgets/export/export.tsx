import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ExportBox: React.FC = () => {
  return (
    <Box
      sx={{
        width: 454,
        height: 176,
        border: '1px solid #ccc',
        padding: 2,
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: 4, 
      }}
    >
      <Typography
        variant="body1"
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          margin: 0,
          fontSize: '20px',
        }}
      >
        Экспортировать
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
            fontSize: '16px',
          position: 'absolute',
          top: 64,
          left: 20,
          width: 'calc(100% - 40px)', 
          paddingLeft: '20px', 
          backgroundColor: 'white', 
          color: 'black', 
          textAlign: 'left',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#e0e0e0', 
            boxShadow: 'none', 
          },
        }}
      >
        <Box sx={{ textAlign: 'left', width: '100%' }}>
          Экспортировать в HTML
        </Box>
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
            fontSize: '16px',
          position: 'absolute',
          top: 114,
          left: 20,
          width: 'calc(100% - 40px)', 
          paddingLeft: '20px',
          backgroundColor: 'white', 
          color: 'black', 
          textAlign: 'left', 
          boxShadow: 'none', 
          '&:hover': {
            backgroundColor: '#e0e0e0',
            boxShadow: 'none', 
          },
        }}
      >
        <Box sx={{ textAlign: 'left', width: '100%' }}>
          Экспортировать в PDF
        </Box>
      </Button>
    </Box>
  );
};

export default ExportBox;
