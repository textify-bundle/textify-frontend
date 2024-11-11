import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { signUp } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import './signUpPage.scss';
import { Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false); // Состояние загрузки в компоненте

  const dispatch = useDispatch<AppDispatch>(); // Используем тип AppDispatch
  const { user, session, error } = useSelector((state: RootState) => state.user);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await dispatch(signUp({ email: formData.email, password: formData.password })).unwrap();
    } catch (e) {
      // Ошибка будет обработана через extraReducers
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
   
    
      <Box  className="sign-up-page"
        sx={{
          backgroundColor: 'white',
          paddingLeft: '100px',
          paddingRight: '100px',
          borderRadius: 2,
          
          width: '300px',
        }}
      >
              <h1>Вход в личный кабинет</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="sign-up-form">
         <TextField 
          className="input-field"
          size="small"
          label="Почта"
          name="email" 
          onChange={handleChange}
          value={formData.email}
          fullWidth
        />
        <TextField  
          className="input-field"
          size="small"
          label="Пароль"
          name="password" 
          onChange={handleChange}
          value={formData.password}
          type="password"
          fullWidth
        />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="button-submit"
            type="submit"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Регистрация'}
          </Button>
        </form>

        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {user ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Данные пользователя</Typography>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Данные сессии
            </Typography>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </Box>
        ) : (
          <Typography align="center" sx={{ mt: 2 }}>
          </Typography>
        )}
        
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '15px',
            fontFamily: 'Tinkoff Sans',
          }}
        >
          <span style={{ marginRight: '5px', color: '#000' }}>Уже есть аккаунт?</span>
          <Link 
            to="/" 
            style={{
              color: '#0751D8',
              background: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'Tinkoff Sans',
            }}
          >
            Войти
          </Link>
        </Box>
      </Box>

  );
};

export default SignUpPage;