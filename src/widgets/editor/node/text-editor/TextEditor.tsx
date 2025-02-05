// src/components/text-editor/TextEditor.tsx
import React, { useState } from 'react';
import { Input } from '@mui/base/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './TextEditor.scss';
import { NodeContent, NodeStyles } from '../../../../shared/types/editor/node';

interface TextEditorProps {
  content: NodeContent;
  styles?: NodeStyles;
  onContentChange: (newContent: NodeContent) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, styles, onContentChange }) => {
  const [value, setValue] = useState(content);

  const handleChange = (newValue: NodeContent) => {
    setValue(newValue);
    onContentChange(newValue);
  };

  const renderContent = () => {
    if (typeof content === 'string') {
      return (
        <Input
          multiline
          slots={{
            textarea: TextareaAutosize,
          }}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          slotProps={{
            input: {
              style: {
                border: 'none',
                padding: 0,
                background: 'transparent',
                width: '100%',
                resize: 'none',
                overflow: 'hidden',
                outline: 'none',
              },
            },
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
};

export default TextEditor;
