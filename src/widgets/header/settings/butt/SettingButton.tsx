import {Box, Button} from "@mui/material";
import './SettingButton.scss';

interface Butt {
    placeholder: string , 
    onClick?: () => void;
}

const SettingButton:  React.FC <Butt>=({
    placeholder = "кнопка",
    onClick
}) => {
    return (
        <Box className="butt">
            <Button className="butt_del" onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};


export default SettingButton;
