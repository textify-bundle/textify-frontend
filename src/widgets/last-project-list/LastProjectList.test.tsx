import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

// Мок для Worker
vi.mock('../../workers/dataWorker?worker', () => ({
    default: class MockWorker {
        postMessage() {}
        addEventListener() {}
    }
}));

// Мок для comlink
vi.mock('comlink', () => ({
    wrap: () => ({
        loadNodesFromServer: vi.fn(),
        saveNodesToServer: vi.fn(),
        reorderNodes: vi.fn()
    })
}));

// Мок для nodeSlice
vi.mock('../../store/slices/nodeSlice', () => ({
    __esModule: true,
    default: (state = { nodes: [], loading: false, error: null }) => state
}));

// Мок для pagesSlice
vi.mock('../../store/slices/pagesSlice', () => ({
    fetchTreeData: () => ({ type: 'pages/fetchTreeData' }),
    getCardDataForCards: () => ({ type: 'pages/getCardDataForCards' })
}));

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
