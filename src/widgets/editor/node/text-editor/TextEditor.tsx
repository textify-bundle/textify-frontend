import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFloating, flip, shift, autoUpdate, offset } from '@floating-ui/react';
import { Menu, MenuItem } from '@mui/material';
import './TextEditor.scss';
import { NodeContent, NodeStyles, NodeType } from '../../../../shared/types/editor/node';
import TextFormattingToolbar from '../../../../shared/ui/text-formatting-toolbar/TextFormattingToolbar';
import { useDispatch } from 'react-redux';
import { updateNode } from '../../../../store/slices/nodeSlice';

interface TextEditorProps {
  content: NodeContent;
  styles?: NodeStyles;
  onContentChange: (newContent: NodeContent) => void;
  onEnterPress: () => void;
  inputId?: string;
  nodeId: string;
  nodeType: NodeType; 
  onDelete?: () => void;
  onDropdown?: (value: boolean) => void;
}

const TextEditor = forwardRef<ReactQuill, TextEditorProps>(({
  content, styles, inputId, onContentChange, onEnterPress, onDelete, onDropdown, nodeType
}) => {
  const [value, setValue] = useState<string>(typeof content === 'string' ? content : '');
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const [, setSelectedSize] = useState<string>('normal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const quillRef = useRef<ReactQuill | null>(null);
  const valueRef = useRef(value);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setToolbarMaxLeft] = useState<number>(0);
  const dispatch = useDispatch();

  const { x, y, refs, update } = useFloating({
    placement: 'left',
    middleware: [
      offset({ mainAxis: -100, crossAxis: -40 }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const sizes = ['small','normal', 'large', 'huge'];

  const handleChange = (newValue: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const selection = quill.getSelection();
    valueRef.current = newValue;
    setValue(newValue);
    onContentChange(newValue);

    const plainText = newValue.replace(/<[^>]+>/g, '').trim();

    if (plainText.startsWith('/')) {
      onDropdown?.(true);
    } else {
      onDropdown?.(false);
    }

    if (inputId) {
      dispatch(updateNode({ id: inputId, type: nodeType, content: newValue, styles }));
    }

    setTimeout(() => {
      if (selection) {
        quill.setSelection(selection); 
      }
    }, 0);
  };

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    if (value !== content) {
      const selection = quill.getSelection();
      setValue(typeof content === 'string' ? content : '');

      setTimeout(() => {
        if (selection) {
          quill.setSelection(selection);
        }
      }, 0);
    }
  }, [content]);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const quill = quillRef.current?.getEditor();
    const plainText = value.replace(/<[^>]+>/g, '').trim();
    if (!quill) return;
  
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEnterPress();
    } else if (event.key === 'Backspace' && plainText === '') {
      event.preventDefault();
      onDelete?.();
    } 
  };

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, []); 
  
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
      quill.format('align', 'justify');
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
    setAnchorEl(null);
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
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setToolbarMaxLeft(containerRect.right - 365);
    }
  }, []);

  return (
    <div className="text-editor" style={styles}>
      {isToolbarVisible && (
        <div
          ref={refs.setFloating}
          style={{
            position: 'relative',
            maxWidth: '365px',
            top: `${Math.min(Math.max((y ?? 0) / window.innerWidth * 100, 5), 20)}%`,
            left: `${Math.min(Math.max((x ?? 0) / window.innerWidth * 100, 10), 30)}%`,
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
        value={valueRef.current}
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