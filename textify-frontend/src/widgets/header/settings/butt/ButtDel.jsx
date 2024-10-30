import {Box, Button} from "@mui/material";
import './ButtDel.css';

const ButtDel = ({ placeholder , 
    onClick }) => {
    return (
        <Box className="butt">
            <Button id="butt_del" onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};

ButtDel.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtDel;
