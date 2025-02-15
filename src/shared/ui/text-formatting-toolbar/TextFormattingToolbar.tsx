import React from 'react';
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
  return (
    <div>
      <Paper sx={{ display: 'flex', border: '1px solid #e0e0e0', flexWrap: 'wrap', width: '362px', height: '25px', borderRadius: '9px' }}>
        <StyledToggleButtonGroup size="small" aria-label="text alignment">
        <ToggleButton value="left" onClick={handleLeftAlignClick}>
          <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" onClick={handleCenterAlignClick}>
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" onClick={handleRightAlignClick}>
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" onClick={handleJustifyAlignClick}>
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup size="small" aria-label="text formatting">
          <ToggleButton value="bold" onClick={handleBoldClick}>
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" onClick={handleItalicClick}>
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" onClick={handleUnderlinedClick}>
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="strikethrough" onClick={handleStrikethroughClick}>
            <FormatStrikethroughIcon />
          </ToggleButton>
          <ToggleButton value="list" onClick={handleListClick}>
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton value="size" onClick={handleSizeClick}>
            <FormatSizeIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
};

export default TextFormattingToolbar;
