import React, { FC } from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LastProjectCard.scss';

interface LastProjectCardProps {
  title: string;
  imageUrl?: string;
  projectId?: number;
  firstPageId?: number; 
  onClick?: () => void;
}

const LastProjectCard: FC<LastProjectCardProps> = ({
  title,
  imageUrl,
  projectId,
  firstPageId, 
  onClick = () => {},
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (projectId !== undefined && firstPageId !== undefined) {
      navigate(`/${projectId}?page=${firstPageId}`);
    } else {
      onClick();
    }
  };

  return (
    <Card
      className="last-project-card"
      onClick={handleCardClick}
    >
      <CardActionArea disableRipple className="last-project-card__action">
        <CardMedia className='last-project-card__image'
          component="img"
          image={imageUrl}
          alt={title}
        />
        <CardContent sx={{ padding: '3px 0px 0px 0px' }} className="last-project-card__content">
          <div>{title}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LastProjectCard;