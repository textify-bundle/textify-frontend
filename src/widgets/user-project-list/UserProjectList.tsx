import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, getCardData } from '../../store/slices/pagesSlice';
import { RootState } from '../../store/index';
import ProjectCard from '../../shared/ui/project-card/ProjectCard';

const UserProjectList: React.FC = () => {
    const dispatch = useDispatch();
    const projectData = useSelector((state: RootState) => state.pages.projectData);
    const loading = useSelector((state: RootState) => state.pages.loading);
    const error = useSelector((state: RootState) => state.pages.error);
  
    useEffect(() => {
        dispatch(fetchTreeData() as any);
        dispatch(getCardData() as any);
    }, [dispatch]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const getImageUrl = (index: number) => {
        const id = (index * 71287328173) % 10 + 1;
        return `../patterns/${id}.webp`;
      };
  
    return (
      <div  style={{ paddingTop: '18px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '11px' }}>
        {projectData.map((project, index) => (
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