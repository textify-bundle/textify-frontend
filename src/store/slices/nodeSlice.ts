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

const getCurrentIndex = (nodes: CustomNode[], id: string) => nodes.findIndex((node) => node.id === id);

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
      const { id, content, type, styles } = action.payload;
      const node = state.nodes.find(node => node.id === id);
      if (node) {
        node.content = content ?? node.content;
        node.type = type ?? node.type;
        node.styles = styles ?? node.styles;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
    },
    reorderNodes: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
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
});

export const { addNode, updateNode, removeNode, reorderNodes,  syncNodesToStorage, loadNodesFromStorage} = nodeSlice.actions;
export default nodeSlice.reducer;
