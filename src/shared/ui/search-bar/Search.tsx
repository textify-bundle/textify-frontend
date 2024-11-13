import PropTypes from 'prop-types';
import { TextField, Box, InputAdornment } from '@mui/material';
import './search.scss';



const Search = ({
    imageSrc = './src/shared/ui/search-bar/magnifyingGlass.png',
    onClick = () => {},
    onChange = () => {},
    placeholder = "Поиск",
    value = " ",
}) => {

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const handlePress = async (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value)
        }
    }

    return (
        <Box sx={{ width:'183px',}} className="search-container" onClick={onClick}>
            <TextField
                className="search-form_side-bar"
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
                    width:'183px',
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
