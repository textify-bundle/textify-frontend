import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

// Мок для Worker API
const mockWorkerApi = {
    loadNodesFromServer: vi.fn(),
    saveNodesToServer: vi.fn(),
    reorderNodes: vi.fn()
};

// Мокаем nodeSlice
vi.mock('../../store/slices/nodeSlice', () => {
    return {
        default: (state = { nodes: [], loading: false, error: null }) => state,
        loadNodesFromServer: () => ({ type: 'nodes/loadNodesFromServer' }),
        saveNodesToServer: () => ({ type: 'nodes/saveNodesToServer' }),
        reorderNodes: () => ({ type: 'nodes/reorderNodes' })
    };
});

// Мокаем DataWorker
vi.mock('../../workers/dataWorker?worker', () => {
    return {
        default: class MockWorker {
            postMessage() {}
            addEventListener() {}
        }
    };
});

// Мокаем comlink
vi.mock('comlink', () => ({
    wrap: () => mockWorkerApi
}));

const mockStore = configureStore({
    reducer: {
        pages: (state = {
            projectData: [],
            loading: false,
            error: null
        }) => state,
        nodes: (state = {
            nodes: [],
            loading: false,
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
});
