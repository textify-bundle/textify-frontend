import React, { useState, MouseEvent } from 'react';
import { Box, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Search from '../../../../shared/ui/search-bar/SearchBar';
import SettingButton from '../butt/SettingButton';
import SwitchButton from '../switch-button/SwitchButton';
import ButtonInOut from '../butt/ButtonInOut';
import ModelWindow from '../../ModelWindow/ModelWindow.tsx';
import './Settings.scss'; 

interface SettingsProps {
  isTrash?: boolean;
  themeOptions?: string[];
}

const Settings: React.FC<SettingsProps> = ({ isTrash = false, themeOptions = ['Цвет фона', 'Размер шрифта', 'Набор шрифтов'] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [valueText, setValueText] = useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleThemeClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box id="settings">
      <Button id="settings-button" onClick={handleOpen}>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </Button>

      <ModelWindow isOpen={open} onClose={handleClose} title="Настройки">
        <Box className="settings-dialog">
          {!isTrash && <Search placeholder="Поиск по файлу" value={valueText} onChange={setValueText} />}
          {!isTrash && <SettingButton placeholder="Удалить проект" onClick={handleClose} />}

          <Box className="settings-theme">
            <Typography variant="body1">Тема</Typography>
            <IconButton className="settings-theme-btn" onClick={handleThemeClick}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleThemeClose}>
            {themeOptions.map((option, index) => (
              <MenuItem key={index} onClick={handleThemeClose}>{option}</MenuItem>
            ))}
          </Menu>

          <Box className="settings-theme">
            <Typography variant="body1">Тёмная тема:</Typography>
            <SwitchButton />
          </Box>

          <ButtonInOut placeholder="Выход" onClick={handleClose} />
        </Box>
      </ModelWindow>
    </Box>
  );
};

export default Settings;
