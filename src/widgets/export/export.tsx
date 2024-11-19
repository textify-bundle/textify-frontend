import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ExportBoxProps {
  filename: string;
  onClick?: (index: number) => void;
}

const ExportBox: React.FC<ExportBoxProps> = ({ filename, onClick = () => {} }) => {
  const handleClick = (index: number) => {
    if (onClick) {
      onClick(index);
    }
  };

  return (
    <Box
    sx={{
      width: '400px',
      height: '160px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '20px',
      boxSizing: 'border-box',
      boxShadow: 3,
      borderRadius: '12px',
    }}
    >
      <div>
        Экспортировать
      </div>
      
      <Button
        variant="contained"
        sx={{
          width: '360px',
          height: '36px',
          marginLeft: '0px',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'flex-start',
          backgroundColor: 'white', 
          color: 'black', 
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#F5F5F5', 
            boxShadow: 'none',
          },
        }}
        onClick={() => handleClick(index)}
      >
        Экспортировать в HTML
      </Button>

      <Button
        variant="contained"
        sx={{
          width: '360px',
          height: '36px',
          marginLeft: '0px',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'flex-start',
          backgroundColor: 'white', 
          color: 'black', 
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#F5F5F5', 
            boxShadow: 'none',
          },
        }}
        onClick={() => handleClick(index)}
      >
        Экспортировать в PDF
      </Button>
    </Box>
  );
};

export default ExportBox;
