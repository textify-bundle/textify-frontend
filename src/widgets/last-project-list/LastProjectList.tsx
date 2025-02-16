import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, getCardDataForCards } from '../../store/slices/pagesSlice';
import { AppDispatch, RootState } from '../../store/index';
import LastProjectCard from '../../shared/ui/last-project-card/LastProjectCard';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const LastProjectList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projectData = useSelector((state: RootState) => state.pages.projectData);
  const loading = useSelector((state: RootState) => state.pages.loading);
  const error = useSelector((state: RootState) => state.pages.error);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    dispatch(fetchTreeData());
    dispatch(getCardDataForCards());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const activeProjects = projectData.filter(project => !project.isRemoved);

  const AnyDaysAgo = new Date();
  AnyDaysAgo.setDate(AnyDaysAgo.getDate() - 10);

  const filteredProjectData = activeProjects.filter(project => {
    if (!project.dateOfChange) return false;
    const lastEntryTime = new Date(project.dateOfChange);
    return lastEntryTime >= AnyDaysAgo;
  });

  const newProjectButton = {
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/12334/12334977.png',
    title: 'Новый проект'
  };

  const getImageUrl = (index: number) => {
    const id = (index * 71287328173) % 10 + 1;
    return `/patterns/${id}.webp`;
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewProjectName('');
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      // Здесь надо реализоват логику создания проекта, Игорь занимается для кнопки
      //  Создать проект (newProjectName - переменная для хранения имени нового проекта)
      closeDialog();
    } else {
      alert('Пожалуйста, введите имя проекта');
    }
  };

  return (
    <div style={{ width: '847px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '40.82px' }}>
      {filteredProjectData.map((project, index) => (
        <LastProjectCard
          key={index}
          title={project.name}
          imageUrl={getImageUrl(index)}
          projectId={project.id}
        />
      ))}
      <LastProjectCard
        key="new-project"
        imageUrl={newProjectButton.imageUrl}
        title={newProjectButton.title}
        onClick={openDialog}
      />

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Создание нового проекта</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Введите имя проекта"
            type="text"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleCreateProject} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LastProjectList;
