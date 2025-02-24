import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Export from './Export';

const theme = createTheme();

describe('Export component', () => {
    it('renders export button', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Export />
            </ThemeProvider>
        );
        
        const button = container.querySelector('.MuiButton-root');
        expect(button).toBeTruthy();
    });
});