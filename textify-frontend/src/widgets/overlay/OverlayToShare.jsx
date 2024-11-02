import { useState } from 'react';
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
import './OverlayToShare.scss'; // Import the SCSS file

const OverlayToShare = () => {
  const [selectedItem, setSelectedItem] = useState("Нет доступа");
  const [expanded, setExpanded] = useState(false);

  const handleItemClick = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={`overlay-to-share${expanded ? ' expanded' : ''}`}>
      <Typography variant="h6" className="overlay-to-share__title">Поделиться</Typography>
      <Box className="overlay-to-share__access-container">
        <Typography variant="body1" className="overlay-to-share__access-label" sx = { { marginRight : "110px"}}>
          У кого есть ссылка:
        </Typography>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="overlay-to-share__accordion"
        >
          <AccordionSummary
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
                name="access-radio-buttons-group"
              >
                <FormControlLabel
                  onClick={handleItemClick}
                  value="Нет доступа"
                  control={<Radio />}
                  label="Нет доступа"
                />
                <FormControlLabel
                  onClick={handleItemClick}
                  value="Только чтение"
                  control={<Radio />}
                  label="Только чтение"
                />
                <FormControlLabel
                  onClick={handleItemClick}
                  value="Редактирование"
                  control={<Radio />}
                  label="Редактирование"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Button variant="contained" className="overlay-to-share__button">
        Копировать ссылку
      </Button>
    </Box>
  );
};

export default OverlayToShare;
