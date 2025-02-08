import React, { useState, useCallback, MouseEvent } from 'react';
import { Box, Button, Dialog, DialogContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import './Settings.scss';
import Search from '../../../../shared/ui/search-bar/SearchBar';
import SettingButton from '../butt/SettingButton';
import SwitchButton from '../switch-button/SwitchButton';
import ButtonInOut from '../butt/ButtonInOut';

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

  const handleSearchChange = useCallback((newValue: string) => {
    setValueText(newValue);
  }, []);

  const handleButtonClick = useCallback(() => {
    console.log('Button clicked!');
  }, []);

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

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="xs"
        className="settings-dialog"
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      >
        <DialogContent>
          <Box className="settings-header">
            <Typography variant="h6">Настройки</Typography>
            <IconButton onClick={handleClose} className="close-btn">
              <CloseIcon />
            </IconButton>
          </Box>

          {!isTrash && (
            <Search placeholder="Поиск по файлу" value={valueText} onChange={handleSearchChange} />
          )}
          {!isTrash && (
            <SettingButton placeholder="Удалить проект" onClick={handleButtonClick} />
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">Тема</Typography>
            <IconButton onClick={handleThemeClick}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleThemeClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {themeOptions.map((option, index) => (
              <MenuItem key={index} onClick={handleButtonClick}>{option}</MenuItem>
            ))}
          </Menu>

          <Box className="settings-theme">
            <Typography variant="body1">Тёмная тема:</Typography>
            <SwitchButton />
          </Box>

          <ButtonInOut placeholder="Выход" onClick={handleButtonClick} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Settings;