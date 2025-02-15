import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNode,
  addNode,
  removeNode,
} from '../../../store/slices/nodeSlice';
import type { CustomNode, NodeType } from '../../../shared/types/editor/node';
import './NodeContainer.scss';
import TextEditor from './text-editor/TextEditor';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';
import type { SelectChangeEvent } from '@mui/material';
import type { RootState } from '../../../store/index';
import ImageEditor from './image-editor/ImageEditor';
import type { MediaContent } from '../../../shared/types/editor/node';

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
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: node.id });
  const { x, y, strategy, refs, update } = useFloating({
    placement: 'left',
    middleware: [offset(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLDivElement>(null);
  const textEditorRef = useRef<HTMLTextAreaElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleContentChange = (newContent: CustomNode['content']) => {
    const isEmptyWithSlash =
      typeof newContent === 'string' && newContent === '/';
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

  const handleAddNode = (currentNodeIndex?: string) => {
    const id = Date.now().toString();
    const newNode = {
      id,
      type: 'text' as NodeType,
      content: '',
      styles: {},
    };
    dispatch(addNode({ node: newNode, index: currentNodeIndex }));
    setTimeout(() => {
      document.getElementById(`node-${newNode.id}`)?.focus();
    }, 50);
  };

  const handleDeleteNode = () => {
    if (nodes.length > 1) {
      const currentIndex = nodes.findIndex((n) => n.id === node.id);
      const previousNodeId = nodes[currentIndex - 1]?.id;
      dispatch(removeNode(node.id));
      setTimeout(() => {
        if (previousNodeId) {
          const previousNodeElement = document.getElementById(
            `node-${previousNodeId}`,
          );
          if (previousNodeElement) {
            previousNodeElement.focus();
            const textarea = previousNodeElement.querySelector('textarea');
            if (textarea) {
              const value = textarea.value;
              textarea.setSelectionRange(value.length, value.length);
            }
          }
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (isNewNode && textEditorRef.current) {
      textEditorRef.current.focus();
    }
  }, [isNewNode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      update();
    }
  }, [isHovered, update]);

  useEffect(() => {
    if (showDropdown) {
      update();
    }
  }, [showDropdown, update]);

  const nodeTypes: NodeType[] = [
    'text',
    'heading',
    'todo',
    'quote',
    'code',
    'divider',
    'image',
    'video',
    'file',
    'table',
    'callout',
    'bookmark',
    'link',
    'equation',
    'none',
  ];

  const editorComponents: { [key: string]: JSX.Element | null } = {
    text: (
      <TextEditor
        inputId={`node-${node.id}`}
        ref={textEditorRef}
        content={node.content as string}
        styles={node.styles}
        onContentChange={handleContentChange}
        onEnterPress={() => {
          handleAddNode(node.id);
        }}
        nodeId={node.id}
        onDelete={handleDeleteNode}
      />
    ),
    image: (
      <ImageEditor content={node.content as MediaContent} nodeId={node.id} />
    ),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`node-container${isHovered ? ' node-container_hover' : ''}`}
    >
      <div ref={refs.setReference}></div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          style={{ position: strategy, top: (y ?? 0) + 15, left: x ?? 0 }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '6px',
              width: '185.06px',
              height: '208px',
              overflowY: 'scroll',
              background: '#FFFFFF',
              boxShadow: '0px 0px 24.2px rgba(0, 0, 0, 0.25)',
              borderRadius: '12px',
            }}
            className="node-type-selector"
          >
            {nodeTypes
              .filter((value) => value !== 'none')
              .map((type) => (
                <div
                  key={type}
                  className={`node-type-item ${selectedType === type ? 'selected' : ''}`}
                  onClick={() =>
                    handleTypeChange({
                      target: { value: type },
                    } as SelectChangeEvent<NodeType>)
                  }
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '6.59px 9.89px',
                    gap: '4.94px',
                    background: '#FFFFFF',
                    borderRadius: '3.3px',
                    flex: 'none',
                    order: 1,
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#f5f5f5')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#FFFFFF')
                  }
                >
                  <img src={`./node-types/${type}.png`} alt="" width={`30px`} />
                  <h4>{type}</h4>
                </div>
              ))}
          </div>
        </div>
      )}
      {isHovered && (
        <>
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
            <button
              onClick={() => {
                handleAddNode(node.id);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <img src="./icons/plus.svg" width="15px" alt="Add Node" />
            </button>
          </div>
          <div
            ref={deleteButtonRef}
            style={{
              position: 'fixed',
              top: `${(y ?? 0) - 11}px`,
              left: `${(x ?? 0) - 25}px`,
              zIndex: 1000,
              transition: 'transform 0.2s ease',
            }}
          >
            <button
              onClick={handleDeleteNode}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <img src="./icons/trash.svg" width="15px" alt="Delete Node" />
            </button>
          </div>
        </>
      )}
      <div
        ref={refs.setFloating}
        style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
      ></div>
      <div
        className={`node-container__editor${isHovered ? ' node-container__editor_hover' : ''}`}
      >
        {editorComponents[node.type] || null}
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
