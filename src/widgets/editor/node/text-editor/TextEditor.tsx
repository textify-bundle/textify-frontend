import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './TextEditor.scss';
import { NodeContent, NodeStyles } from '../../../../shared/types/editor/node';

interface TextEditorProps {
  content: NodeContent;
  styles?: NodeStyles;
  onContentChange: (newContent: NodeContent) => void;
  onEnterPress: () => void;
  inputId?: string;
  onDelete?: () => void;
}

const TextEditor = forwardRef<HTMLTextAreaElement, TextEditorProps>(
  ({ content, styles, inputId, onContentChange, onEnterPress, onDelete }, ref) => {
    const [value, setValue] = useState<string>(typeof content === 'string' ? content : '');
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      setCursorPosition(event.target.selectionStart);
      onContentChange(newValue);
    };

    const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
      const target = event.target as HTMLTextAreaElement;
      setCursorPosition(target.selectionStart);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

    const insertTextAtCursor = (textToInsert: string) => {
      if (cursorPosition !== null && ref && 'current' in ref && ref.current) {
        const textarea = ref.current;
        const start = cursorPosition;
        const end = cursorPosition;
        const newValue = value.substring(0, start) + textToInsert + value.substring(end);
        setValue(newValue);
        onContentChange(newValue);
        
        setTimeout(() => {
          textarea.focus();
          const newPosition = start + textToInsert.length;
          textarea.setSelectionRange(newPosition, newPosition);
          setCursorPosition(newPosition);
        }, 0);
      }
    };

    useImperativeHandle(ref, () => ({
      ...((ref as any)?.current || {}),
      insertTextAtCursor,
      getCursorPosition: () => cursorPosition,
    }));

    useEffect(() => {
      setValue(typeof content === 'string' ? content : '');
    }, [content]);

    const renderContent = () => {
      if (typeof content === 'string') {
        return (
          <TextareaAutosize
            id={inputId}
            ref={ref}
            value={value}
            onChange={handleChange}
            onSelect={handleSelect}
            onKeyDown={handleKeyDown}
            style={{
              border: 'none',
              padding: 0,
              background: 'transparent',
              width: '100%',
              resize: 'none',
              overflow: 'hidden',
              outline: 'none',
              ...styles,
            }}
            className="text-editor__input"
          />
        );
      }
      return null;
    };

    return (
      <div className="text-editor" style={styles}>
        {renderContent()}
      </div>
    );
  }
);

export default TextEditor;
