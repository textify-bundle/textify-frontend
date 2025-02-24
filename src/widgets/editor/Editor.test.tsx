import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Editor from './Editor';

interface NodeState {
    nodes: Array<{
        id: number;
        content: string;
    }>;
    loading: boolean;
    error: string | null;
}

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

vi.mock('../../store/slices/nodeSlice', () => ({
  default: (state: NodeState = { nodes: [], loading: false, error: null }) => state,
  reorderNodes: () => ({ type: 'nodes/reorderNodes' }),
  loadNodesFromServer: () => ({ type: 'nodes/loadNodesFromServer' }),
  saveNodesToServer: () => ({ type: 'nodes/saveNodesToServer' })
}));

vi.mock('../../utils/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({
            data: { pageId: 1, canWrite: true },
            error: null
          })
        })
      })
    })
  }
}));

vi.mock('../../workers/dataWorker', () => ({
  default: class MockWorker {
    postMessage() {}
    addEventListener() {}
  }
}));

const initialState = {
  nodes: {
    nodes: [],
    loading: false,
    error: null
  },
  pages: {
    currentPage: null,
    loading: false,
    error: null
  }
};

describe('Editor Component', () => {
  it('renders without crashing', async () => {
    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state,
        pages: (state = initialState.pages) => state
      },
      preloadedState: initialState
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Editor />
          </BrowserRouter>
        </Provider>
      );
    });
  });

  it('dispatches loadNodesFromServer on mount', async () => {
    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state,
        pages: (state = initialState.pages) => state
      },
      preloadedState: initialState
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Editor />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
