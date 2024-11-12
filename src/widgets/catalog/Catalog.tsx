import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './Catalog.scss';

interface Item {
    title: string;
    description: string;
}

interface CatalogProps {
    imageSrc: string;
    items: Item[];
    onClick?: (index: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({
    imageSrc,
    items,
    onClick = () => {},
}) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index);
        }
        onClick(index);
    };

    return (
        <Box className="panel-box">
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} className="panel-list-item"
                    sx={{ width: '173.06px',
                        padding: '0'}}
                    >
                        <ListItemButton
                            className={`panel-list-item_button ${selectedIndex === index ? 'active' : ''}`}
                            onClick={() => handleItemClick(index)}
                            sx={{
                                paddingLeft: 0,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                }
                            }}
                        >
                            <img
                                src={imageSrc}
                                className="panel-image"
                                alt="item"
                            />
                            <ListItemText
                                primary={item.title}
                                secondary={item.description}
                                className="panel-list-item_text"
                                sx={{
                                    '& .MuiTypography-body1': {
                                        fontFamily: 'SF Compact Rounded, sans-serif',
                                    },
                                    '& .MuiTypography-body2': {
                                        marginTop: '3.5px',
                                        fontSize: '9px',
                                        fontFamily: 'SF Compact Rounded, sans-serif',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Catalog;