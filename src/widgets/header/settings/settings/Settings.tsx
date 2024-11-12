import React, { useState, useCallback } from 'react';
import { Box, Button, Menu, MenuList } from '@mui/material';
import './Settings.scss'
import Search from "../../../../shared/ui/search-bar/Search.tsx";
import ButtDel from "../butt/ButtDel.tsx";
import SwitchButton from "../switch-button/SwitchButton.tsx";
import ButtonInOut from "../butt/ButtonInOut.tsx";
import PropTypes from 'prop-types';

interface SettingsProps {
    isTrash?: boolean;
}

interface ButtDel {
    placeholder: string;
    onClick: () => void;
    className?: string; // Добавляем className
}
const Settings: React.FC<SettingsProps> = ({ isTrash }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [valueText, setValue] = useState<string>('');

    const handleSearchChange = useCallback((newValue: string) => {
        setValue(newValue);
    }, []);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleButtonClick = () => {
        // Implement your button click logic here
    };

    const handleClose = useCallback(() => {
        setAnchorEl(null);
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
            >
                <MenuList className="settings-case_name">Настройки</MenuList>

                {!isTrash && (
                    <Search
                        className="settings-case_search"
                        placeholder="Поиск по файлу"
                        value={valueText}
                        onChange={handleSearchChange}
                    />
                )}
                {!isTrash && (
                    <ButtDel className="settings-case_custom-button" placeholder="Удалить проект" onClick={handleButtonClick} />
                )}
                <ButtDel className="settings-case_buttdel" placeholder="Цвет фона" onClick={handleButtonClick} />
                <ButtDel className="settings-case_custom-button" placeholder="Размер шрифта" onClick={handleButtonClick} />
                <ButtDel className="settings-case_custom-button" placeholder="Набор шрифтов" onClick={handleButtonClick} />
                <MenuList className="settings-case_theme">
                    <p>Тема:</p>
                    <SwitchButton className="settings-case-theme-switch" />
                </MenuList>
                <ButtonInOut className="buttout" placeholder="Выход" onClick={handleButtonClick} />
            </Menu>
        </Box>
    );
};

Settings.propTypes = {
    isTrash: PropTypes.bool,
};

export default Settings;