import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import './SearchBar.scss';

interface SearchProps {
    iconSrc?:  './src/shared/ui/search-bar/magnifyingGlass.svg';
    onClick?: () => void;
    onChange?: (value: string) => void;
    placeholder?: string;
    value?: string;
}

const Search: React.FC<SearchProps> = ({
    iconSrc = './src/shared/ui/search-bar/magnifyingGlass.svg', 
    onClick,
    onChange,
    placeholder = "Поиск",
    value = "",
}) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (onChange) {
            onChange(newValue); 
        } else {
            setInternalValue(newValue); 
        }
    };

    const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(internalValue);
        }
    };

    return (
        <Box className="search-container" onClick={onClick}>
            <TextField
                className="search-form_side-bar"
                variant="outlined"
                onChange={handleChange}
                placeholder={placeholder}
                onKeyPress={handlePress}
                value={onChange ? value : internalValue} 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img
                                className="search-glass_img"
                                src={iconSrc}
                            />
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

export default Search;
