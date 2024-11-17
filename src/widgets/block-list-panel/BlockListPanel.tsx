import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './BlockListPanel.scss';

interface Block {
    title: string;
    description: string;
    imageSrc: string;
}

interface BlockListPanelProps {
    blocks: Block[];
    onClick?: (index: number) => void;
}

/**
 * BlockListPanel component displays a list of blocks with titles, descriptions, and images.
 *
 * @param {Block[]} blocks - An array of block objects, each containing a title, description, and image source.
 * @param {Function} onClick - Callback function to handle item click action. Default is an empty function.
 *
 * @returns {JSX.Element} The rendered BlockListPanel component.
 */
const BlockListPanel: React.FC<BlockListPanelProps> = ({
    blocks,
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
                {blocks.map((block, index) => (
                    <ListItem key={index} className="panel-list-item">
                        <ListItemButton
                            className={`panel-list-item_button ${selectedIndex === index ? 'active' : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <img
                                src={block.imageSrc}
                                className="panel-image"
                                alt={block.title}
                            />
                            <ListItemText
                                primary={block.title}
                                secondary={block.description}
                                className="panel-list-item_text"
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BlockListPanel;
