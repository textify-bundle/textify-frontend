import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import './LastProjectCard.scss';

interface LastProjectCardProps {
    title: string;
    imageUrl?: string;
    onClick?: () => void;
}

const LastProjectCard: React.FC<LastProjectCardProps> = ({ 
    title, 
    imageUrl, 
    onClick = () => {},
}) => {
    return (
        <Card 
        className="last-project-card"
        onClick={onClick}
        >
            <CardActionArea disableRipple className="last-project-card__action">
                <CardMedia className='last-project-card__image'
                    component="img"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent sx={{padding: '3px 0px 0px 0px',}} className="last-project-card__content">
                <div>{title}</div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default LastProjectCard;
