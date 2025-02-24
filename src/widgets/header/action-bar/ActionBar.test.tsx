import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import ActionBar from './ActionBar';

// Mock supabase client
vi.mock('../../../utils/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          data: { id: 1, name: 'Test User' },
          error: null
        })
      })
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: { id: '1' } }, error: null })
    }
  }
}));

// Mock actions
vi.mock('../../../shared/config/actions', () => ({
  actions: {
    save: { id: 'save', label: 'Save' },
    export: { id: 'export', label: 'Export' },
    share: { id: 'share', label: 'Share' }
  }
}));

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

const initialState = {
  nodes: {
    nodes: [],
    loading: false,
    error: null
  },
  auth: {
    user: null,
    loading: false,
    error: null
  }
};

describe('ActionBar Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state,
        auth: (state = initialState.auth) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ActionBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('toolbar')).toBeDefined();
  });

  it('dispatches save action on save button click', () => {
    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state,
        auth: (state = initialState.auth) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ActionBar />
        </BrowserRouter>
      </Provider>
    );

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
