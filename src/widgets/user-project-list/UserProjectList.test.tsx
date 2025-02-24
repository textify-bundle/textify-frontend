import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import UserProjectList from './UserProjectList';

vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' })
}));

const mockStore = configureStore({
    reducer: {
        pages: (state = {
            projectData: [
                { id: 1, name: 'Test project', isRemoved: false, dateOfChange: new Date().toISOString() }
            ],
            tree: [
                { id: 1, items: [{ id: 10 }] }
            ],
            error: null
        }) => state
    }
});

describe('UserProjectList', () => {
    it('should call onProjectsAvailable with correct value', () => {
        const onProjectsAvailable = vi.fn();
        
        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <UserProjectList onProjectsAvailable={onProjectsAvailable} />
                </Provider>
            </BrowserRouter>
        );
        
        expect(onProjectsAvailable).toHaveBeenCalledWith(true);
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('should display error message', () => {
        const errorStore = configureStore({
            reducer: {
                pages: (state = {
                    projectData: [],
                    tree: [],
                    error: 'Test error'
                }) => state
            }
        });

        render(
            <BrowserRouter>
                <Provider store={errorStore}>
                    <UserProjectList onProjectsAvailable={() => {}} />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Error: Test error')).toBeTruthy();
    });
});
