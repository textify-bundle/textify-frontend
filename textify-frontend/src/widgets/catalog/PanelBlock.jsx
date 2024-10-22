import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './PanelBlock.css';
import PropTypes from 'prop-types';

const PanelBlock = ({
    imageSrc,
    items,
    onRestore = () => {},
    onClick = () => {},
}) => {
    // Состояние для отслеживания выбранного элемента
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Функция для обработки клика по элементу списка
    const handleItemClick = (index) => {
        if(selectedIndex===index){
            setSelectedIndex(null);
        }
        else setSelectedIndex(index);
        onClick(index); // Вызов переданной функции onClick
    };

    return (
        <Box className="panel-box">
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} className="panel-list-item">
                        <ListItemButton
                            className={`panel-list-item-button ${selectedIndex === index ? 'active' : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <img
                                src={imageSrc}
                                className="panel-image"
                                alt="item"
                            />
                            <ListItemText
                                primary={item.primary}
                                secondary={item.secondary}
                                className="panel-list-item-text"
                                classes={{
                                    primary: 'panel-text-primary',
                                    secondary: 'panel-text-secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

PanelBlock.propTypes = {
    imageSrc: PropTypes.string, 
    items: PropTypes.arrayOf(
        PropTypes.shape({
            primary: PropTypes.string.isRequired, 
            secondary: PropTypes.string,          
        })
    ).isRequired,  
    onRestore: PropTypes.func,  
    onClick: PropTypes.func,    
};

export default PanelBlock;
