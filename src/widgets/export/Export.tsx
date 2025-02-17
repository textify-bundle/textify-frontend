import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import TModal from '../../shared/tmodal/TModal';
import html2pdf from 'html2pdf.js';
import html2pdf from 'html2pdf.js';

interface ExportModalProps {
interface ExportModalProps {
  buttonText?: string;
  modalTitle?: string;
  containerClass?: string;
  handleExportToHTML?: () => void; 
  handleExportToPdf?: () => void;   
  containerClass?: string;
  handleExportToHTML?: () => void; 
  handleExportToPdf?: () => void;   
}

const ExportModal: React.FC<ExportModalProps> = ({
const ExportModal: React.FC<ExportModalProps> = ({
  buttonText = 'Экспортировать',
  modalTitle = 'Экспортировать',
  containerClass = 'page-container',
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

      const images2 = element.querySelectorAll('.btn');
      images2.forEach((img) => img.remove());


      const images = element.querySelectorAll('img[src="/icons/draggable.svg"]');
      images.forEach((img) => img.remove());

      const styleSheets = Array.from(document.styleSheets).map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n');

      const htmlContent = `
        <html>
          <head>
            <style>
              ${styleSheets}
            </style>
          </head>
          <body>
            ${element.outerHTML}
          </body>
        </html>
      `;

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
  
      const images = element.querySelectorAll('img[src="/icons/draggable.svg"]');
      images.forEach((img) => img.remove());
  
      const styles = `
        <style>
          * { box-sizing: border-box; font-family: Arial, sans-serif; }
          body { width: 100%; max-width: 800px; margin: 0 auto; }
          .page-container { width: 100%; padding: 10px; }
          h1, h2, h3 { break-after: avoid; }
          hr { border-bottom: 2px solid black !important; width: 100%; }
          input[type="checkbox"] { width: 12px; height: 12px; }
        </style>
      `;
  
      const options = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
  
      const clonedElement = element.cloneNode(true) as HTMLElement;
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = styles;
      tempContainer.appendChild(clonedElement);
      document.body.appendChild(tempContainer);
  
      html2pdf().from(tempContainer).set(options).save().then(() => {
        document.body.removeChild(tempContainer);
      });
  
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
          outline: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgba(220, 217, 217, 0.328)',
          },
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
            onClick={handleExportToHTML}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              color: 'black',
              fontSize: '18px',
              border: 'none',
              '&:hover': { backgroundColor: 'rgba(220, 220, 220, 0.29)' },
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
            onClick={handleExportToPdf}
            sx={{
              textTransform: 'none',
              padding: '10px',
              borderRadius: '8px',
              color: 'black',
              fontSize: '18px',
              border: 'none',
              '&:hover': { backgroundColor: 'rgba(220, 220, 220, 0.29)' },
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
