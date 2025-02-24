import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

// Mock Worker
vi.mock('../../workers/dataWorker', () => ({
    default: class MockWorker {
        postMessage() {}
        addEventListener() {}
    }
}));

// Mock wrap function
vi.mock('comlink', () => ({
    wrap: () => ({
        loadNodesFromServer: vi.fn(),
        saveNodesToServer: vi.fn(),
        reorderNodes: vi.fn()
    })
}));

const mockStore = configureStore({
    reducer: {
        pages: (state = {
            projectData: [],
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
