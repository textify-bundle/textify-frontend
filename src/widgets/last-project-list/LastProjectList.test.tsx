import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' }),
    createNewProjectAndPage: vi.fn()
}));

const mockStore = (initialState) => configureStore({
    reducer: {
        pages: (state = initialState) => state
    }
});

describe('LastProjectList', () => {
    beforeAll(() => {
        window.alert = vi.fn(); // Mock window.alert
    });

    it('should display loading message when loading', () => {
        const loadingStore = mockStore({
            projectData: [],
            loading: true,
            error: null,
            tree: [] // Add a tree to avoid undefined errors
        });

        render(
            <BrowserRouter>
                <Provider store={loadingStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Loading...')).toBeTruthy();
    });

    it('should display error message', () => {
        const errorStore = mockStore({
            projectData: [],
            loading: false,
            error: 'Test error',
            tree: [] // Add a tree to avoid undefined errors
        });

        render(
            <BrowserRouter>
                <Provider store={errorStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Error: Test error')).toBeTruthy();
    });

    it('should display active projects', () => {
        const projects = [
            { id: 1, name: 'Project 1', isRemoved: false, dateOfChange: new Date() },
            { id: 2, name: 'Project 2', isRemoved: false, dateOfChange: new Date() }
        ];

        const projectStore = mockStore({
            projectData: projects,
            loading: false,
            error: null,
            tree: [] // Add a tree to avoid undefined errors
        });

        render(
            <BrowserRouter>
                <Provider store={projectStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Project 1')).toBeTruthy();
        expect(screen.getByText('Project 2')).toBeTruthy();
    });

    it('should open dialog when "Новый проект" is clicked', () => {
        const projects = [
            { id: 1, name: 'Project 1', isRemoved: false, dateOfChange: new Date() }
        ];

        const projectStore = mockStore({
            projectData: projects,
            loading: false,
            error: null,
            tree: [] // Add a tree to avoid undefined errors
        });

        render(
            <BrowserRouter>
                <Provider store={projectStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Новый проект'));
        expect(screen.getByText('Создание нового проекта')).toBeTruthy();
    });

    it('should show an alert if project name is empty when creating a new project', async () => {
        const projects = [
            { id: 1, name: 'Project 1', isRemoved: false, dateOfChange: new Date() }
        ];

        const projectStore = mockStore({
            projectData: projects,
            loading: false,
            error: null,
            tree: [] // Add a tree to avoid undefined errors
        });

        render(
            <BrowserRouter>
                <Provider store={projectStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Новый проект'));
        fireEvent.click(screen.getByText('Создать')); // Click without entering a name

        // Check if the alert was called for empty project name
        expect(window.alert).toHaveBeenCalledWith('Пожалуйста, введите имя проекта');
    });
});

