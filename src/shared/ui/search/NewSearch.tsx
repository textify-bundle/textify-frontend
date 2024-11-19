import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import "./NewSearch.scss"

interface NewSearchProps {
    imageSrc?: string;
    onClick?: () => void;
    onChange?: (value: string) => void;
    placeholder?: string;
    value?: string;
}

const NewSearch: React.FC<NewSearchProps> = ({
    imageSrc = './src/shared/ui/search/magnifyingGlass.png', //ПИШУ ОТ САМ (АРТЕМ), по идее можно и не передавать пропсом картинку, но вроде и так норм
    onClick = () => {},
    onChange = () => {},    
    placeholder = "Поиск",
    value = "",
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value); 
        }
    };

    const handlePress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(e.currentTarget.value);
        }
    };

    return (
        <Box className={`search-container `} onClick={onClick} sx = {{ 
            width: "184px",
        }}> 
            <TextField
                variant="outlined"
                onChange={handleChange}
                placeholder={placeholder}
                onKeyPress={handlePress}
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img className="search-glass_img" src={imageSrc} alt="glass" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: '0' },
                        '&:hover fieldset': { border: '0' },
                        '&.Mui-focused fieldset': { border: '0' },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        
                    },
                }}
            />
        </Box>
    );
};

export default NewSearch;