import { Box, Button } from "@mui/material";
import PropTypes from 'prop-types';
import './ButtDel.css';

interface ButtDelProps {
    id?: string;
    placeholder: string;
    onClick: () => void;
}

const ButtDel: React.FC<ButtDelProps> = ({ id, placeholder, onClick }) => {
    return (
        <Box className="butt">
            <Button id={id || "butt_del"} onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};

ButtDel.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtDel;
