import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { CustomNode } from '../../shared/types/editor/node';

interface nodeState {
  nodes: CustomNode[];
}

const initialState: nodeState = {
  nodes: [
    { id: '1', type: 'text', content: 'Node 1', styles: { bold: true } },
    { id: '2', type: 'text', content: 'Node 2', styles: { italic: true } },
    { id: '3', type: 'text', content: 'Node 3', styles: { underline: true } },
  ],
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<CustomNode>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<CustomNode>) => {
      const index = state.nodes.findIndex(node => node.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
    },
    reorderNodes: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload;
      state.nodes = arrayMove(state.nodes, oldIndex, newIndex);
    },
  },
});

export const { addNode, updateNode, removeNode, reorderNodes } = nodeSlice.actions;
export default nodeSlice.reducer;
