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
import './index.scss';

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
  handleLeftAlignClick: () => void;
  handleCenterAlignClick: () => void;
  handleRightAlignClick: () => void;
  handleJustifyAlignClick: () => void;
  handleBoldClick: () => void;
  handleStrikethroughClick: () => void;
  handleUnderlinedClick: () => void;
  handleItalicClick: () => void;
  handleSizeClick: () => void;
  handleListClick: () => void;
};

const TextFormattingToolbar: React.FC<TextFormattingToolbarProps> = ({
  handleLeftAlignClick,
  handleCenterAlignClick,
  handleRightAlignClick,
  handleJustifyAlignClick,
  handleBoldClick,
  handleStrikethroughClick,
  handleUnderlinedClick,
  handleItalicClick,
  handleSizeClick,
  handleListClick,
}) => {
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState<string[]>(['italic']);

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Paper className="toolbar-paper">
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          className="toolbar-paper__toggle-button-group"
        >
          <ToggleButton value="left" aria-label="left aligned" onClick={handleLeftAlignClick} className="toolbar-paper__toggle-button">
            <FormatAlignLeftIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered" onClick={handleCenterAlignClick} className="toolbar-paper__toggle-button">
            <FormatAlignCenterIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned" onClick={handleRightAlignClick} className="toolbar-paper__toggle-button">
            <FormatAlignRightIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" onClick={handleJustifyAlignClick} className="toolbar-paper__toggle-button">
            <FormatAlignJustifyIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          className="toolbar-paper__toggle-button-group"
        >
          <ToggleButton value="bold" aria-label="bold" onClick={handleBoldClick} className="toolbar-paper__toggle-button">
            <FormatBoldIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="strikethrough" aria-label="strikethrough" onClick={handleStrikethroughClick} className="toolbar-paper__toggle-button">
            <FormatStrikethroughIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined" onClick={handleUnderlinedClick} className="toolbar-paper__toggle-button">
            <FormatUnderlinedIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic" onClick={handleItalicClick} className="toolbar-paper__toggle-button">
            <FormatItalicIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="size" aria-label="size" onClick={handleSizeClick} className="toolbar-paper__toggle-button">
            <FormatSizeIcon className="toolbar-paper__toggle-button__icon" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list" onClick={handleListClick} className="toolbar-paper__toggle-button">
            <FormatListBulletedIcon className="toolbar-paper__toggle-button__icon" />
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