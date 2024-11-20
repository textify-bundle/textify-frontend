import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './export.scss';

interface ExportBoxProps {
  filename: string;
  onClick?: (index: number) => void;
}

const ExportBox: React.FC<ExportBoxProps> = ({ filename, onClick = () => {} }) => {
  const [isExportBoxVisible, setIsExportBoxVisible] = useState(false);

  const toggleExportBox = () => {
    setIsExportBoxVisible(!isExportBoxVisible);
  };

  const handleClick = (index: number) => {
    if (onClick) {
      onClick(index);
    }
  };

  const handleOverlayClick = () => {
    setIsExportBoxVisible(false);
  };

  return (
    <>
      {isExportBoxVisible && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  
            opacity: 0,
            animation: 'fadeIn 0.5s forwards',  
          }}
          onClick={handleOverlayClick}
        />
      )}

      <Box
        className={`exportBox ${isExportBoxVisible ? 'visible' : ''}`}
       
      >
        <Button
          variant="contained"
          className="exportButton"
          onClick={toggleExportBox}
        >
          {isExportBoxVisible ? 'Скрыть экспорт' : 'Экспортировать'}
        </Button>

        {isExportBoxVisible && (
          <Box
            className="content"
            sx={{
              backgroundColor: 'white',
              width: '100%',
              padding: 0,
              borderRadius: '0 0 12px 12px',
              boxSizing: 'border-box',
            }}
          >
            <Button
              variant="contained"
              className="optionButton"
              onClick={() => handleClick(0)}
            >
              Экспортировать в HTML
            </Button>

            <Button
              variant="contained"
              className="optionButton"
              onClick={() => handleClick(1)}
            >
              Экспортировать в PDF
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ExportBox;
