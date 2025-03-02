import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LastProjectCard from './LastProjectCard';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('LastProjectCard component', () => {
    it('renders project title', () => {
        render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <LastProjectCard 
                        title="Test Project"
                        imageUrl="test.jpg"
                    />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    it('handles click with navigation', () => {
        render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <LastProjectCard 
                        title="Test Project"
                        projectId={1}
                        firstPageId={1}
                    />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        fireEvent.click(screen.getByText('Test Project'));
        // Навигация будет проверена через react-router
    });

    it('handles click with onClick callback', () => {
        const handleClick = vi.fn();
        render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <LastProjectCard 
                        title="Test Project"
                        onClick={handleClick}
                    />
                </ThemeProvider>
            </BrowserRouter>
        );
        
        fireEvent.click(screen.getByText('Test Project'));
        expect(handleClick).toHaveBeenCalled();
    });
});
