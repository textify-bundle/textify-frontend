import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import "./NewSearch.scss";
import Src from './magnifyingGlass.jpg';
interface NewSearchProps {
    onClick?: () => void;
    placeholder?: string;
    onValueChange?: (value: string) => void;
}

const NewSearch: React.FC<NewSearchProps> = ({
onClick = () => {},
placeholder = "Поиск",
onValueChange = () => {},
}) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onValueChange(newValue); 
    };

    const handlePress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(e.currentTarget.value);
        }
    };

    return (
        <Box className={`search-container`} onClick={onClick}  >
            <TextField
                variant="outlined"
                onChange={handleChange}
                placeholder={placeholder}
                onKeyPress={handlePress}
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img  src={Src}  />
                        </InputAdornment>
                    ),
                    style: {fontSize: 12, gap: "5px", marginLeft: 2}

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
