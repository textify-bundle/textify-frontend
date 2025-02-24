import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import RemoteProjectList from './RemoteProjectList';

// Mock the worker
vi.mock('../../workers/dataWorker', () => ({
  default: class MockWorker {
    postMessage() {}
    addEventListener() {}
  }
}));

// Mock supabase client
vi.mock('../../utils/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          data: [],
          error: null
        })
      })
    })
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
  remoteProjects: {
    projects: [],
    loading: false,
    error: null
  },
  pages: {
    projectData: [],
    loading: false,
    error: null,
    tree: null
  }
};

describe('RemoteProjectList Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        remoteProjects: (state = initialState.remoteProjects) => state,
        pages: (state = initialState.pages) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RemoteProjectList />
        </BrowserRouter>
      </Provider>
    );
  });

  it('displays error state', () => {
    const errorState = {
      ...initialState,
      pages: {
        ...initialState.pages,
        error: 'Failed to load projects'
      }
    };

    const store = configureStore({
      reducer: {
        remoteProjects: (state = errorState.remoteProjects) => state,
        pages: (state = errorState.pages) => state
      },
      preloadedState: errorState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RemoteProjectList />
        </BrowserRouter>
      </Provider>
    );

    // Используем регулярное выражение для поиска текста
    expect(screen.getByText(/Failed to load projects/)).toBeDefined();
  });
});
