import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import RemoteProjectList from './RemoteProjectList';

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
  }
};

describe('RemoteProjectList Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        remoteProjects: (state = initialState.remoteProjects) => state
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
      remoteProjects: {
        ...initialState.remoteProjects,
        error: 'Failed to load projects'
      }
    };

    const store = configureStore({
      reducer: {
        remoteProjects: (state = errorState.remoteProjects) => state
      },
      preloadedState: errorState
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RemoteProjectList />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Failed to load projects')).toBeDefined();
  });
});
