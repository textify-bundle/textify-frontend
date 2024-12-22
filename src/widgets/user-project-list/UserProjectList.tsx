import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, getCardData } from '../../store/slices/pagesSlice';
import { AppDispatch, RootState } from '../../store/index';
import ProjectCard from '../../shared/ui/project-card/ProjectCard';

interface UserProjectListProps {
    onProjectsAvailable?: (hasProjects: boolean) => void; // Пропс для передачи информации
}

const UserProjectList: React.FC<UserProjectListProps> = ({ onProjectsAvailable }) => {
    const dispatch = useDispatch<AppDispatch>();
    const projectData = useSelector((state: RootState) => state.pages.projectData);
    const loading = useSelector((state: RootState) => state.pages.loading);
    const error = useSelector((state: RootState) => state.pages.error);
  
    useEffect(() => {
        dispatch(fetchTreeData());
        dispatch(getCardData());
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
      <div style={{ paddingTop: '18px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '11px' }}>
        {activeProjects.map((project, index) => (
          <ProjectCard
            key={index}
            imageUrl={getImageUrl(index)}
            lastEntryTime={project.dateOfChange}
            projectName={project.name}
          />
        ))}
      </div>
    );
  };
  
  export default UserProjectList;