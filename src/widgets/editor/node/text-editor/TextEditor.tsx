import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFloating, flip, shift, autoUpdate, offset } from '@floating-ui/react';
import { Menu, MenuItem } from '@mui/material';
import './TextEditor.scss';
import { NodeContent, NodeStyles } from '../../../../shared/types/editor/node';
import TextFormattingToolbar from '../../../../shared/ui/text-formatting-toolbar/TextFormattingToolbar';

interface TextEditorProps {
  content: NodeContent;
  styles?: NodeStyles;
  onContentChange: (newContent: NodeContent) => void;
  onEnterPress: () => void;
  inputId?: string;
  nodeId: string;
  onDelete?: () => void;
  nodeType?: string;
}

const TextEditor = forwardRef<ReactQuill, TextEditorProps>(({
  content, styles, inputId, onContentChange, onEnterPress, onDelete
}) => {
  const [value, setValue] = useState<string>(typeof content === 'string' ? content : '');
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const [, setSelectedSize] = useState<string>('normal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const quillRef = useRef<ReactQuill | null>(null);
  const { x, y, refs, update } = useFloating({
    placement: 'left',
    middleware: [
      offset({ mainAxis: -100, crossAxis: -40 }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const sizes = ['small', 'large', 'huge'];

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onContentChange(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEnterPress();
    } else if (event.key === 'Backspace' && value === '' && !event.shiftKey) {
      event.preventDefault();
      if (onDelete) {
        onDelete();
      }
    }
  };

  const handleBold = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const format = quill.getFormat();
      quill.format('bold', !format.bold);
    }
  };

  const handleItalic = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const format = quill.getFormat();
      quill.format('italic', !format.italic);
    }
  };

  const handleAlignJustify = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.format('align', 'justify');
      quill.root.classList.add('justify');
    }
  };

  const handleAlignLeft = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.root.classList.remove('justify');
      quill.format('align', 'left');
    }
  };

  const handleAlignCenter = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.root.classList.remove('justify');
      quill.format('align', 'center');
    }
  };

  const handleAlignRight = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.format('align', 'right');
      quill.root.classList.remove('justify');
    }
  };

  const handleStrikethrough = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const format = quill.getFormat();
      quill.format('strike', !format.strike);
    }
  };

  const handleUnderlined = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const format = quill.getFormat();
      quill.format('underline', !format.underline);
    }
  };

  const handleList = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const format = quill.getFormat();
      if (format.list === 'ordered') {
        quill.format('list', false);
      } else {
        quill.format('list', 'ordered');
      }
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const selection = quill.getSelection();
      if (selection && selection.length > 0) {
        quill.formatText(selection.index, selection.length, 'size', size);
      } else {
        quill.format('size', size);
      }
    }
    setAnchorEl(null); // Close the menu after selecting a size
  };

  const handleSelectionChange = useCallback(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const selection = quill.getSelection();
      if (selection && selection.length > 0) {
        const rangeBounds = quill.getBounds(selection.index, selection.length);
        refs.setReference({
          getBoundingClientRect: () => ({
            x: rangeBounds.left,
            y: rangeBounds.top,
            width: rangeBounds.width,
            height: rangeBounds.height,
            top: rangeBounds.top,
            right: rangeBounds.left + rangeBounds.width,
            bottom: rangeBounds.top + rangeBounds.height,
            left: rangeBounds.left,
          }),
        });
        setIsToolbarVisible(true);
        update();
      } else {
        setIsToolbarVisible(false);
      }
    }
  }, [refs, update]);

  const toggleSizeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };  

  useEffect(() => {
    const quill = quillRef.current?.getEditor();

    if (quill) {
      quill.on('selection-change', handleSelectionChange);
    }
    return () => {
      if (quill) {
        quill.off('selection-change', handleSelectionChange);
      }
    };
  }, [handleSelectionChange]);

  useEffect(() => {
    setValue(typeof content === 'string' ? content : '');
  }, [content]);

  return (
    <div className="text-editor" style={styles}>
      {isToolbarVisible && (
        <div
          ref={refs.setFloating}
          style={{
            position: 'relative',
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 10,
          }}
        >
          <TextFormattingToolbar
            handleBoldClick={handleBold}
            handleItalicClick={handleItalic}
            handleLeftAlignClick={handleAlignLeft}
            handleCenterAlignClick={handleAlignCenter}
            handleRightAlignClick={handleAlignRight}
            handleJustifyAlignClick={handleAlignJustify}
            handleStrikethroughClick={handleStrikethrough}
            handleUnderlinedClick={handleUnderlined}
            handleListClick={handleList}
            handleSizeClick={toggleSizeMenu} 
          />
        </div>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {sizes.map((size) => (
          <MenuItem key={size} onClick={() => handleSizeChange(size)}>
            {size}
          </MenuItem>
        ))}
      </Menu>

      <ReactQuill
        ref={quillRef}
        id={inputId}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{
          border: 'none',
          paddingBottom: '0px',
          paddingTop: '10px',
          paddingLeft: '5px',
          background: 'transparent',
          width: '100%',
          minHeight: '30px',
          outline: 'none',
          ...styles,
        }}
        modules={{
          toolbar: false,
        }}
      />
    </div>
  );
});

export default TextEditor;
