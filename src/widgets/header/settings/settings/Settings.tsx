import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../../../shared/ui/search-bar/SearchBar';
import SettingButton from '../buttons/SettingButton';
import ButtonInOut from '../buttons/ButtonInOut';
import './Settings.scss';
import TModal from '../../../../shared/tmodal/TModal';
import { MuiColorInput } from 'mui-color-input';
import { useNavigate } from 'react-router-dom';
import { 
  setBackgroundColor, 
  setBarColor, 
  setTextColor,
  setFontSize,
  setFontFamily,
  allowedFontFamilies,
  UserSettingsState
} from '../../../../store/slices/userSettingsSlice';
import { RootState } from '../../../../store';

interface SettingsProps {
  isTrash?: boolean;
}

const Settings: React.FC<SettingsProps> = ({ isTrash = false }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [valueText, setValueText] = React.useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector((state: RootState) => state.userSettings);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleColorChange = (colorType: keyof Pick<UserSettingsState, 'backgroundColor' | 'textColor' | 'barColor'>) => 
    (color: string) => {
      switch (colorType) {
        case 'backgroundColor':
          dispatch(setBackgroundColor(color));
          break;
        case 'textColor':
          dispatch(setTextColor(color));
          break;
        case 'barColor':
          dispatch(setBarColor(color));
          break;
      }
    };

  return (
    <>
      <TModal isOpen={open} onClose={handleClose} title="Settings">
        <Box className="settings-dialog">
          {!isTrash && <Search placeholder="Search in file" value={valueText} onChange={setValueText} />}
          {!isTrash && <SettingButton placeholder="Delete project" onClick={handleClose} />}

          <Box className="settings-theme">
            <Typography variant="body1">Background Color:</Typography>
            <MuiColorInput value={settings.backgroundColor} onChange={handleColorChange('backgroundColor')}/>
          </Box>
          <Box className="settings-theme">
            <Typography variant="body1">Main Color:</Typography>
            <MuiColorInput value={settings.barColor} onChange={handleColorChange('barColor')}/>
          </Box>
          <Box className="settings-theme">
            <Typography variant="body1">Text Color:</Typography>
            <MuiColorInput value={settings.textColor} onChange={handleColorChange('textColor')}/>
          </Box>

          <Box className="settings-theme">
            <Typography variant="body1">Font Size:</Typography>
            <Select
              value={settings.fontSize}
              onChange={(e) => dispatch(setFontSize(e.target.value as '10px' | '12px' | '16px'))}
            >
              <MenuItem value="10px">Small (10px)</MenuItem>
              <MenuItem value="12px">Medium (12px)</MenuItem>
              <MenuItem value="16px">Large (16px)</MenuItem>
            </Select>
          </Box>

          <Box className="settings-theme">
            <Typography variant="body1">Font Family:</Typography>
            <Select
              value={settings.fontFamily}
              onChange={(e) => dispatch(setFontFamily(e.target.value))}
            >
              {allowedFontFamilies.map((font) => (
                <MenuItem key={font} value={font}>
                  {font.split(',')[0].replace(/['"]/g, '')}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box className="settings-theme">
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                handleClose();
                window.location.href = '/main/settings/ai';
              }}
              sx={{ mt: 2 }}
            >
              Настройки AI
            </Button>
          </Box>

          <ButtonInOut placeholder="Exit" onClick={handleClose} />
        </Box>
      </TModal>

      <Box id="settings">
        <Button id="settings-button" onClick={handleOpen}>
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </Button>
      </Box>
    </>
  );
};

export default Settings;