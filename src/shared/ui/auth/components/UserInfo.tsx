
import React from "react";
import { Box, Typography } from "@mui/material";
import { User, Session } from "@supabase/supabase-js";

interface UserInfoProps {
  user: User; 
  session: Session; 
}

const UserInfo: React.FC<UserInfoProps> = ({ user, session }) => (
  <Box sx={{ mt: 3 }}>
    {/* cspell: disable-next-line */}
    <Typography variant="h6">Данные пользователя</Typography>
    <pre>{JSON.stringify(user, null, 2)}</pre>
    {/* cspell: disable-next-line */}
    <Typography variant="h6" sx={{ mt: 2 }}>
      {/* cspell: disable-next-line */}
      Данные сессии
    </Typography>
    <pre>{JSON.stringify(session, null, 2)}</pre>
  </Box>
);

export default UserInfo;
