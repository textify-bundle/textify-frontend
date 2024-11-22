import { useState, useCallback } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { keyframes } from '@mui/system';
import './Settings.css';
import Search from "../../../../shared/ui/search-bar/SearchBar.tsx";
import ButtDel from "../butt/ButtDel";
import SwitchButton from "../switch-button/SwitchButton.tsx";
import ButtonInOut from "../butt/ButtonInOut.js";
import PropTypes from 'prop-types';

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const Settings = ({ isTrash }) => {
  const [open, setOpen] = useState(false);
  const [valueText, setValue] = useState('');

  const handleSearchChange = useCallback((newValue) => {
    setValue(newValue); 
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleButtonClick = () => {};

  return (
    <Box id="settings">
      <Button
        id="settings-button"
        aria-haspopup="true"
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          top:7,
          right: 40,
          height:35,
          zIndex: 10,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent:'center',
          flexWrap:'nowrap',
          justifyContent:'flex-end'
        }}
      >
        <span style={{color:'black', fontSize: '30px' }}>...</span>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        onExited={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            width: '200px',
            height: '350px',
            maxWidth: 'none',
            padding: 0,
            borderRadius: '20px',
            animation: open ? `${slideIn} 0.62s ease-out` : `${slideOut} 0.62s ease-out`,
            position: 'absolute',
            top: '20px',
            right: '20px',
          },
        }}
        BackdropProps={{
          invisible: true,
        }}
      >
        <DialogTitle sx={{ borderRadius: '20px', }}>Настройки</DialogTitle>
        <DialogContent sx={{ padding: '10px' }}>
          {!isTrash && (
            <Search
              className="settings-case_search"
              placeholder="Поиск по файлу"
              value={valueText}
              onChange={handleSearchChange}
            />
          )}

          {!isTrash && (
            <ButtDel
              id="settings-case_custom-button"
              placeholder="Удалить проект"
              onClick={handleButtonClick}
            />
          )}

          <ButtDel
            id="settings-case_custom-button"
            placeholder="Цвет фона"
            onClick={handleButtonClick}
          />
          <ButtDel
            id="settings-case_custom-button"
            placeholder="Размер шрифта"
            onClick={handleButtonClick}
          />
          <ButtDel
            id="settings-case_custom-button"
            placeholder="Набор шрифтов"
            onClick={handleButtonClick}
          />

          <div id="settings-case_theme">
            <p>Тема:</p>
            <SwitchButton className="settings-case-theme-switch" />
          </div>
        </DialogContent>
        <DialogActions sx={{borderRadius: '20px', padding: '0 10px 10px 10px' }}>
          <ButtonInOut
            className="settings-case_button-in-out"
            placeholder="Выход"
            onClick={handleButtonClick}
            sx={{
              borderRadius: '20px',
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Settings.propTypes = {
  isTrash: PropTypes.bool,
};

export default Settings;
