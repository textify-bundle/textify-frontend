import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import ActionBar from './ActionBar';

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
  }
};

describe('ActionBar Component', () => {
  it('renders without crashing', () => {
    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state
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
  });

  it('dispatches save action on save button click', () => {
    const store = configureStore({
      reducer: {
        nodes: (state = initialState.nodes) => state
      },
      preloadedState: initialState
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ActionBar />
        </BrowserRouter>
      </Provider>
    );

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
