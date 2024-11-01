import {Box, Button} from "@mui/material";
import PropTypes from 'prop-types';
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
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtDel;
