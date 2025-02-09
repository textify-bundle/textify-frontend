import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModelWindow from '../header/ModelWindow/ModelWindow.tsx';
import './ShareOverlay.scss';

interface PageShareProps {
  title?: string;
  link?: string;
}

const ShareOverlay: React.FC<PageShareProps> = ({ title = "Отправить", link }) => {
  const [selectedItem, setSelectedItem] = useState<string>('Нет доступа');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setGeneratedLink(link || `${window.location.origin}/shared`);
  }, [link]);

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(event.target.value);
  };

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy link", err));
  };

  return (
    <div className='share'>
      <Button className="send-button" onClick={() => setOpenDialog(true)}>
        {title}
      </Button>

      <ModelWindow isOpen={openDialog} onClose={() => setOpenDialog(false)} title="Поделиться">
        <Box className="share-dialog__access">
          <Typography variant="body1" className="share-dialog__label">У кого есть ссылка</Typography>
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary className=''expandIcon={<ExpandMoreIcon />}>{selectedItem}</AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup className='share-dialog__radio' value={selectedItem} onChange={handleItemChange}>
                  <FormControlLabel value="Нет доступа" control={<Radio />} label="Нет доступа" />
                  <FormControlLabel value="Только чтение" control={<Radio />} label="Только чтение" />
                  <FormControlLabel value="Редактирование" control={<Radio />} label="Редактирование" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Button className='share-dialog__copy-btn' variant="contained" onClick={handleCopyLink}>{copied ? "Скопировано!" : "Копировать ссылку"}</Button>
      </ModelWindow>
    </div>
  );
};

export default ShareOverlay;
