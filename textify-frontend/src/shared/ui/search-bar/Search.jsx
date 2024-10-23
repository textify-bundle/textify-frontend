import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
import './search.css';
import MagnifyingGlass from './MagnifyingGlass';

const Search = ({
                    onClick = () => {},
                    onBlur = () => {},
                    placeholder = "Поиск",
                    
                }) => {
    const [searchBlock, setSearchBlock] = useState(false);

    const handleBlur = () => {
        setSearchBlock(false);
        onBlur();
    };

    const handleClick = () => {
        setSearchBlock(true);
        onClick();
    };


    return (
        <Box className="searchContainer">
            <form>
                {searchBlock ? (
                    <TextField
                        className="sideBarSearch"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
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
                    <Box
                        className="searchBar"
                        onClick={handleClick}
                    >
                        <div className="searchGlass"> {/* Changed from form to div */}
                            <MagnifyingGlass />
                            <p className="pre-search">{placeholder}</p>
                        </div>
                    </Box>
                )}
            </form>
        </Box>
    );
};

Search.propTypes = {
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
};

export default Search;
