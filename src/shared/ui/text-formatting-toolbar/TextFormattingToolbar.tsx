import { styled } from '@mui/material/styles';
import {
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  FormatStrikethrough as FormatStrikethroughIcon,
  FormatSize as FormatSizeIcon,
} from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import './TextFormattingToolbar.scss';
import React,{ useState } from 'react';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: 0,
    borderRadius: 0,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
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
  handleSizeClick?: (event: React.MouseEvent<HTMLElement>) => void;
  handleListClick?: () => void;
};

/**
 * TextFormattingToolbar component provides a toolbar with various text formatting options.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {Function} props.handleLeftAlignClick - Callback function for left align button click.
 * @param {Function} props.handleCenterAlignClick - Callback function for center align button click.
 * @param {Function} props.handleRightAlignClick - Callback function for right align button click.
 * @param {Function} props.handleJustifyAlignClick - Callback function for justify align button click.
 * @param {Function} props.handleBoldClick - Callback function for bold button click.
 * @param {Function} props.handleStrikethroughClick - Callback function for strikethrough button click.
 * @param {Function} props.handleUnderlinedClick - Callback function for underlined button click.
 * @param {Function} props.handleItalicClick - Callback function for italic button click.
 * @param {Function} props.handleSizeClick - Callback function for size button click.
 * @param {Function} props.handleListClick - Callback function for list button click.
 * 
 * @returns {JSX.Element} The rendered TextFormattingToolbar component.
 */
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
  const [alignment, setAlignment] = useState<string>('left');
  const [formats, setFormats] = useState<string[]>(['italic']);

  const handleFormat = (_event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
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

export default TextFormattingToolbar;
