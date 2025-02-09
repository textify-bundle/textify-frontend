import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Node } from '../../../shared/types/editor';
import './NodeContainer.scss';
import TextEditor from './text-editor/TextEditor';
import ImageEditor from './image-editor/ImageEditor';
import { MediaContent } from '../../../shared/types/editor/node';

const NodeContainer = ({ node }: { node: Node }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const editorComponents: { [key: string]: JSX.Element | null } = {
    text: <TextEditor content={node.content as string} />,
    image: <ImageEditor content={node.content as MediaContent} nodeId={node.id} />,
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
