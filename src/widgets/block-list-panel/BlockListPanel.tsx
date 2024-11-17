import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './BlockListPanel.scss';

/**
 * Interface representing a block in the list.
 * @typedef {Object} Block
 * @property {string} title - The title of the block.
 * @property {string} description - The description of the block.
 */

/**
 * Interface representing the props for the BlockListPanel component.
 * @typedef {Object} BlockListPanelProps
 * @property {string} imageSrc - The URL of the image to be displayed.
 * @property {Block[]} blocks - An array of blocks to be displayed in the list.
 * @property {Function} [onClick] - Optional callback function to handle block click. Default is an empty function.
 */

/**
 * BlockListPanel component displays a list of blocks with images and descriptions.
 *
 * @param {BlockListPanelProps} props - The props for the BlockListPanel component.
 * @returns {JSX.Element} The rendered BlockListPanel component.
 */

interface Block {
    title: string;
    description: string;
}

interface BlockListPanelProps {
    imageSrc: string;
    blocks: Block[];
    onClick?: (index: number) => void;
}

const BlockListPanel: React.FC<BlockListPanelProps> = ({
    imageSrc,
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
                                src={imageSrc}
                                className="panel-image"
                                alt="block"
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
