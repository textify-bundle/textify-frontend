import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionBar from './ActionBar';
import { BrowserRouter } from 'react-router-dom';

// Мокаем компоненты, использующие роутинг
vi.mock('../../overlay/ShareOverlay', () => ({
    default: () => <div data-testid="mock-share-overlay">Share Overlay</div>
}));

vi.mock('../settings/settings/Settings', () => ({
    default: () => <div data-testid="mock-settings">Settings</div>
}));

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
        const users = ['User1', 'User2', 'User3'];
        const onClick = vi.fn();
        
        const { container } = render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <ActionBar users={users} onClick={onClick} />
                </Provider>
            </BrowserRouter>
        );
        expect(container).toBeTruthy();
    });
});
