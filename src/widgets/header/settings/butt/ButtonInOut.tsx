import React from 'react';
import { Box, Button } from '@mui/material';

interface ButtonInOutProps {
    placeholder: string;
    onClick: () => void;
    className?: string; 
}

const ButtonInOut: React.FC<ButtonInOutProps> = ({ placeholder = 'Выход', onClick, className = '' }) => {
    return (
        <Box className="butt">
            <Button className={className} onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};

// export default ButtonInOut;