import React, { useState, useCallback } from 'react';
import { Box, Button, Menu, MenuList, MenuItem } from '@mui/material';
import './Settings.scss';
import Search from "../../../../shared/ui/search-bar/SearchBar";
import SettingButton from "../butt/SettingButton";
import SwitchButton from "../switch-button/SwitchButton";
import ButtonInOut from "../butt/ButtonInOut";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface SettingsProps {
  isTrash?: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isTrash = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null); // Для темы
  const [valueText, setValueText] = useState<string>('');
  const open = Boolean(anchorEl);
  const openTheme = Boolean(themeAnchorEl); // для открытия меню темы

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

  const handleThemeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleThemeClose = () => {
    setThemeAnchorEl(null);
  };

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

        <Button
          id="demo-customized-button"
          aria-controls={openTheme ? 'theam-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openTheme ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleThemeClick} 
          endIcon={<ArrowForwardIosRoundedIcon />}
        >
          Тема
        </Button>

        <Menu
          id="theam-menu"
          anchorEl={themeAnchorEl} 
          open={openTheme}
          onClose={handleThemeClose}
        >
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
        </Menu>

        <MenuList id="settings-case_theme">
          <p>Тёмная тема:</p>
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
