import { Box, Button } from "@mui/material";
import './ButtonInOut.scss';
import { supabase } from "../../../../utils/client";   

interface ButtInOut {
  placeholder: string , 
  onClick?: () => void;
}


const ButtonInOut: React.FC<ButtInOut>= ({
   placeholder = "Выход",
    onClick
   }) => {
  
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
      <Button className="butt_in-out" onClick={handleSignOut}>
        {placeholder}
      </Button>
    </Box>
  );
};


export default ButtonInOut;
