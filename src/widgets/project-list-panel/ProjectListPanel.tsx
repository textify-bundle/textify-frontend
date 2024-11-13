import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './ProjectListPanel.scss';

/**
 * Interface representing a project in the list.
 * @typedef {Object} Project
 * @property {string} title - The title of the project.
 * @property {string} description - The description of the project.
 */

/**
 * Interface representing the props for the ProjectListPanel component.
 * @typedef {Object} ProjectListPanelProps
 * @property {string} imageSrc - The URL of the image to be displayed.
 * @property {Project[]} projects - An array of projects to be displayed in the list.
 * @property {Function} [onClick] - Optional callback function to handle project click. Default is an empty function.
 */

/**
 * ProjectListPanel component displays a list of projects with images and descriptions.
 *
 * @param {ProjectListPanelProps} props - The props for the ProjectListPanel component.
 * @returns {JSX.Element} The rendered ProjectListPanel component.
 */

interface Project {
    title: string;
    description: string;
}

interface ProjectListPanelProps {
    imageSrc: string;
    projects: Project[];
    onClick?: (index: number) => void;
}

const ProjectListPanel: React.FC<ProjectListPanelProps> = ({
    imageSrc,
    projects,
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
                {projects.map((project, index) => (
                    <ListItem key={index} className="panel-list-item">
                        <ListItemButton
                            className={`panel-list-item_button ${selectedIndex === index ? 'active' : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <img
                                src={imageSrc}
                                className="panel-image"
                                alt="project"
                            />
                            <ListItemText
                                primary={project.title}
                                secondary={project.description}
                                className="panel-list-item_text"
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ProjectListPanel;