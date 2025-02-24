import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Export from './Export';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('Export component', () => {
    it('renders export button', () => {
        render(
            <ThemeProvider theme={theme}>
                <Export />
            </ThemeProvider>
        );
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});