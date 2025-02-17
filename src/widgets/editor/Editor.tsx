import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
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
import type { AppDispatch, RootState } from '../../store';
import {
  reorderNodes,
  loadNodesFromServer,
  saveNodesToServer,
} from '../../store/slices/nodeSlice';
import { supabase } from '../../utils/client';

const Editor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  const [loading, setLoading] = useState(true);
  const [newNodeId, setNewNodeId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const initialPageId = Number.parseInt(searchParams.get('page') || '0', 10);
  const token = searchParams.get('token');
  const [canWrite, setCanWrite] = useState<boolean>(true);
  const [pageId, setPageId] = useState<number>(initialPageId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
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
    [nodes, dispatch],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        if (token) {

          const { data, error } = await supabase
            .from('notes_tokens')
            .select('pageId, canWrite')
            .eq('token', token)
            .single();

          if (error) throw error;
          if (!data) throw new Error('Token not found');

          setPageId(data.pageId);
          setCanWrite(data.canWrite);
          await dispatch(loadNodesFromServer(data.pageId));
        } else {
          setCanWrite(true);
          setPageId(initialPageId);
          await dispatch(loadNodesFromServer(initialPageId));
        }
      } catch (error) {
        console.error('Failed to load nodes from server', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialPageId, dispatch, token]);



  useEffect(() => {
    const interval = setInterval(async () => {
      if (!loading) {
        try {
          const { payload: updatedNodes } = await dispatch(loadNodesFromServer(pageId)).unwrap();
  
          // Обновляем только если есть новые изменения
          dispatch({
            type: 'nodes/mergeUpdates',
            payload: updatedNodes,
          });
        } catch (error) {
          console.error('Ошибка при обновлении данных:', error);
        }
      }
    }, 3000);
  
    return () => clearInterval(interval);
  }, [pageId, dispatch, loading]);

  // debounced saving
  useEffect(() => {
    if (!canWrite) return;

    const debounceTimer = setTimeout(() => {
      dispatch(saveNodesToServer({ pageId, nodes }));
    }, 10);
    return () => clearTimeout(debounceTimer);
  }, [pageId, nodes, dispatch, canWrite]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div
      style={{
        pointerEvents: canWrite ? 'auto' : 'none',
        opacity: canWrite ? 1 : 0.7,
      }}
    >
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
    </div>
  );
};

export default Editor;
