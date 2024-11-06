import {Box, Button} from "@mui/material";
import PropTypes from 'prop-types';
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

ButtonInOut.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ButtonInOut;