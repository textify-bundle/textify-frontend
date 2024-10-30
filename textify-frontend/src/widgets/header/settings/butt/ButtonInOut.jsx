import {Box, Button} from "@mui/material";
import './ButtonInOut.css';

const ButtonInOut = ({placeholder = "Выход", onClick}) => {


    return (
        <Box className="butt" >
            <Button id="butt_in-out" onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};

export default ButtonInOut;