import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';

interface SearchProps {
    imageSrc?: string;
    onClick?: () => void;
    onChange?: (value: string) => void;
    placeholder?: string;
    value?: string;
    className?: string; // Добавлен className
}

const Search: React.FC<SearchProps> = ({
    imageSrc = './src/shared/ui/search-bar/magnifyingGlass.png',
    onClick = () => {},
    onChange = () => {},
    placeholder = "Поиск",
    value = " ",
    className = "", // Дефолтное значение для className
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value); // вызываем переданный onChange
        }
    };

    const handlePress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(e.currentTarget.value);
        }
    };

    return (
        <Box className={`search-container ${className}`} onClick={onClick}>
            <TextField
                className={`search-form_side-bar ${className}`}  // Передаем className сюда
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

export default Search;