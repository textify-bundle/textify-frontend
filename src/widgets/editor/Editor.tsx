import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import NodeContainer from './node/NodeContainer';
import { Node } from '../../shared/types/editor';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const Editor = () => {
    const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'text', content: 'Node 1', styles: { bold: true } },
    { id: '2', type: 'text', content: 'Node 2', styles: { italic: true } },
    { id: '3', type: 'text', content: 'Node 3', styles: { underline: true } },
    ]);

    const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
        setNodes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
        });
    }
    };
    return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}  modifiers={[restrictToVerticalAxis]} >
        <SortableContext items={nodes.map((node) => node.id)} strategy={verticalListSortingStrategy} >
        {nodes.map((node) => (
            <NodeContainer key={node.id} node={node}  />
        ))}
        </SortableContext>
    </DndContext>
    );
};

export default Editor;