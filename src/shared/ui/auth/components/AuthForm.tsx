import React from "react";
import { TextField, Button, CircularProgress, Typography, Box } from "@mui/material";

interface AuthFormProps {
  formData: { email: string; password: string };
  setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
  isLoading: boolean;
  isSignUp: boolean;
  handleAuth: () => void;
  error?: string | null; 
}

const AuthForm: React.FC<AuthFormProps> = ({ formData, setFormData, isLoading, isSignUp, handleAuth, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : isSignUp ? "Зарегистрироваться" : "Войти"}
      </Button>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </form>
  );
};

export default AuthForm;
