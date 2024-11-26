import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import './LastProjectCard.scss';

interface LastProjectCardProps {
    title: string;
    imageUrl?: string;
}

const LastProjectCard: React.FC<LastProjectCardProps> = ({ 
    title, 
    imageUrl 
}) => {
    return (
        <Card className="last-project-card">
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
