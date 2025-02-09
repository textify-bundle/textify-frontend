import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import "./SearchBar.scss";
import Src from './magnifyingGlass.jpg';

interface NewSearchProps {
    className?: string;
    onClick?: () => void;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const SearchBar: React.FC<NewSearchProps> = ({
    className,
    onClick = () => {},
    placeholder = "Поиск",
    value: externalValue,
    onChange = () => {},
}) => {
    const [internalValue, setValue] = useState<string>(externalValue || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    const handlePress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log(e.currentTarget.value);
        }
    };

    return (
        <Box className={`${className} search-container`} onClick={onClick}  >
            <TextField
                variant="outlined"
                onChange={handleChange}
                placeholder={placeholder}
                onKeyPress={handlePress}
                value={internalValue}
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

export default SearchBar;
