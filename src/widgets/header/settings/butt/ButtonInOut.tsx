import { Box, Button } from "@mui/material";
import PropTypes from 'prop-types';
import './ButtonInOut.css';
import { supabase } from "../../../../utils/client";

interface ButtonInOutProps {
    className?: string;
    placeholder?: string;
    onClick?: () => void;
    sx?: object;
}

const ButtonInOut: React.FC<ButtonInOutProps> = ({
    className,
    placeholder = "Выход",
    onClick,
    sx
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
            <Button
                className={className}
                id="butt_in-out"
                onClick={handleSignOut}
                sx={sx}
            >
                {placeholder}
            </Button>
        </Box>
    );
};

ButtonInOut.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    sx: PropTypes.object,
};

export default ButtonInOut;
