import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LastProjectList from './LastProjectList';

// Определяем глобальный Worker
global.Worker = class {
    onmessage: ((this: Worker, ev: MessageEvent) => any) | null = null;
    postMessage() {}
    addEventListener() {}
    removeEventListener() {}
    terminate() {}
} as any;

// Мокаем DataWorker
vi.mock('../../workers/dataWorker', () => ({
    default: class MockWorker {
        postMessage() {}
        addEventListener() {}
    }
}));

// Мокаем wrap из comlink
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
