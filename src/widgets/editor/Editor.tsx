import React, { useState, useEffect, useCallback } from 'react';
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
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useSearchParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

import NodeContainer from './node/NodeContainer';
import { AppDispatch, RootState } from '../../store';
import {
  reorderNodes,
  loadNodesFromServer,
  saveNodesToServer,
} from '../../store/slices/nodeSlice';

const Editor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  // Local loading state
  const [loading, setLoading] = useState(true);
  const [newNodeId, setNewNodeId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const pageId = parseInt(searchParams.get('page') || '0', 10);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFocusNewNode = (id: string) => {
    setNewNodeId(id);
  };

  const handleDragEnd = useCallback(
    ({
      active,
      over,
    }: {
      active: { id: UniqueIdentifier };
      over: { id: UniqueIdentifier } | null;
    }) => {
      if (!over || active.id === over.id) return;

      const oldIndex = nodes.findIndex((node) => node.id === active.id);
      const newIndex = nodes.findIndex((node) => node.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      dispatch(reorderNodes({ oldIndex, newIndex }));
    },
    [nodes, dispatch]
  );

  // loading nodes from server
  useEffect(() => {
    (async () => {
      try {
        await dispatch(loadNodesFromServer(pageId));
      } finally {
        setLoading(false);
      }
    })();
  }, [pageId, dispatch]);

  // debounced saving
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(saveNodesToServer({ pageId, nodes }));
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [pageId, nodes, dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={nodes.map((node) => node.id)}
        strategy={verticalListSortingStrategy}
      >
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
