<<<<<<< HEAD
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
=======
// import PropTypes from 'prop-types';
// import { TextField, Box, InputAdornment } from '@mui/material';
// import './search.scss';

// const Search = ({
//     imageSrc = './src/shared/ui/search-bar/magnifyingGlass.png',
//     onClick = () => {},
//     onChange = () => {},
//     placeholder = "Поиск",
//     value = " ",
// }) => {

//     const handleChange = (e) => {
//         onChange(e.target.value);
//     };

//     const handlePress = async (e) => {
//         if (e.key === 'Enter') {
//             console.log(e.target.value)
//         }
//     }

//     return (
//         <Box className="search-container" onClick={onClick}>
//             <TextField
//                 className="search-form_side-bar"
//                 variant="outlined"
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 onKeyPress={handlePress}
//                 value={value}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <img className="search-glass_img" src={imageSrc} alt="glass" />
//                         </InputAdornment>
//                     ),
//                 }}
//                 sx={{
//                     '& .MuiOutlinedInput-root': {
//                         '& fieldset': { border: '0' },
//                         '&:hover fieldset': { border: '0' },
//                         '&.Mui-focused fieldset': { border: '0' },
//                     },
//                     '& .MuiOutlinedInput-notchedOutline': {
//                         border: 'none',
//                     },
//                 }}
//             />
//         </Box>
//     );
// };

// Search.propTypes = {
//     imageSrc: PropTypes.string,
//     onClick: PropTypes.func,
//     onChange: PropTypes.func,
//     placeholder: PropTypes.string,
//     value : PropTypes.string,
// };

// export default Search;
>>>>>>> dev
