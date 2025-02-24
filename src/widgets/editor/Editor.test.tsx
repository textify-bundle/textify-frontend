import { describe, expect, test, vi } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Editor from './Editor';

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

vi.mock('../../store/slices/nodeSlice', () => ({
  default: (state = { nodes: [] }, action: any) => state,
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

describe('Editor Component', () => {
  test('renders without crashing', async () => {
    const store = configureStore({
      reducer: {
        nodes: (state = { nodes: [] }) => state
      }
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

    expect(document.body).toBeInTheDocument();
  });

  test('renders nodes from store', async () => {
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

    await act(async () => {
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

  test('handles node reordering', async () => {
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

    await act(async () => {
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
      await act(async () => {
        fireEvent.dragStart(firstNode);
        fireEvent.dragOver(secondNode);
        fireEvent.drop(secondNode);
      });

      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'nodes/reorderNodes'
      }));
    }
  });
});
