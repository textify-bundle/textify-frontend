import { Box, Button } from "@mui/material";
import PropTypes from 'prop-types';
import './ButtonInOut.css';
import { supabase } from "../../../../utils/client";   

const ButtonInOut = ({ placeholder = "Выход", onClick }) => {
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();   
      if (error) {
        console.error("Ошибка выхода:", error.message);
      } else {
        console.log("Пользователь вышел");
        if (onClick) onClick();   
      }
    } catch (error) {
      console.error("Ошибка при попытке выйти:", error);
    }
  };

  return (
    <Box className="butt">
      <Button id="butt_in-out" onClick={handleSignOut}>
        {placeholder}
      </Button>
    </Box>
  );
};

ButtonInOut.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ButtonInOut;
