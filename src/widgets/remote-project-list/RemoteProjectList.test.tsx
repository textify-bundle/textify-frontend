import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import RemoteProjectList from './RemoteProjectList';

vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' }),
    restoreProject: (id: number) => ({ type: 'pages/restoreProject', payload: id })
}));

const mockStore = configureStore({
    reducer: {
        pages: (state = { projectData: [], loading: false, error: null }) => state
    }
});

describe('RemoteProjectList', () => {
    it('should display message when no projects available', () => {
        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <RemoteProjectList />
                </Provider>
            </BrowserRouter>
        );
        
        expect(screen.getByText('У вас нет удалённых проектов!')).toBeTruthy();
    });

    it('should display error message', () => {
        const errorStore = configureStore({
            reducer: {
                pages: (state = { projectData: [], loading: false, error: 'Test error' }) => state
            }
        });

        render(
            <BrowserRouter>
                <Provider store={errorStore}>
                    <RemoteProjectList />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Error: Test error')).toBeTruthy();
    });
});
