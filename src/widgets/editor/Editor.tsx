import { useSelector, useDispatch } from 'react-redux';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import NodeContainer from './node/NodeContainer';
import { RootState } from '../../store/index';
import { reorderNodes } from '../../store/slices/blockSlice';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import AddNodeButton from './node/AddNodeButton';

const Editor = () => {
  const nodes = useSelector((state: RootState) => state.blocks.nodes);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = nodes.findIndex((node) => node.id === active.id);
      const newIndex = nodes.findIndex((node) => node.id === over.id);
      dispatch(reorderNodes({ oldIndex, newIndex }));
    }
  };

  return (
    <div>
      <AddNodeButton />
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
    </div>
  );
};

export default Editor;
