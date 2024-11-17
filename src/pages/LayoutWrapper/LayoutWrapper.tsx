import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { logout } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

const LayoutWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    setIsLoading(true); 
    try {
      await dispatch(logout()).unwrap();  
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div>
      Какая-то страница
      <Button 
        onClick={handleClick} 
        disabled={isLoading} 
        variant="contained"
      >
        {isLoading ? <CircularProgress size={24} /> : 'Выйти'}
      </Button>
    </div>
  );
};

export default LayoutWrapper;
