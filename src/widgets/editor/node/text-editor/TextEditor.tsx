import React, { useState } from 'react';
import { Input } from '@mui/base/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './TextEditor.scss';
import { NodeContent, TodoContent, MediaContent, FileContent, TableContent, CalloutContent, BookmarkContent, EquationContent, NodeStyles, Node } from '../../../shared/types/editor';

interface TextEditorProps {
  content: NodeContent;
  styles?: NodeStyles;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, styles }) => {
  const [value, setValue] = useState(content);

  const renderContent = () => {
    if (typeof content === 'string') {
      return (
        <Input
          multiline
          slots={{
            textarea: TextareaAutosize,
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
    if ((content as TodoContent).text !== undefined) {
      const todoContent = content as TodoContent;
      return <div>{todoContent.text} {todoContent.checked ? '✅' : '❌'}</div>;
    }
    if ((content as MediaContent).url !== undefined) {
      const mediaContent = content as MediaContent;
      return <img src={mediaContent.url} alt={mediaContent.altText} />;
    }
    if ((content as FileContent).fileName !== undefined) {
      const fileContent = content as FileContent;
      return <div>{fileContent.fileName} ({fileContent.fileSize} bytes)</div>;
    }
    if ((content as TableContent).rows !== undefined) {
      const tableContent = content as TableContent;
      return (
        <table>
          <tbody>
            {tableContent.rows.map((row: Node[][], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell: Node, cellIndex: number) => (
                  <td key={cellIndex}>
                    <TextEditor content={cell.content} styles={cell.styles} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if ((content as CalloutContent).text !== undefined) {
      const calloutContent = content as CalloutContent;
      return <div>{calloutContent.text} {calloutContent.icon && <img src={calloutContent.icon} alt="Icon" />}</div>;
    }
    if ((content as BookmarkContent).url !== undefined) {
      const bookmarkContent = content as BookmarkContent;
      return <a href={bookmarkContent.url}>{bookmarkContent.title || bookmarkContent.url}</a>;
    }
    if ((content as EquationContent).equation !== undefined) {
      const equationContent = content as EquationContent;
      return <div>{equationContent.equation}</div>;
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
