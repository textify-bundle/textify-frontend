import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, getCardData } from '../../store/slices/pagesSlice';
import { AppDispatch, RootState } from '../../store/index';
import ProjectCard from '../../shared/ui/project-card/ProjectCard';

const RemoteProjectList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const projectData = useSelector((state: RootState) => state.pages.projectData);
    const loading = useSelector((state: RootState) => state.pages.loading);
    const error = useSelector((state: RootState) => state.pages.error);
  
    useEffect(() => {
        dispatch(fetchTreeData());
        dispatch(getCardData());
    }, [dispatch]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const removedProjects = projectData.filter(project => project.isRemoved);

    if (removedProjects.length === 0) {
        return <div>У вас нет удалённых проектов!</div>;
    }

    const getImageUrl = (index: number) => {
        const id = (index * 71287328173) % 10 + 1;
        return `/patterns/${id}.webp`;
    };
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '11px' }}>
        {removedProjects.map((project, index) => (
          <ProjectCard
            key={index}
            isRemoved={project.isRemoved}
            imageUrl={getImageUrl(index)}
            lastEntryTime={new Date(project.dateOfChange)}
            projectName={project.name}
          />
        ))}
      </div>
    );
  };
  
  export default RemoteProjectList;