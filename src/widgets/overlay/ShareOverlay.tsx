import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
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
      .then(() => console.log("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy link", err));
  };

  return (
    <div className='container'>
      <Button className="send-button" onClick={() => setOpenDialog(true)}>
        {title}
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs" className="share-dialog">
        <DialogContent className="share-dialog__content">
          <Box className="share-dialog__header">
            <Typography variant="h6">Поделиться</Typography>
            <IconButton onClick={() => setOpenDialog(false)} className="share-dialog__close-btn">
            <CloseIcon sx={{ color: '#d5d4d4', '&:hover': { color: '#dfdbdb' } }} />
            </IconButton>
          </Box>
          <Box className="share-dialog__access">
            <Typography variant="body1" className="share-dialog__label">
              У кого есть ссылка
            </Typography>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className="share-dialog__accordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="share-dialog__accordion-summary"
              >
                {selectedItem}
              </AccordionSummary>
              <AccordionDetails className="share-dialog__accordion-details">
                <FormControl>
                  <RadioGroup value={selectedItem} onChange={handleItemChange}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 18, 
                      borderRadius: '50%', 
                      border: '1px solid #e0e0e0',
                      backgroundColor: 'transparent',
                      '&:checked': {
                        color: '#007bff', 
                      }
                    }
                  }} >
                    <FormControlLabel value="Нет доступа" control={<Radio />} label="Нет доступа" />
                    <FormControlLabel value="Только чтение" control={<Radio />} label="Только чтение" />
                    <FormControlLabel value="Редактирование" control={<Radio />} label="Редактирование" />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Button
            variant="contained"
            className="share-dialog__copy-btn"
            onClick={handleCopyLink}
          >
            Копировать ссылку
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareOverlay;
