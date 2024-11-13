import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './ShareOverlay.scss';

interface PageShareProps {
  title?: string;
  link?: string;
}

const  ShareOverlay: React.FC< PageShareProps > = ({ title = "Поделиться", link }) => {
  const [selectedItem, setSelectedItem] = useState<string>('Нет доступа');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');

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

  return (
    <Box className={`overlay-to-share${expanded ? ' expanded' : ''}`}>
      <Typography variant="h6" className="overlay-to-share__title">{title}</Typography>
      <Box className="overlay-to-share__access-container">
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
      </Box>
      <Button 
        variant="contained" 
        className="overlay-to-share__button" 
        onClick={handleCopyLink}
      >
        Копировать ссылку
      </Button>
    </Box>
  );
};

export default ShareOverlay;
