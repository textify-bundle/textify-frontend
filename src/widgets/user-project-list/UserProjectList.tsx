import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, getCardDataForCards } from '../../store/slices/pagesSlice';
import { AppDispatch, RootState } from '../../store/index';
import ProjectCard from '../../shared/ui/project-card/ProjectCard';

interface UserProjectListProps {
  onProjectsAvailable?: (hasProjects: boolean) => void;
}

const UserProjectList: React.FC<UserProjectListProps> = ({ onProjectsAvailable }) => {
  const dispatch = useDispatch<AppDispatch>();
  const projectData = useSelector((state: RootState) => state.pages.projectData);
  const error = useSelector((state: RootState) => state.pages.error);

  useEffect(() => {
    dispatch(fetchTreeData());
    dispatch(getCardDataForCards());
  }, [dispatch]);

  useEffect(() => {
    const activeProjects = projectData.filter(project => !project.isRemoved);
    if (onProjectsAvailable) {
      onProjectsAvailable(activeProjects.length > 0);
    }
  }, [projectData, onProjectsAvailable]);

  if (error) return <div>Error: {error}</div>;

  const activeProjects = projectData.filter(project => !project.isRemoved);

  const getImageUrl = (index: number) => {
    const id = (index * 71287328173) % 10 + 1;
    return `/patterns/${id}.webp`;
  };

  return (
    <div style={{ paddingTop: '18px' }}>
      {activeProjects.length > 0 && (
        <div
          style={{
            fontFamily: "'SF Compact Rounded', sans-serif",
            fontSize: '30px',
            paddingLeft: '30px',
            fontWeight: 400,
            position: 'relative',
          }}
        >
          Ваши проекты
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '11px', paddingLeft: '30px', paddingTop: '24px' }}>
        {activeProjects.map((project, index) => (
          <ProjectCard
            key={index}
            imageUrl={getImageUrl(index)}
            lastEntryTime={new Date(project.dateOfChange)}
            projectName={project.name}
            projectId={project.id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProjectList;
