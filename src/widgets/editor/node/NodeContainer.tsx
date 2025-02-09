import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { updateNode, addNode } from '../../../store/slices/nodeSlice';
import { CustomNode, NodeType } from '../../../shared/types/editor/node';
import './NodeContainer.scss';
import TextEditor from './text-editor/TextEditor';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import { AppBar, Toolbar, Typography, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface NodeContainerProps {
  node: CustomNode;
  isNewNode?: boolean;
  onFocus?: () => void;
}

const NodeContainer: React.FC<NodeContainerProps> = ({ node, isNewNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState<NodeType>(node.type);
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id: node.id });
  const { x, y, strategy, refs, update } = useFloating({
    placement: 'left',
    middleware: [offset(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const textEditorRef = useRef<HTMLTextAreaElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleContentChange = (newContent: CustomNode['content']) => {
    const isEmptyWithSlash = typeof newContent === 'string' && newContent === '/';
    if (isEmptyWithSlash) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    dispatch(updateNode({ ...node, content: newContent }));
  };

  const handleTypeChange = (event: SelectChangeEvent<NodeType>) => {
    const newType = event.target.value as NodeType;
    setSelectedType(newType);
    dispatch(updateNode({ ...node, type: newType, content: '', styles: {} }));
    setShowDropdown(false);
  };

  const handleAddNode = () => {
    const id = Date.now().toString();
    const newNode = {
      id,
      type: 'text' as NodeType,
      content: '',
      styles: {},
    };
    dispatch(addNode(newNode));
    setTimeout(() => {
      document.getElementById(`node-${newNode.id}`)?.focus();
    }, 50);
  };

  useEffect(() => {
    if (isNewNode && textEditorRef.current) {
      textEditorRef.current.focus();
    }
  }, [isNewNode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (isHovered) {
      update();
    }
  }, [transform, isHovered, update]);

  useEffect(() => {
    if (showDropdown) {
      update();
    }
  }, [showDropdown, update]);

  const nodeTypes: NodeType[] = [
    'text', 'heading', 'todo', 'quote', 'code', 'divider',
    'image', 'video', 'file', 'table', 'callout', 'bookmark',
    'link', 'equation', 'none'
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`node-container${isHovered ? ' node-container_hover' : ''}`}
    >
      <div ref={refs.setReference}>{/* Reference element for floating UI */}</div>
      {showDropdown && (
        <div ref={dropdownRef} style={{ position: strategy, top: (y ?? 0) + 15, left: x ?? 0 }}>
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="subtitle1" color="inherit">
                Тип блока:
              </Typography>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                variant="outlined"
                size="small"
                style={{ marginLeft: 8 }}
              >
                {nodeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Toolbar>
          </AppBar>
        </div>
      )}
      {isHovered && (
        <div 
          ref={addButtonRef}
          style={{
            position: 'fixed',
            top: `${(y ?? 0) - 11}px`,
            left: `${x ?? 0}px`,
            zIndex: 1000,
            transition: 'transform 0.2s ease',
          }}
        >
          <button onClick={handleAddNode} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src="./icons/plus.svg" width="15px" alt="Add Node" />
          </button>
        </div>
      )}
      <div ref={refs.setFloating} style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}>
        {/* Floating element for dropdown */}
      </div>
      <div className={`node-container__editor${isHovered ? ' node-container__editor_hover' : ''}`}>
        <TextEditor
          inputId={`node-${node.id}`}
          ref={textEditorRef}
          content={node.content}
          styles={node.styles}
          onContentChange={handleContentChange}
          onEnterPress={handleAddNode}
        />
      </div>
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        className="node-container__handle"
      >
        <img src="./icons/draggable.svg" alt="Drag Handle" width="15px" />
      </div>
    </div>
  );
};

export default NodeContainer;