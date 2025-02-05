import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { Node } from '../../shared/types/editor';

interface BlockState {
  nodes: Node[];
}

const initialState: BlockState = {
  nodes: [
    { id: '1', type: 'text', content: 'Node 1', styles: { bold: true } },
    { id: '2', type: 'text', content: 'Node 2', styles: { italic: true } },
    { id: '3', type: 'text', content: 'Node 3', styles: { underline: true } },
  ],
};

const blockSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<Node>) => {
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

export const { addNode, updateNode, removeNode, reorderNodes } = blockSlice.actions;
export default blockSlice.reducer;
