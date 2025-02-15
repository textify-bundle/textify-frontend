import React, { useState, useRef, useEffect } from 'react';
import './Todo.scss';

interface TodoProps {
  content: string;
  checked: boolean;
  onContentChange: (newContent: string) => void;
  onCheckboxChange: (isChecked: boolean) => void;
}

const Todo: React.FC<TodoProps> = ({ content, checked, onContentChange, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onCheckboxChange(newChecked);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    onContentChange(newContent);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="todo-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="todo-checkbox"
      />
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        className={`todo-text ${isChecked ? 'checked' : ''}`}
        style={{
          textDecoration: isChecked ? 'line-through' : 'none',
          opacity: isChecked ? 0.5 : 1,
          width: '100%',
          resize: 'none',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default Todo;
