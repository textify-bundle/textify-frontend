import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import type { CustomNode } from '../../shared/types/editor/node';
import { wrap, type Remote } from 'comlink';
import DataWorker from '../../workers/dataWorker?worker';
import type { WorkerApi } from '../../workers/dataWorker';

const worker: Remote<WorkerApi> = wrap(new DataWorker());

interface nodeState {
  nodes: CustomNode[];
}

export const initialState: nodeState = {
  nodes: [{ id: '1', type: 'text', content: '', styles: { bold: true } }],
};

export const loadNodesFromServer = createAsyncThunk(
  'nodes/loadNodesFromServer',
  async (pageId: number) => {
    try {
      const nodes = await worker.loadNodesFromServer(pageId);
      return nodes.length > 0 ? nodes : initialState.nodes;
    } catch (error) {
      console.error('Failed to load nodes from server', error);
      return initialState.nodes;
    }
  },
);

export const saveNodesToServer = createAsyncThunk(
  'nodes/saveNodesToServer',
  async ({ pageId, nodes }: { pageId: number; nodes: CustomNode[] }) => {
    try {
      await worker.saveNodesToServer({ pageId, nodes });
    } catch (error) {
      console.error('Failed to save nodes to server', error);
      throw error;
    }
  },
);

const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    clearNodes: (state) => {
      state.nodes = [];
    },
    addNode: (
      state,
      action: PayloadAction<{ node: CustomNode; index?: string }>,
    ) => {
      const { node, index } = action.payload;
      if (index) {
        const currentIndex = state.nodes.findIndex((n) => n.id === index);
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
      state.nodes = action.payload;
    });
  },
});

export const {
  addNode,
  updateNode,
  removeNode,
  reorderNodes,
  syncNodesToStorage,
  loadNodesFromStorage,
  clearNodes,
} = nodeSlice.actions;

export default nodeSlice.reducer;
