import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import './SearchBar.scss';

interface SearchProps {
  iconSrc?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

const NewSearch: React.FC<SearchProps> = ({
  onClick,
  onChange,
  placeholder = 'Поиск',
  value = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(value);
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
        value={value}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                className="search-glass_img"
                src='/icons/magnifyingGlass.svg'
                alt="Search"
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

export default NewSearch;
