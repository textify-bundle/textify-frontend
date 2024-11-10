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
import './OverlayToShare.scss'; 

interface OverlayToShareProps {
  title?: string;
}



const OverlayToShare: React.FC<OverlayToShareProps> = ({ title = "Поделиться" }) => {

const [selectedItem, setSelectedItem] = useState<string>('Нет доступа');
const [expanded, setExpanded] = useState<string | false>(false);
  console.log(selectedItem); 

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(event.target.value);
    console.log(selectedItem); 
  };

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className={`overlay-to-share${expanded ? ' expanded' : ''}`}>
      <Typography variant="h6" className="overlay-to-share__title">{title}</Typography>
      <Box className="overlay-to-share__access-container">
        <Typography variant="body1" className="overlay-to-share__access-label" sx={{ marginRight: "110px" }}>
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
      <Button variant="contained" className="overlay-to-share__button">
        Копировать ссылку
      </Button>
    </Box>
  );
};

export default OverlayToShare;
