import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import TModel from '../header/TModel/TModel.tsx';

interface ExportModalProps  {
  buttonText?: string;
  modalTitle?: string;
  onExportToHTML?: () => void;
  onExportToPDF?: () => void;
}

const ExportModal: React.FC<ExportModalProps > = ({
  buttonText = 'Экспортировать',
  modalTitle = 'Экспортировать',
  onExportToHTML = () => console.log('Экспорт в HTML'),
  onExportToPDF = () => console.log('Экспорт в PDF')
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onClick={() => setModalOpen(true)}
        sx={{
          textTransform: 'none',
          padding: '8px',
          borderRadius: '8px',
          color: 'black',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'normal',
          outline: 'none', 
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(220, 217, 217, 0.328)',
          }
        }}
      >
        {buttonText}
      </Button>

      <TModel isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onExportToHTML}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              color: 'black',
              fontSize: '18px',
              border: 'none', 
              '&:hover': { backgroundColor: 'rgba(220, 220, 220, 0.29)' }
            }}
          >
            Экспортировать в HTML
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={onExportToPDF}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              color: 'black',
              fontSize: '18px',
              border: 'none',
              '&:hover': { backgroundColor: 'rgba(220, 220, 220, 0.29)' }
            }}
          >
            Экспортировать в PDF
          </Button>
        </Box>
      </TModel>
    </Box>
  );
};

export default ExportModal;
