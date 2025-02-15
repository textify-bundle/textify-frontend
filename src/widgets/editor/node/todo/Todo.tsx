import React, { useState } from 'react';
import './Todo.scss';

interface TodoProps {
  content: string;
  checked: boolean;
  onContentChange: (newContent: string) => void; // Укажите тип newContent как string
  onCheckboxChange: (isChecked: boolean) => void;
}

const Todo: React.FC<TodoProps> = ({ content, checked, onContentChange, onCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onCheckboxChange(newChecked);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    onContentChange(newContent);
  };

  return (
    <div className="todo-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="todo-checkbox"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        className={`todo-text ${isChecked ? 'checked' : ''}`}
        style={{
          textDecoration: isChecked ? 'line-through' : 'none',
          opacity: isChecked ? 0.5 : 1,
        }}
      />
    </div>
  );
};

export default Todo;
