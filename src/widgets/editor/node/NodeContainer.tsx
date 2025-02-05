import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { updateNode } from '../../../store/slices/blockSlice';
import { Node } from '../../../shared/types/editor';
import './NodeContainer.scss';
import TextEditor from './text-editor/TextEditor';

interface NodeContainerProps {
  node: Node;
}

const NodeContainer: React.FC<NodeContainerProps> = ({ node }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleContentChange = (newContent: Node['content']) => {
    dispatch(updateNode({ ...node, content: newContent }));
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
      {isHovered && (!node.type || node.type === 'none') && (
        <>
          <img src="./icons/plus.svg" width="15px" className="node-container__icon" />
          <div className="node-container__line"></div>
        </>
      )}
      <div className={`node-container__editor${isHovered ? ' node-container__editor_hover' : ''}`}>
        <TextEditor content={node.content} styles={node.styles} onContentChange={handleContentChange} />
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
