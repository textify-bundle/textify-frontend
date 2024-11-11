import { FC, MouseEvent } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardActionArea, CardContent, CardMedia, Button } from '@mui/material';
import './index.scss';

interface ProjectCardProps {
  isRemoved?: boolean;
  imageUrl: string;
  lastEntryTime?: string | number;
  projectName?: string;
  onRestore?: () => void;
  onClick?: () => void;
}


const timeFromDate = (date: string | number): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
};

/**
 * ProjectCard component displays a card with project information.
 * 
 * @param {boolean} isRemoved - Indicates if the project is removed. Default is false.
 * @param {string} imageUrl - URL of the project's image.
 * @param {number} lastEntryTime - Timestamp of the last entry time. Default is the current time.
 * @param {string} projectName - Name of the project. Default is 'Unknown Project'.
 * @param {Function} onRestore - Callback function to handle restore action. Default is an empty function.
 * @param {Function} onClick - Callback function to handle card click action. Default is an empty function.
 * 
 * @returns {JSX.Element} The rendered ProjectCard component.
 */
const ProjectCard: FC<ProjectCardProps> = ({
  isRemoved = false,
  imageUrl = 'default-placeholder.jpg',
  lastEntryTime = Date.now(),
  projectName = 'Unknown Project',
  onRestore = () => {},
  onClick = () => {},
}) => {
  const handleRestoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRestore();
  };

  return (
    <Card
      className="project-card"
      sx={{ boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.17)'}}
      onClick={!isRemoved ? onClick : undefined}
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
