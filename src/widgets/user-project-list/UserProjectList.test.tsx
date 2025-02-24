import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import UserProjectList from './UserProjectList';

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
  userProjects: {
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

describe('UserProjectList Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        userProjects: (state = initialState.userProjects) => state,
        pages: (state = initialState.pages) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserProjectList />
        </BrowserRouter>
      </Provider>
    );
  });

  it('displays empty state message', () => {
    const store = configureStore({
      reducer: {
        userProjects: (state = initialState.userProjects) => state,
        pages: (state = initialState.pages) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserProjectList />
        </BrowserRouter>
      </Provider>
    );

    // Проверяем наличие пустого div для проектов
    const projectsContainer = screen.getByTestId('user-projects-container');
    expect(projectsContainer.children.length).toBe(0);
  });
});
