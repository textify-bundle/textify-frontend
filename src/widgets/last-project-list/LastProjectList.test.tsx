import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

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
  projects: {
    lastProjects: [],
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

describe('LastProjectList Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        projects: (state = initialState.projects) => state,
        pages: (state = initialState.pages) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LastProjectList />
        </BrowserRouter>
      </Provider>
    );
  });

  it('displays loading state', () => {
    const loadingState = {
      ...initialState,
      pages: {
        ...initialState.pages,
        loading: true
      }
    };

    const store = configureStore({
      reducer: {
        projects: (state = loadingState.projects) => state,
        pages: (state = loadingState.pages) => state
      },
      preloadedState: loadingState
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LastProjectList />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Loading...')).toBeDefined();
  });
});
