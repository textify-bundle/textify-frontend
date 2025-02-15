import React from "react";
import { Box, Button } from "@mui/material";

interface AuthSwitchProps {
  isSignUp: boolean;
  toggleMode: () => void;
}

const AuthorizationSwitch: React.FC<AuthSwitchProps> = ({ isSignUp, toggleMode }) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "15px" }}>
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
);

export default AuthorizationSwitch;
