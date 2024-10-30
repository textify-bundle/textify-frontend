import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import './SwitchButton.css';
import {Box} from "@mui/material";

export default function SwitchButton({checkedProp, onToggle,}) {
    const [checked, setChecked] = useState(checkedProp);

    useEffect(() => {
        setChecked(checkedProp);
    }, [checkedProp]);

    const handleChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        const switchContainer = document.querySelector('.switch-block');

        if (newChecked) {
            switchContainer.classList.add('active');
        } else {
            switchContainer.classList.remove('active');
        }

        if (onToggle) {
            onToggle(newChecked);
        }
    };

    return (
        <Box className="switch-container">
            <Box className="switch-block">
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    classes={{
                        root: 'switch-block_root',
                        thumb: 'switch-block_thumb',
                        track: 'switch-block_track',
                        checked: 'switch-block_checked',
                    }}
                />
            </Box>
        </Box>
    );
}

SwitchButton.defaultProps = {
    checkedProp: false,
    onToggle: null,
};

SwitchButton.propTypes = {
    checkedProp: PropTypes.bool,
    onToggle: PropTypes.func,
};
