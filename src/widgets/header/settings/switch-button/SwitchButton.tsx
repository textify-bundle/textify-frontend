import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import './SwitchButton.css';
import { Box } from "@mui/material";

interface SwitchButtonProps {
    className?: string;
    checkedProp?: boolean;
    onToggle?: (checked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
    className,
    checkedProp = false,
    onToggle
}) => {
    const [checked, setChecked] = useState(checkedProp);

    useEffect(() => {
        setChecked(checkedProp);
    }, [checkedProp]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        const switchContainer = document.querySelector('.switch-block');

        if (switchContainer) {
            if (newChecked) {
                switchContainer.classList.add('active');
            } else {
                switchContainer.classList.remove('active');
            }
        }

        if (onToggle) {
            onToggle(newChecked);
        }
    };

    return (
        <Box className={`switch-container ${className || ''}`}>
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
};

SwitchButton.propTypes = {
    className: PropTypes.string,
    checkedProp: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default SwitchButton;
