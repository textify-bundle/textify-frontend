import React from "react";
import { Typography } from "@mui/material";

interface AuthHeaderProps {
  isSignUp: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isSignUp }) => (
  <Typography variant="h5" align="center">
    {isSignUp ? "Регистрация" : "Вход в личный кабинет"}
  </Typography>
);

export default AuthHeader;
