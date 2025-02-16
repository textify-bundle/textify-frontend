import React, { FC, MouseEvent } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardActionArea, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.scss';

interface ProjectCardProps {
  isRemoved?: boolean;
  imageUrl: string;
  lastEntryTime?: Date;
  projectName?: string;
  projectId: number;
  onRestore?: () => void;
  firstPageId?: number; 
}

const timeFromDate = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true, locale: ru });
};

const ProjectCard: FC<ProjectCardProps> = ({
  isRemoved = false,
  imageUrl = 'default-placeholder.jpg',
  lastEntryTime = new Date(),
  projectName = 'Unknown Project',
  projectId,
  onRestore = () => {},
  firstPageId, 
}) => {
  const navigate = useNavigate();

  const handleRestoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRestore();
  };

  const handleCardClick = () => {
    if (!isRemoved && firstPageId) {
      navigate(`/${projectId}?page=${firstPageId}`);
    }
  };

  return (
    <Card
      className="project-card"
      sx={{ boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.17)' }}
      onClick={handleCardClick}
    >
      {isRemoved && (
        <Button
          className="project-card__restore-button"
          onClick={handleRestoreClick}
          sx={{
            position: 'absolute',
            color: '#FFF',
            width: '131px',
            height: '36px',
            background: '#0751D8',
            borderRadius: '46px',
            fontFamily: '"Varela Round", sans-serif',
          }}
        >
          Восстановить
        </Button>
      )}
      <CardActionArea className="project-card__action" disabled={isRemoved}>
        <CardMedia
          component="img"
          className={`project-card__image ${isRemoved ? "project-card__image--removed" : ""}`}
          image={imageUrl}
          alt={projectName}
        />
        <CardContent sx={{
          padding: '10px 10px 0 9px',
        }} className="project-card__content">
          <div className="project-card__name">{projectName}</div>
          <div className="project-card__last-entry">
            Последний вход - {timeFromDate(lastEntryTime)}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;