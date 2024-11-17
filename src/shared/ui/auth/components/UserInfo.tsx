
import React from "react";
import { Box, Typography } from "@mui/material";

interface UserInfoProps {
  user: any; // Подставьте подходящий тип для user
  session: any; // Подставьте подходящий тип для session
}

const UserInfo: React.FC<UserInfoProps> = ({ user, session }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6">Данные пользователя</Typography>
    <pre>{JSON.stringify(user, null, 2)}</pre>
    <Typography variant="h6" sx={{ mt: 2 }}>
      Данные сессии
    </Typography>
    <pre>{JSON.stringify(session, null, 2)}</pre>
  </Box>
);

export default UserInfo;
