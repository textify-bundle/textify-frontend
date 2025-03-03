import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ActionBar from './ActionBar';

const mockStore = configureStore([]);

describe('ActionBar Component', () => {
  const mockUsers = ['Alice', 'Bob', 'Charlie', 'David'];
  const mockOnClick = vi.fn();
  let store;

  beforeEach(() => {
    store = mockStore({
      settings: {
        backgroundColor: '#ffffff', 
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionBar users={mockUsers} onClick={mockOnClick} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('calls onClick function when a user button is clicked', () => {
    const userButtons = screen.getAllByRole('button', { class: /user-button/i });
    fireEvent.click(userButtons[0]); // Simulate click on the first button
    expect(mockOnClick).toHaveBeenCalledWith(0); // Verify that onClick is called with the correct index
  });
});
