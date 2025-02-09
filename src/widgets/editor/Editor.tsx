import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import NodeContainer from './node/NodeContainer';
import { RootState } from '../../store/index';
import { reorderNodes } from '../../store/slices/nodeSlice';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const Editor: React.FC = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const dispatch = useDispatch();
  const [newNodeId, setNewNodeId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = ({ active, over }: { active: { id: UniqueIdentifier }; over: { id: UniqueIdentifier } | null }) => {
    if (over && active.id !== over.id) {
      const oldIndex = nodes.findIndex((node) => node.id === active.id);
      const newIndex = nodes.findIndex((node) => node.id === over.id);
      dispatch(reorderNodes({ oldIndex, newIndex }));
    }
  };

  const handleFocusNewNode = (id: string) => {
    setNewNodeId(id); 
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
          <NodeContainer
            key={node.id}
            node={node}
            isNewNode={node.id === newNodeId} 
            onFocus={() => handleFocusNewNode(node.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Editor;