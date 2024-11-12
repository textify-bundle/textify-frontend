import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../store/slices/authSlice";
import { AppDispatch, RootState } from "../../store";
import "./authPage.scss";

interface FormData {
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);  

  const dispatch = useDispatch<AppDispatch>();
  const { user, session, error } = useSelector((state: RootState) => state.user);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await dispatch(signUp({ email: formData.email, password: formData.password })).unwrap();
      } else {
        await dispatch(signIn({ email: formData.email, password: formData.password })).unwrap();
      }
    } catch (error: unknown) {
      console.error(isSignUp ? "Sign-up error:" : "Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleMode = () => setIsSignUp((prev) => !prev);

  return (
    <Box
      className="auth-page"
      sx={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: 2,
        width: "300px",
      }}
    >
      <Typography variant="h5" align="center">
        {isSignUp ? "Регистрация" : "Вход в личный кабинет"}
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
        className="auth-form"
      >
        <TextField
          className="input-field"
          size="small"
          label="Почта"
          name="email"
          onChange={handleChange}
          value={formData.email}
          fullWidth
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className="button-submit"
          type="submit"
          disabled={isLoading}
          sx={{ mt: 1 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isSignUp ? (
            "Зарегистрироваться"
          ) : (
            "Войти"
          )}
        </Button>
      </form>

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {user && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Данные пользователя</Typography>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Данные сессии
          </Typography>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <span style={{ marginRight: "5px", color: "#000" }}>
          {isSignUp ? "Уже есть аккаунт?" : "Еще нет аккаунта?"}
        </span>
        <Button
          variant="text"
          onClick={toggleMode}
          sx={{
            color: "#0751D8",
            fontFamily: "Tinkoff Sans",
            textDecoration: "underline",
          }}
        >
          {isSignUp ? "Войти" : "Зарегистрироваться"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthPage;
