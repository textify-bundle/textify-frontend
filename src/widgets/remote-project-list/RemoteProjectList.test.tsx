import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RemoteProjectList from './RemoteProjectList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' }),
    restoreProject: (id: number) => ({ type: 'pages/restoreProject', payload: id })
}));

describe('RemoteProjectList', () => {
    const mockStore = configureStore({
        reducer: {
            pages: (state = {
                projectData: [],
                loading: false,
                error: null
            }) => state
        }
    });

    it('должен отображать сообщение при отсутствии проектов', () => {
        const { getByText } = render(
            <Provider store={mockStore}>
                <RemoteProjectList />
            </Provider>
        );
        
        expect(getByText('У вас нет удалённых проектов!')).toBeTruthy();
    });

    it('должен показывать сообщение об ошибке', () => {
        const store = configureStore({
            reducer: {
                pages: () => ({
                    projectData: [],
                    loading: false,
                    error: 'Тестовая ошибка'
                })
            }
        });

        render(
            <Provider store={store}>
                <RemoteProjectList />
            </Provider>
        );

        expect(screen.getByText('Error: Тестовая ошибка')).toBeTruthy();
    });
});
