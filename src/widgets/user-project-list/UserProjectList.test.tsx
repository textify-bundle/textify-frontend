import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import UserProjectList from './UserProjectList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' })
}));

describe('UserProjectList', () => {
    const mockStore = configureStore({
        reducer: {
            pages: (state = {
                projectData: [
                    { id: 1, name: 'Тестовый проект', isRemoved: false, dateOfChange: new Date().toISOString() }
                ],
                tree: [
                    { id: 1, items: [{ id: 10 }] }
                ],
                error: null
            }) => state
        }
    });

    it('должен вызывать onProjectsAvailable с правильным значением', () => {
        const onProjectsAvailable = vi.fn();
        const { container } = render(
            <Provider store={mockStore}>
                <UserProjectList onProjectsAvailable={onProjectsAvailable} />
            </Provider>
        );
        
        expect(onProjectsAvailable).toHaveBeenCalledWith(true);
        expect(container.querySelector('.MuiButton-root')).toBeTruthy();
    });

    it('должен показывать сообщение об ошибке', () => {
        const store = configureStore({
            reducer: {
                pages: (state = {
                    projectData: [],
                    tree: [],
                    error: 'Тестовая ошибка'
                }) => state
            }
        });

        render(
            <Provider store={store}>
                <UserProjectList />
            </Provider>
        );

        expect(screen.getByText('Error: Тестовая ошибка')).toBeTruthy();
    });
});
