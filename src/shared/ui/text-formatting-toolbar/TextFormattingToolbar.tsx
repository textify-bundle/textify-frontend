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
import './TextFormattingToolbar.scss';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
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

type TextFormattingToolbarProps = {
  handleLeftAlignClick?: () => void;
  handleCenterAlignClick?: () => void;
  handleRightAlignClick?: () => void;
  handleJustifyAlignClick?: () => void;
  handleBoldClick?: () => void;
  handleStrikethroughClick?: () => void;
  handleUnderlinedClick?: () => void;
  handleItalicClick?: () => void;
  handleSizeClick?: () => void;
  handleListClick?: () => void;
};

const TextFormattingToolbar: React.FC<TextFormattingToolbarProps> = ({
  handleLeftAlignClick = () => {},
  handleCenterAlignClick = () => {},
  handleRightAlignClick = () => {},
  handleJustifyAlignClick = () => {},
  handleBoldClick = () => {},
  handleStrikethroughClick = () => {},
  handleUnderlinedClick = () => {},
  handleItalicClick = () => {},
  handleSizeClick = () => {},
  handleListClick = () => {},
}) => {
  const [alignment, setAlignment] = React.useState<string>('left');
  const [formats, setFormats] = React.useState<string[]>(['italic']);

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const iconStyle = {
    fontSize: '11.65px',
    width: '11.65px',
    height: '11.65px',
  };

  return (
    <div>
      <Paper
      sx={{
        display: 'flex',
        border: '1px solid #e0e0e0',
        flexWrap: 'wrap',
        width: '362.36px',
        height: '25.88px',
        borderRadius: '9.71px',
      }}
    >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          className="toggle-button-group"
        >
          <ToggleButton value="left" aria-label="left aligned" onClick={handleLeftAlignClick} className="toggle-button">
            <FormatAlignLeftIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered" onClick={handleCenterAlignClick} className="toggle-button">
            <FormatAlignCenterIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned" onClick={handleRightAlignClick} className="toggle-button">
            <FormatAlignRightIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" onClick={handleJustifyAlignClick} className="toggle-button">
            <FormatAlignJustifyIcon style={iconStyle} />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          className="toggle-button-group"
        >
          <ToggleButton value="bold" aria-label="bold" onClick={handleBoldClick} className="toggle-button">
            <FormatBoldIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="strikethrough" aria-label="strikethrough" onClick={handleStrikethroughClick} className="toggle-button">
            <FormatStrikethroughIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined" onClick={handleUnderlinedClick} className="toggle-button">
            <FormatUnderlinedIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic" onClick={handleItalicClick} className="toggle-button">
            <FormatItalicIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="size" aria-label="size" onClick={handleSizeClick} className="toggle-button">
            <FormatSizeIcon style={iconStyle} />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list" onClick={handleListClick} className="toggle-button">
            <FormatListBulletedIcon style={iconStyle} />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
};

TextFormattingToolbar.defaultProps = {
  handleLeftAlignClick: () => {},
  handleCenterAlignClick: () => {},
  handleRightAlignClick: () => {},
  handleJustifyAlignClick: () => {},
  handleBoldClick: () => {},
  handleStrikethroughClick: () => {},
  handleUnderlinedClick: () => {},
  handleItalicClick: () => {},
  handleSizeClick: () => {},
  handleListClick: () => {},
};

export default TextFormattingToolbar;