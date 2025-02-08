import { useState } from 'react';
import { DialogContent, DialogTitle, Button, Box } from '@mui/material';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onExportToHTML: () => void;
  onExportToPDF: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  title = 'Экспортировать',
  onExportToHTML,
  onExportToPDF
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1000
      }}
      onClick={handleOverlayClick}
    >
      <Box
        sx={{
          background: 'white',
          borderRadius: '20px',
          padding: '16px',
          minWidth: '300px',
          textAlign: 'left',
          boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.6)'
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '10px 0',
            color: 'black'
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '16px',
              textAlign: 'left'
            }}
          >
            {title}
          </Box>
          <Button
            onClick={onClose}
            sx={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: 'gray',
              '&:hover': {
                color: 'black'
              }
            }}
          >
            ✕
          </Button>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '0',
            alignItems: 'flex-start',
            textAlign: 'left'
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={onExportToHTML}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              color: 'black',
              textAlign: 'left',
              fontSize: '18px',
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(220, 220, 220, 0.29)'
              }
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
              border: 'none',
              cursor: 'pointer',
              color: 'black',
              textAlign: 'left',
              fontSize: '18px',
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(220, 220, 220, 0.29)'
              }
            }}
          >
            Экспортировать в PDF
          </Button>
        </DialogContent>
      </Box>
    </Box>
  );
};

interface ExportButtonProps {
  buttonText?: string;
  modalTitle?: string;
  onExportToHTML?: () => void;
  onExportToPDF?: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  buttonText = 'Экспортировать',
  modalTitle = 'Экспортировать',
  onExportToHTML = () => console.log('Экспорт в HTML'),
  onExportToPDF = () => console.log('Экспорт в PDF')
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'none'
      }}
    >
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
            outline: 'none',
            boxShadow: 'none'
          }
        }}
      >
        {buttonText}
      </Button>
      <ExportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        onExportToHTML={onExportToHTML}
        onExportToPDF={onExportToPDF}
      />
    </Box>
  );
};

export default ExportButton;
