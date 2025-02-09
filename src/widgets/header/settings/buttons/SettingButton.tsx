import {Box, Button} from "@mui/material";
import './SettingButton.scss';

interface ButtProps {
    placeholder: string , 
    onClick?: () => void;
}

const SettingButton:  React.FC <ButtProps>=({
    placeholder = "кнопка",
    onClick
}) => {
    return (
        <Box className="butt" >
            <Button className="butt_del" onClick={onClick}>
                {placeholder}
            </Button>
        </Box>
    );
};


export default SettingButton;
