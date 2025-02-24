import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Export from './Export';

// Mock Material-UI components
vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }) => <button {...props}>{children}</button>
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
  export: {
    loading: false,
    error: null,
    format: 'markdown'
  }
};

describe('Export Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        export: (state = initialState.export) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <Export />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Экспортировать');
  });

  it('dispatches export action on button click', () => {
    const store = configureStore({
      reducer: {
        export: (state = initialState.export) => state
      },
      preloadedState: initialState
    });

    render(
      <Provider store={store}>
        <Export />
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const loadingState = {
      export: {
        ...initialState.export,
        loading: true
      }
    };

    const store = configureStore({
      reducer: {
        export: (state = loadingState.export) => state
      },
      preloadedState: loadingState
    });

    render(
      <Provider store={store}>
        <Export />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});