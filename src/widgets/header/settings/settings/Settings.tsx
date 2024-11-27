import React, { useState, useCallback } from 'react';
import { Box, Button, Menu, MenuList } from '@mui/material';
import './Settings.scss'; 
import Search from "../../../../shared/ui/search-bar/SearchBar";
import SettingButton from "../butt/SettingButton";
import SwitchButton from "../switch-button/SwitchButton";
import ButtonInOut from "../butt/ButtonInOut";

interface SettingsProps {
  isTrash?: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isTrash = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [valueText, setValueText] = useState<string>('');
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSearchChange = useCallback((newValue: string) => {
    setValueText(newValue);
  }, []);

  const handleButtonClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <Box id="settings">
      <Button
        id="settings-button"
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        ...
      </Button>
      <Menu
        id="settings-menu"
        className="settings-case" 
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '12px', 
            boxShadow: 'rgba(0, 0, 0, 0.25)',  
            backgroundColor: 'rgba(251, 251, 251, 1)',  
          },
          padding: '0', 
          margin: '0',    
        }}
      >
        <MenuList className="settings-case_name">Настройки</MenuList>
        {!isTrash && (
          <Search
            placeholder="Поиск по файлу"
            value={valueText}
            onChange={handleSearchChange}
          />
        )}
        {!isTrash && (
          <SettingButton
            placeholder="Удалить проект"
            onClick={handleButtonClick}
          />
        )}
        <SettingButton
          placeholder="Цвет фона"
          onClick={handleButtonClick}
        />
        <SettingButton
          placeholder="Размер шрифта"
          onClick={handleButtonClick}
        />
        <SettingButton
          placeholder="Набор шрифтов"
          onClick={handleButtonClick}
        />
        <MenuList id="settings-case_theme">
          <p>Тема:</p>
          <SwitchButton />
        </MenuList>
        <ButtonInOut
          placeholder="Выход"
          onClick={handleButtonClick}
        />
      </Menu>
    </Box>
  );
};

export default Settings;
