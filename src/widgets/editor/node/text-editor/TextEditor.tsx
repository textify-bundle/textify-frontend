import React, { forwardRef, useState, useEffect, useImperativeHandle, useRef } from 'react';
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
  nodeId?: string;
  nodeType?: string;
}

export interface TextEditorImperativeHandle {
  insertTextAtCursor: (text: string) => void;
  getCursorPosition: () => number | null;
}

const TextEditor = forwardRef<TextEditorImperativeHandle, TextEditorProps>(
  ({ content, styles, inputId, onContentChange, onEnterPress, onDelete, nodeId, nodeType }, ref) => {
    const [value, setValue] = useState<string>(typeof content === 'string' ? content : '');
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    useImperativeHandle(ref, () => ({
      insertTextAtCursor: (textToInsert: string) => {
        if (textareaRef.current) {
          const start = textareaRef.current.selectionStart;
          const end = textareaRef.current.selectionEnd;
          const newValue = value.substring(0, start) + textToInsert + value.substring(end);
          setValue(newValue);
          onContentChange(newValue);
          
          // Установка курсора после вставленного текста
          setTimeout(() => {
            if (textareaRef.current) {
              const newPosition = start + textToInsert.length;
              textareaRef.current.selectionStart = newPosition;
              textareaRef.current.selectionEnd = newPosition;
              textareaRef.current.focus();
            }
          }, 0);
        }
      },
      getCursorPosition: () => cursorPosition
    }));

    useEffect(() => {
      setValue(typeof content === 'string' ? content : '');
    }, [content]);

    const renderContent = () => {
      if (typeof content === 'string') {
        return (
          <TextareaAutosize
            id={inputId}
            ref={textareaRef}
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
              fontSize: nodeType === 'heading' ? '1.5em' : '1em', 
              fontWeight: nodeType === 'heading' ? 'bold' : 'normal',
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
