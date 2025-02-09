import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent, 
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import NodeContainer from './node/NodeContainer';
import { Node } from '../../shared/types/editor';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const Editor = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'text', content: 'Node 1', styles: { bold: true } },
    { id: '2', type: 'text', content: 'Node 2', styles: { italic: true } },
    { id: '3', type: 'text', content: 'Node 3', styles: { underline: true } },
    { id: '5', type: 'image', content: { url: '', altText: '' } },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setNodes((currentNodes) => {
        const oldIndex = currentNodes.findIndex((node) => node.id === active.id);
        const newIndex = currentNodes.findIndex((node) => node.id === over.id);
        return arrayMove(currentNodes, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={nodes.map((node) => node.id)} strategy={verticalListSortingStrategy}>
        {nodes.map((node) => (
          <NodeContainer node={node} key={node.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Editor;
