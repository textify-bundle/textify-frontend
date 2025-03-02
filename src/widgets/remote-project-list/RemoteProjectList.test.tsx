import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import RemoteProjectList from './RemoteProjectList';

// Mock the restoreProject function as a spy
vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' }),
    restoreProject: vi.fn() // Create a mock function for restoreProject
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

    it('should display loading message when loading', () => {
        const loadingStore = configureStore({
            reducer: {
                pages: (state = { projectData: [], loading: true, error: null }) => state
            }
        });

        render(
            <BrowserRouter>
                <Provider store={loadingStore}>
                    <RemoteProjectList />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Loading...')).toBeTruthy();
    });

    it('should render removed projects', () => {
        const projects = [
            { id: 1, name: 'Project 1', isRemoved: true, dateOfChange: new Date() },
            { id: 2, name: 'Project 2', isRemoved: true, dateOfChange: new Date() }
        ];
        
        const projectStore = configureStore({
            reducer: {
                pages: (state = { projectData: projects, loading: false, error: null }) => state
            }
        });

        render(
            <BrowserRouter>
                <Provider store={projectStore}>
                    <RemoteProjectList />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Project 1')).toBeTruthy();
        expect(screen.getByText('Project 2')).toBeTruthy();
    });
});
