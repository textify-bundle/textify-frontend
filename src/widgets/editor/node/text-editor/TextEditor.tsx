import React, { forwardRef, useState, useEffect } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './TextEditor.scss';
import { NodeContent, NodeStyles } from '../../../../shared/types/editor/node';

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

const TextEditor = forwardRef<HTMLTextAreaElement, TextEditorProps>(
  ({ content, styles, inputId, onContentChange, onEnterPress, onDelete, nodeType }, ref) => {
    const [value, setValue] = useState<string>(typeof content === 'string' ? content : '');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      onContentChange(newValue);
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
