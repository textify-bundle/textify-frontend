import { useState } from 'react';
import { DialogContent, DialogTitle, Button } from '@mui/material';
import './Export.scss'; 

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
    <div className="export-modal__overlay" onClick={handleOverlayClick}>
      <div className="export-modal__box">
        <DialogTitle className="export-modal__header">
          <div className="export-modal__title">{title}</div>
          <Button onClick={onClose} className="export-modal__close-button">✕</Button>
        </DialogTitle>
        <DialogContent className="export-modal__content">
          <Button
            variant="outlined"
            fullWidth
            onClick={onExportToHTML}
            className="export-modal__option"
          >
            Экспортировать в HTML
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={onExportToPDF}
            className="export-modal__option"
          >
            Экспортировать в PDF
          </Button>
        </DialogContent>
      </div>
    </div>
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
    <div className="export-button__container">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        className="export-button__button"
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
    </div>
  );
};

export default ExportButton;
