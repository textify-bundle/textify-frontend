import {Box, Button} from "@mui/material";
import './ButtDel.css';

const ButtDel = ({ placeholder = "кнопка", onClick }) => {
    return (
        <Box className="butt">
            <Button id="butt_del" onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};

export default ButtDel;
