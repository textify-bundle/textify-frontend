import { useState } from 'react';
import * as React from 'react';
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
    <Box
      sx={{
        width: "460px",
        height: expanded ? "300px" : "200px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        transition: "height 0.3s ease-in-out",
      }}
    >
      <Typography variant="h6">Поделиться</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "18px", marginRight: "90px" }}>
          У кого есть ссылка:
        </Typography>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ width: "200px" }}
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
      <Button
        variant="contained"
        sx={{
          width: "100%",
          height: "36px",
          borderRadius: "12px",
        }}
      >
        Копировать ссылку
      </Button>
    </Box>
  );
};

export default OverlayToShare;
