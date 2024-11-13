import React, { useState, useCallback } from 'react';
import { Box, Button, Menu, MenuList } from '@mui/material';
import './Settings.scss'
import Search from "../../../../shared/ui/search-bar/Search.tsx";
//import ButtDel from "../butt/ButtDel.tsx";
import SwitchButton from "../switch-button/SwitchButton.tsx";
//import ButtonInOut from "../butt/ButtonInOut.tsx";
import PropTypes from 'prop-types';


interface SettingsProps {
    isTrash?: boolean;
}

// interface ButtDel {
//     placeholder: string;
//     onClick: () => void;
//     className?: string; 
// }

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
                sx={{
                    width: '280px',
                    height: '498px',
                    borderRadius: 20,
                  }}
            >
                <MenuList
                className="settings-case_name"
                sx={{
                    fontSize: '16pt',
                    paddingLeft: '10px',
                }}
                >
                Настройки
                </MenuList>


                {!isTrash && (
                    <Search
                        className="settings-case_search"
                        placeholder="Поиск по файлу"
                        value={valueText}
                        onChange={handleSearchChange}
                    />
                )}

                <Button
                className="buttout"
                variant="contained"
                onClick={handleButtonClick}
                sx={{
                    width: '100%',
                    height: '36px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'gray',
                    fontFamily: '"Varela Round", sans-serif',
                    fontSize: '12pt',
                    fontWeight: 400,
                    lineHeight: '16px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    boxShadow: 'none',
                    paddingLeft: '20px',
                    '&:hover': {
                    backgroundColor: 'rgba(230, 230, 230, 1)',
                    color: 'black',
                    boxShadow: 'none',
                    },
                }}
                >
                Удалить проект
                </Button>
                <Button
                className="buttout"
                variant="contained"
                onClick={handleButtonClick}
                sx={{
                    width: '100%',
                    height: '36px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'gray',
                    fontFamily: '"Varela Round", sans-serif',
                    fontSize: '12pt',
                    fontWeight: 400,
                    lineHeight: '16px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    boxShadow: 'none',
                    paddingLeft: '20px',
                    '&:hover': {
                    backgroundColor: 'rgba(230, 230, 230, 1)',
                    color: 'black',
                    boxShadow: 'none',
                    },
                }}
                >
                Цвет фона
                </Button>
                <Button
                className="buttout"
                variant="contained"
                onClick={handleButtonClick}
                sx={{
                    width: '100%',
                    height: '36px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'gray',
                    fontFamily: '"Varela Round", sans-serif',
                    fontSize: '12pt',
                    fontWeight: 400,
                    lineHeight: '16px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    boxShadow: 'none',
                    paddingLeft: '20px',
                    '&:hover': {
                    backgroundColor: 'rgba(230, 230, 230, 1)',
                    color: 'black',
                    boxShadow: 'none',
                    },
                }}
                >
                Размер шрифта
                </Button>
                <Button
                className="buttout"
                variant="contained"
                onClick={handleButtonClick}
                sx={{
                    width: '100%',
                    height: '36px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'gray',
                    fontFamily: '"Varela Round", sans-serif',
                    fontSize: '12pt',
                    fontWeight: 400,
                    lineHeight: '16px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    boxShadow: 'none',
                    paddingLeft: '20px',
                    '&:hover': {
                    backgroundColor: 'rgba(230, 230, 230, 1)',
                    color: 'black',
                    boxShadow: 'none',
                    },
                }}>Набор шрифтов 
                </Button>


                <MenuList className="settings-case_theme">
                    <p>Тема:</p>
                    <SwitchButton className="settings-case-theme-switch" />

                
                </MenuList>
                <Button
                    className="buttout"
                    variant="contained"
                    onClick={handleButtonClick}
                    sx={{
                        width: '100%',
                        height: '36px',
                        textTransform: 'none',
                        borderRadius: '0px',
                        padding: '0px',
                        gap: '10px',
                        backgroundColor: 'rgba(7, 81, 216, 1)',
                        color: 'white',
                        fontFamily: '"Varela Round", sans-serif',
                        fontSize: '12pt',
                        fontWeight: 400,
                        lineHeight: '16px',
                        textAlign: 'left',
                        '&:hover': {
                        backgroundColor: 'rgba(7, 58, 151, 1)',
                        },
                    }}
                    >
                    Выход
                    </Button>
            </Menu>
        </Box>
    );
};

Settings.propTypes = {
    isTrash: PropTypes.bool,
};

export default Settings;