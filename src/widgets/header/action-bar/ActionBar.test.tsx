import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ActionBar from './ActionBar';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../../workers/dataWorker', () => ({
    default: class {
        constructor() {}
    }
}));

vi.mock('comlink', () => ({
    wrap: () => ({})
}));

vi.mock('../settings/settings/Settings', () => ({
    default: () => null
}));

vi.mock('../../export/Export', () => ({
    default: () => null
}));

vi.mock('../../overlay/ShareOverlay', () => ({
    default: () => null
}));

const theme = createTheme();

const mockUsers = ['User1', 'User2', 'User3', 'User4'];

const store = configureStore({
    reducer: {
        node: (state = { currentNode: null, loading: false }, action) => state,
        pages: (state = { loading: false }, action) => state,
        projects: (state = { loading: false }, action) => state,
        auth: (state = { isAuth: true }, action) => state,
    }
});

describe('ActionBar component', () => {
    it('renders with users', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <ActionBar users={mockUsers} />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(mockUsers[0])).toBeInTheDocument();
    });

    it('shows maximum 4 users', () => {
        const manyUsers = ['User1', 'User2', 'User3', 'User4', 'User5', 'User6'];
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <ActionBar users={manyUsers} />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeLessThanOrEqual(4);
    });

    it('calls onClick when user clicked', () => {
        const handleClick = vi.fn();
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <ActionBar users={mockUsers} onClick={handleClick} />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        const button = screen.getByText(mockUsers[0]);
        button.click();
        expect(handleClick).toHaveBeenCalled();
    });
});
