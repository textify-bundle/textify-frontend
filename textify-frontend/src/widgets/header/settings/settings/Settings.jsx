import { useState, useCallback } from 'react';
import {Box, Button, Menu, MenuList } from '@mui/material';
import './Settings.css';
import Search from "../../../../shared/ui/search-bar/Search.jsx";
import ButtDel from "../butt/ButtDel.jsx";
import SwitchButton from "../switch-button/SwitchButton.jsx";
import ButtonInOut from "../butt/ButtonInOut.jsx";
import PropTypes from 'prop-types';


const Settings = ({isTrash}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [valueText, setValue] = useState('');

    const handleSearchChange = useCallback((newValue) => {
        setValue(newValue); 
    }, []);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);



    const handleButtonClick = () => {

    };

    console.log(event.target.value)
    
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);


    return (
        <Box id="settings"
        
        >
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

                { !isTrash &&(
                   <Search
                   className="settings-case_search"
                   placeholder="Поиск по файлу"
                   value={valueText} 
                   onChange={handleSearchChange} 
                   />
                )}
                { !isTrash &&(
                    <ButtDel id="settings-case_custom-button" placeholder="Удалить проект" onClick={handleButtonClick}/>
                
                )}
                    <ButtDel id="settings-case_custom-button" placeholder="Цвет фона" onClick={handleButtonClick}/>

                    <ButtDel id="settings-case_custom-button" placeholder="Размер шрифта" onClick={handleButtonClick}/>

                    <ButtDel id="settings-case_custom-button" placeholder="Набор шрифтов" onClick={handleButtonClick}/>
                <MenuList id="settings-case_theme">
                    <p>Тема:</p>
                    <SwitchButton className="settings-case-theme-switch"/>
                </MenuList>
                    <ButtonInOut className="settings-case_button-in-out" placeholder="Выход" onClick={handleButtonClick} />
            </Menu>
        </Box>
    );
};

Settings.propTypes = {
    isTrash: PropTypes.bool,
};

export default Settings;
