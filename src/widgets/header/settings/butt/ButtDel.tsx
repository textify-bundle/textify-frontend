import {Box, Button} from "@mui/material";

interface ButtDelProps {
    placeholder: string;
    onClick: () => void;
    className?: string; // Добавляем className
}

const ButtDel: React.FC<ButtDelProps> = ({ placeholder , 
    onClick, className }) => {
    return (
        <Box className="butt">
            <Button className = {className} onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};

export default ButtDel;
