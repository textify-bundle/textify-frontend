import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 0,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
}));
const handleLeftAlignClick = () => {};
const handleCenterAlignClick = () => {};
const handleRightAlignClick = () => {};
const handleJustifyAlignClick = () => {};
const handleBoldClick = () => {};
const handleStrikethroughClick = () => {};
const handleUnderlinedClick = () => {};
const handleItalicClick = () => {};
const handleSizeClick = () => {};
const handleListClick = () => {};


const CustomizedDividers = () => {
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Paper
        elevation={16}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          width: '362.36px' ,
          height: '25.88px',
          borderRadius: '9.71px',
        })}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned"  onClick={handleLeftAlignClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatAlignLeftIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered" onClick={handleCenterAlignClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatAlignCenterIcon sx={{ fontSize: 11.65 }} />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned" onClick={handleRightAlignClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatAlignRightIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" onClick={handleJustifyAlignClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatAlignJustifyIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold"  onClick={handleBoldClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatBoldIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
          <ToggleButton value="strikethrough" aria-label="strikethrough" onClick={handleStrikethroughClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
          <FormatStrikethroughIcon sx={{ fontSize: 11.65 }}/>
        </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined" onClick={handleUnderlinedClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatUnderlinedIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic"  onClick={handleItalicClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatItalicIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
          <ToggleButton value="size" aria-label="size"  onClick={handleSizeClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatSizeIcon sx={{ fontSize: 11.65 }} />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list" onClick={handleListClick} style={{margin: '5.18px 10.35px 5.18px 10.35px'}} sx={{ width: '15.53px', height: '15.53px', minWidth: '15.53px', minHeight: '15.53px'}}>
            <FormatListBulletedIcon sx={{ fontSize: 11.65 }}/>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
};

export default CustomizedDividers;