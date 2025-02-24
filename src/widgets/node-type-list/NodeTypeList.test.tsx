import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NodeTypeList from './NodeTypeList';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const mockBlocks = [
    {
        title: 'Test Block',
        description: 'Test Description',
        imageSrc: 'test.jpg'
    }
];

describe('NodeTypeList component', () => {
    it('renders block title and description', () => {
        render(
            <ThemeProvider theme={theme}>
                <NodeTypeList blocks={mockBlocks} />
            </ThemeProvider>
        );
        expect(screen.getByText('Test Block')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders empty list', () => {
        render(
            <ThemeProvider theme={theme}>
                <NodeTypeList blocks={[]} />
            </ThemeProvider>
        );
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    it('handles click on block', () => {
        const handleClick = vi.fn();
        render(
            <ThemeProvider theme={theme}>
                <NodeTypeList blocks={mockBlocks} onClick={handleClick} />
            </ThemeProvider>
        );
        
        const listItem = screen.getByText('Test Block');
        fireEvent.click(listItem);
        expect(handleClick).toHaveBeenCalledWith(0);
    });
});