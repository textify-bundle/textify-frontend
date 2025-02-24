import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
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

interface PagesState {
    currentPage: number | null;
    loading: boolean;
    error: string | null;
}

const mockDispatch = it.fn();
it.mock('react-redux', async () => {
  const actual = await it.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

it.mock('../../store/slices/nodeSlice', () => ({
  default: (state: NodeState = { nodes: [], loading: false, error: null }) => state,
  reorderNodes: () => ({ type: 'nodes/reorderNodes' }),
  loadNodesFromServer: () => ({ type: 'nodes/loadNodesFromServer' }),
  saveNodesToServer: () => ({ type: 'nodes/saveNodesToServer' })
}));

it.mock('../../utils/client', () => ({
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

const mockStore = configureStore({
  reducer: {
    node: (state: NodeState = {
      nodes: [],
      loading: false,
      error: null
    }) => state,
    pages: (state: PagesState = {
      currentPage: null,
      loading: false,
      error: null
    }) => state
  }
});

describe('Editor Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Editor />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });

  it('renders nodes from store', async () => {
    const initialState = {
      nodes: {
        nodes: [
          { id: '1', type: 'text', content: 'Test Node 1', order: 0 },
          { id: '2', type: 'text', content: 'Test Node 2', order: 1 }
        ]
      }
    };

    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state
      },
      preloadedState: initialState
    });

    await it.act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Editor />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(document.body.textContent).toContain('Test Node 1');
    expect(document.body.textContent).toContain('Test Node 2');
  });

  it('handles node reordering', async () => {
    const initialState = {
      nodes: {
        nodes: [
          { id: '1', type: 'text', content: 'Test Node 1', order: 0 },
          { id: '2', type: 'text', content: 'Test Node 2', order: 1 }
        ]
      }
    };

    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state
      },
      preloadedState: initialState
    });

    await it.act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Editor />
          </BrowserRouter>
        </Provider>
      );
    });
    const firstNode = document.querySelector('[data-handler-id="1"]');
    const secondNode = document.querySelector('[data-handler-id="2"]');

    if (firstNode && secondNode) {
      await it.act(async () => {
        it.fireEvent.dragStart(firstNode);
        it.fireEvent.dragOver(secondNode);
        it.fireEvent.drop(secondNode);
      });

      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'nodes/reorderNodes'
      }));
    }
  });
});
