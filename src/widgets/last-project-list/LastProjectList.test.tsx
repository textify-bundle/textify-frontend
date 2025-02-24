import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LastProjectList from './LastProjectList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const store = configureStore({
    reducer: {
        pages: (state = {
            projectData: [
                { id: 1, name: 'Project 1' },
                { id: 2, name: 'Project 2' }
            ],
            loading: false,
            error: null
        }, action) => state
    }
});

describe('LastProjectList component', () => {
    it('shows loading state', () => {
        const loadingStore = configureStore({
            reducer: {
                pages: (state = { projectData: [], loading: true, error: null }, action) => state
            }
        });

        render(
            <Provider store={loadingStore}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <LastProjectList />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows projects when loaded', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <LastProjectList />
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText('Project 1')).toBeInTheDocument();
        expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
});
