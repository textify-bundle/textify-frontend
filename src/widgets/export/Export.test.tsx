import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Export from './Export';

const theme = createTheme();

describe('Export component', () => {
    it('renders export button', () => {
        render(
            <ThemeProvider theme={theme}>
                <Export />
            </ThemeProvider>
        );
        expect(screen.getByRole('button', { name: /экспорт/i })).toBeInTheDocument();
    });
});