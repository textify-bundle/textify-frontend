import React, { useState, useCallback, useRef, useEffect } from 'react';
import './Table.scss';
import { TableContent } from '../../../../shared/types/editor/node';

interface TableProps {
  content?: TableContent;
  onContentChange: (newContent: TableContent) => void;
}

const Table: React.FC<TableProps> = ({
  content = { rows: [[]] },
  onContentChange,
}) => {
  const initialCellData = content?.rows?.length
    ? content.rows.map((row) =>
        row.map((cell) => (cell?.content as string) || ''),
      )
    : [
        ['', ''],
        ['', ''],
      ];

  const [cellData, setCellData] = useState<string[][]>(initialCellData);

  const rows = cellData.length;
  const cols = rows > 0 ? cellData[0].length : 0;

  // References to keep track of the previous state
  const previousCellData = useRef<string[][]>(initialCellData);

  // Function to add a new row
  const addRow = () => {
    const newRow = Array(cols).fill('');
    setCellData((prev) => [...prev, newRow]);
  };

  // Function to add a new column
  const addColumn = () => {
    setCellData((prev) => prev.map((row) => [...row, '']));
    setTimeout(updateAddRowBtnWidth, 0);
  };

  // Function to remove a row
  const removeRow = (index: number) => {
    if (rows > 1) {
      setCellData((prev) => prev.filter((_, rowIndex) => rowIndex !== index));
    }
  };

  // Function to remove a column
  const removeColumn = (index: number) => {
    if (cols > 1) {
      setCellData((prev) =>
        prev.map((row) => row.filter((_, colIndex) => colIndex !== index)),
      );
      setTimeout(updateAddRowBtnWidth, 0);
    }
  };

  // Update the content of a specific cell
  const updateCellContent = useCallback(
    (rowIndex: number, colIndex: number, content: string) => {
      setCellData((prev) => {
        const newData = [...prev];
        newData[rowIndex] = [...newData[rowIndex]];
        newData[rowIndex][colIndex] = content;
        return newData;
      });
    },
    [],
  );

  // Update the width of the 'Add Row' button
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const addRowBtnRef = useRef<HTMLButtonElement>(null);

  const updateAddRowBtnWidth = () => {
    if (tableWrapperRef.current && addRowBtnRef.current) {
      addRowBtnRef.current.style.width = `${tableWrapperRef.current.offsetWidth}px`;
    }
  };

  // Set up the resize listener for the 'Add Row' button
  useEffect(() => {
    updateAddRowBtnWidth();
    window.addEventListener('resize', updateAddRowBtnWidth);
    return () => {
      window.removeEventListener('resize', updateAddRowBtnWidth);
    };
  }, []);

  // Update the parent component only if the content changes
  useEffect(() => {
    if (JSON.stringify(previousCellData.current) !== JSON.stringify(cellData)) {
      onContentChange({
        rows: cellData.map((row, rowIndex) =>
          row.map((content, colIndex) => ({
            id: `${rowIndex}-${colIndex}`,
            type: 'table', // Type should match the expected one in the parent component
            content,
          })),
        ),
      });
      previousCellData.current = cellData; // Update the previous state after change
    }
  }, [cellData, onContentChange]);

  return (
    <div className="table-container">
      <div className="table-wrapper" ref={tableWrapperRef}>
        <div className="column-controls">
          {Array.from({ length: cols }).map((_, index) => (
            <div key={`col-control-${index}`} className="column-control">
              <button
                onClick={() => removeColumn(index)}
                className="btn remove-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="table-content">
          {cellData.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="table-row">
              <button
                onClick={() => removeRow(rowIndex)}
                className="btn remove-btn"
              >
                ×
              </button>
              {row.map((cell, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="table-cell"
                >
                  <textarea
                    className="table-cell-textarea"
                    value={cell}
                    onChange={(e) =>
                      updateCellContent(rowIndex, colIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={addColumn} className="btn add-btn add-column-btn">
          +
        </button>
      </div>
      <button
        onClick={addRow}
        className="btn add-btn add-row-btn"
        ref={addRowBtnRef}
      >
        +
      </button>
    </div>
  );
};

export default Table;
