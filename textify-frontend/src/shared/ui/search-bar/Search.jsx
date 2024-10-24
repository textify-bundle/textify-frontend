import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, FormControl } from '@mui/material';
import './search.css';
import MagnifyingGlass from './MagnifyingGlass';

const Search = ({
                    onClick = () => {},
                    onBlur = () => {},
                    placeholder = "Поиск",
                }) => {
    const [searchBlock, setSearchBlock] = useState(false);
    const [valueText, setValue] = useState('');

    const handleBlur = () => {
        setSearchBlock(false);
        onBlur();
    };

    const handleClick = () => {
        setSearchBlock(true);
        onClick();
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(e.target.value);
    };
     const handlePress = async(e) =>{
         if(e.key ==='Enter'){
             setValue('');
             // реализуем отправку на сервер или перенаправляем куда надо
         }
     }

    return (
        <Box className="search-container">
            <FormControl>
                {searchBlock ? (
                    <TextField
                        className="search-side-bar"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyPress={handlePress}
                        value={valueText}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { border: 'none' },
                                '&.Mui-focused fieldset': { border: 'none' },
                            },
                            '& input': {
                                padding: '9px 15px',
                            },
                        }}
                    />
                ) : (
                    <FormControl id="search-glass" onClick={handleClick}>
                        <svg xmlns="/img/svg/Icon.svg" width="14" height="15" viewBox="0 0 14 15" fill="none"/>
                        <p className="search-glass_presearch">{placeholder}</p>
                    </FormControl>
                )}
            </FormControl>
        </Box>
    );
};

Search.propTypes = {
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
};

export default Search;
