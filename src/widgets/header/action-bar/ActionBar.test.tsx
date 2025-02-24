import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionBar from './ActionBar';

// Mock Supabase client
vi.mock('../../../utils/client', () => ({
    supabase: {
        auth: {
            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            signOut: () => Promise.resolve({ error: null })
        }
    }
}));

const mockStore = configureStore({
    reducer: {
        auth: (state = { user: null, loading: false, error: null }) => state,
        node: (state = { nodes: [], loading: false, error: null }) => state,
        users: (state = { users: ['User1', 'User2'], loading: false, error: null }) => state
    }
});

describe('ActionBar', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Provider store={mockStore}>
                <ActionBar />
            </Provider>
        );
        expect(container).toBeTruthy();
    });
});
