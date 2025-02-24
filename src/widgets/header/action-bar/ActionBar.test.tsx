import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionBar from './ActionBar';

const mockStore = configureStore({
    reducer: {
        users: (state = {
            users: ['User1', 'User2', 'User3', 'User4', 'User5'],
            loading: false,
            error: null
        }) => state
    }
});

describe('ActionBar component', () => {
    it('shows maximum 4 users', () => {
        render(
            <Provider store={mockStore}>
                <ActionBar />
            </Provider>
        );
        
        const userButtons = screen.getAllByRole('button');
        expect(userButtons).toHaveLength(4);
    });
});
