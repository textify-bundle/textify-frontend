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
  
    return (
      <div  style={{ paddingTop: '18px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '11px' }}>
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            imageUrl={`https://img1.akspic.ru/previews/5/3/0/9/7/179035/179035-voda-gora-gidroresursy-rastenie-oblako-500x.jpg`}
            lastEntryTime={project.dateOfChange}
            projectName={project.name}
          />
        ))}
      </div>
    );
  };
  
  export default UserProjectList;