import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Accordion, AccordionSummary, AccordionDetails, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
      .then(() => {
        console.log("Link copied to clipboard!");
        console.log(generatedLink);
      })
      .catch(err => {
        console.error("Failed to copy link", err);
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);   
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  return (
    <div>
       <Button
        variant="text"   
        onClick={handleOpenDialog}
        sx={{
          position:'absolute',
          right:267,
          top:12,
          textTransform: 'none',  
          fontWeight: 'normal',   
          padding: 0,           
          color: 'black',       
          minWidth: 'auto',      
          '&:hover': {
            backgroundColor: 'transparent', 
          },
          marginLeft: '10px',   
        }}
      >
        {title}
      </Button>

       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box className={`overlay-to-share${expanded ? ' expanded' : ''}`}>
            <Typography variant="body1" className="overlay-to-share__access-label" sx={{ marginRight: "110px" }}>
              У кого есть ссылка:
            </Typography>
            <Accordion
              data-testid="accordion-header"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className="overlay-to-share__accordion"
            >
              <AccordionSummary
                className='overlay-to-share_panel1-header'
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {selectedItem}
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <FormLabel id="access-radio-buttons-group-label">Доступ</FormLabel>
                  <RadioGroup
                    aria-labelledby="access-radio-buttons-group-label"
                    value={selectedItem}
                    onChange={handleItemChange}
                    name="access-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Нет доступа"
                      control={<Radio />}
                      label="Нет доступа"
                    />
                    <FormControlLabel
                      value="Только чтение"
                      control={<Radio />}
                      label="Только чтение"
                    />
                    <FormControlLabel
                      value="Редактирование"
                      control={<Radio />}
                      label="Редактирование"
                    />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Button
              variant="contained"
              className="overlay-to-share__button"
              onClick={handleCopyLink}
            >
              Копировать ссылку
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareOverlay;
