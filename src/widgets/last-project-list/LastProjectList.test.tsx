import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LastProjectList from './LastProjectList';

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
    it('renders without crashing', () => {
        const { container } = render(
            <Provider store={mockStore}>
                <LastProjectList />
            </Provider>
        );
        expect(container).toBeTruthy();
    });
});
