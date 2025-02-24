import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../app/styles/theme';
import Export from './Export';

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