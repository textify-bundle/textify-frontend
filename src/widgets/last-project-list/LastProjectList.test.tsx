
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

const mockStore = configureStore({
    reducer: {
        pages: (state = {
            projectData: [],
            loading: true,
            error: null
        }) => state
    }
});

describe('LastProjectList', () => {
    it('должен отображать сообщение при отсутствии проектов', () => {
        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );
        
        expect(screen.getByText('У вас нет недавних проектов')).toBeTruthy();
    });

    it('должен показывать индикатор загрузки', () => {
        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <LastProjectList />
                </Provider>
            </BrowserRouter>
        );
        
        expect(screen.getByText('Loading...')).toBeTruthy();
    });
});
