import {useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, FormControl } from '@mui/material';
import './search.css';

const Search = ({   imageSrc='./src/shared/ui/search-bar/magnifyingGlass.png',
                    onClick = () => {},
                    onChange = () => {},
                    placeholder = "Поиск",
                }) => {
    const [searchBlock, setSearchBlock] = useState(false);
    const [valueText, setValue] = useState('');


    const handleClick = () => {
        setSearchBlock(true);
        onClick();
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    const handlePress = async (e) => {
        if (e.key === 'Enter') {
            setValue('');
        }
    }

    return (
        <Box className="search-container">
            {searchBlock ? (
                <TextField
                    id="search-form_side-bar"
                    variant="outlined"
                    onChange={handleChange}
                    onKeyPress={handlePress}
                    value={valueText}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {border: 'none'},
                            '&:hover fieldset': {border: 'none'},
                            '&.Mui-focused fieldset': {border: 'none'},
                        },
                        '& input': {
                            padding: '9px 15px',
                        },
                    }}
                />
            ) : (
                <FormControl id="search-glass" onClick={handleClick}>
                    <img className="search-glass_img" src={imageSrc} alt="glass"/>
                    <p className="search-glass_presearch">{placeholder}</p>
                </FormControl>
            )}
        </Box>
    );
};

Search.propTypes = {
    imageSrc: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Search;