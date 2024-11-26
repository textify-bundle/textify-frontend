import React, { useState, useCallback } from 'react';
import { Box, Button, Menu, MenuList } from '@mui/material';
import './Settings.scss'
import Search from "../../../../shared/ui/search-bar/Search.tsx";
import SwitchButton from "../switch-button/SwitchButton.tsx";
import PropTypes from 'prop-types';

// :)
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
                    '& .MuiPaper-root, .MuiList-root': {
                        borderRadius: '16px',
                        paddingTop: '2px',
                        paddingBottom: '0',
                    },
                }}
            >
                <MenuList
                className="settings-case_name"
                sx={{
                    marginBlock: "8px",
                    fontSize: '16pt',
                    paddingInline: '20px',
                    boxSizing: "border-box"
                }}
                >
                Настройки
                </MenuList>


                {!isTrash && (
                    <div style={{width: "100%", height: 40, paddingInline: 22, boxSizing: "border-box"}}>
                        <Search
                            className="settings-case_search"
                            placeholder="Поиск по файлу"
                            value={valueText}
                            onChange={handleSearchChange}
                        />
                    </div>
                )}

                <Button
                className="buttout"
                variant="contained"
                onClick={handleButtonClick}
                sx={{
                    width: '100%',
                    height: '42px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'black',
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
                    height: '42px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'black',
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
                    height: '42px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'black',
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
                    height: '42px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: '0px',
                    gap: '10px',
                    backgroundColor: 'white',
                    color: 'black',
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


                <div style={{display: "flex", width: "100%", height: "42px", flex: "auto", flexDirection: "row", paddingInline: 20, boxSizing: "border-box"}}>
                    <p style={{lineHeight: "6px", marginRight: 5}}>Тема:</p>
                    <SwitchButton className="settings-case-theme-switch"/>
                </div>


                <Button
                    className="buttout"
                    variant="contained"
                    onClick={handleButtonClick}
                    sx={{
                        width: '100%',
                        height: '42px',
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