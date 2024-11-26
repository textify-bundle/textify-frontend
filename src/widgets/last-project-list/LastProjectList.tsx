import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, getCardData } from '../../store/slices/pagesSlice';
import { RootState } from '../../store/index';
import LastProjectCard from '../../shared/ui/last-project-card/LastProjectCard';

const LastProjectList: React.FC = () => {
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

  const AnyDaysAgo = new Date();
    AnyDaysAgo.setDate(AnyDaysAgo.getDate() - 10);

    const filteredProjectData = projectData.filter(project => {
        if (!project.dateOfChange) return false;
        const lastEntryTime = new Date(project.dateOfChange);
        return lastEntryTime >= AnyDaysAgo;
    });

    const newProjectButton = {
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/12334/12334977.png',
        title: 'Новый проект'
    };

  return (
    <div style={{ width: '847px', display: 'flex', flexWrap: 'wrap',  justifyContent: 'flex-start', gap: '40.82px',}}>
      {filteredProjectData.map((project, index) => (
        <LastProjectCard 
          key={index}
          title={project.name}
          imageUrl={`https://kolesa-uploads.ru/-/496e6109-245d-49c9-bd9d-356ef4a0c698/r1.jpg`}
        />
      ))}
      <LastProjectCard
            key="new-project"
            imageUrl={newProjectButton.imageUrl}
            title={newProjectButton.title}
        />
      </div>
  );
};

export default LastProjectList;
