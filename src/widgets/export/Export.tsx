import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import TModal from '../../shared/tmodal/TModal';
import html2pdf from 'html2pdf.js';

interface ExportModalProps {
  buttonText?: string;
  modalTitle?: string;
  containerClass?: string;
}

const ExportModal: React.FC<ExportModalProps> = ({
  buttonText = 'Экспортировать',
  modalTitle = 'Экспортировать',
  containerClass = 'page-container',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const element = document.querySelector(`.${containerClass}`);

  const handleExportToHTML = async () => {
    console.log('Экспорт в HTML');

    try {
      if (!element) {
        throw new Error(`Элемент с классом .${containerClass} не найден на странице.`);
      }

      const images = element.querySelectorAll('img[src="./icons/draggable.svg"]');
      images.forEach((img) => img.remove());

      const htmlContent = element.outerHTML;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported_html.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      console.log('Файл успешно экспортирован.');
    } catch (error) {
      console.error('Ошибка при экспорте:', error);
    }
  };

  const handleExportToPdf = async () => {
    try {
      if (!element) {
        console.error("Контент не найден");
        return;
      }

      const images = element.querySelectorAll('img[src="./icons/draggable.svg"]');
      images.forEach((img) => img.remove());

      const options = {
        margin: 10,
        filename: 'document.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error("Ошибка при экспорте в PDF:", error);
    }
  };

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
          },
        }}
      >
        {buttonText}
      </Button>

      <TModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleExportToHTML}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              color: 'black',
              fontSize: '18px',
              border: 'none',
              '&:hover': { backgroundColor: 'rgba(220, 220, 220, 0.29)' },
            }}
          >
            Экспортировать в HTML
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleExportToPdf}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              color: 'black',
              fontSize: '18px',
              border: 'none',
              '&:hover': { backgroundColor: 'rgba(220, 220, 220, 0.29)' },
            }}
          >
            Экспортировать в PDF
          </Button>
        </Box>
      </TModal>
    </Box>
  );
};

export default ExportModal;
