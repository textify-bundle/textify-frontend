import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { CustomNode } from '../../shared/types/editor/node';
import { supabase } from '../../utils/client';

interface nodeState {
  nodes: CustomNode[];
}

export const initialState: nodeState = {
  nodes: [
    { id: '1', type: 'text', content: '', styles: { bold: true } },
  ],
};

const getCurrentIndex = (nodes: CustomNode[], id: string) =>
  nodes.findIndex((node) => node.id === id);

export const loadNodesFromServer = createAsyncThunk(
  'nodes/loadNodesFromServer',
  async (pageId: number) => {
    try {
      const { data, error } = await supabase.from('notes').select('markup_json').eq('id', pageId).single();
      if (error) return initialState.nodes;
      if (!data || !data.markup_json) return initialState.nodes;

      return JSON.parse(data.markup_json);
    }
    catch (error) { 
      console.error('Failed to load or parse notes from server', error);
      return initialState.nodes;
    }
  }
);

export const saveNodesToServer = createAsyncThunk(
  'nodes/saveNodesToServer',
  async ({ pageId, nodes }: { pageId: number, nodes: CustomNode[] }) => {
    const markup_json = JSON.stringify(nodes);
    const { error } = await supabase
      .from('notes')
      .update({ markup_json })
      .eq('id', pageId);
    if (error) throw error;
  }
);

const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    clearNodes: (state) => {
      state.nodes = [];
    },
    addNode: (state, action: PayloadAction<{node: CustomNode, index?: string}>) => {
      const { node, index } = action.payload;
      if(index){
        const currentIndex = getCurrentIndex(state.nodes, index);
        if (currentIndex !== -1) {
          state.nodes.splice(currentIndex + 1, 0, node); 
        }
      } else {
        state.nodes.push(node); 
      }
    },
    updateNode: (state, action: PayloadAction<CustomNode>) => {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id,
      );
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    reorderNodes: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { oldIndex, newIndex } = action.payload;
      state.nodes = arrayMove(state.nodes, oldIndex, newIndex);
    },
    syncNodesToStorage: (state) => {
      localStorage.setItem('nodes', JSON.stringify(state.nodes));
    },
    loadNodesFromStorage: (state) => {
      const storedNodes = localStorage.getItem('nodes');
      if (storedNodes) {
        state.nodes = JSON.parse(storedNodes);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadNodesFromServer.fulfilled, (state, action) => {
      if (action.payload) {
        state.nodes = action.payload;
      }
    });
  }
});

export const { 
  addNode, 
  updateNode, 
  removeNode, 
  reorderNodes,  
  syncNodesToStorage, 
  loadNodesFromStorage,
  clearNodes
} = nodeSlice.actions;

export default nodeSlice.reducer;
