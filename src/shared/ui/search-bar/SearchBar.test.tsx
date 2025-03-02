import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NewSearch from './SearchBar';

describe('NewSearch component', () => {
    const mockOnChange = vi.fn();
    const mockOnClick = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
        mockOnClick.mockClear();
    });

    it('renders search input', () => {
        render(<NewSearch onChange={mockOnChange} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('calls onChange when input changes', () => {
        render(<NewSearch onChange={mockOnChange} />);
        const input = screen.getByRole('textbox');
        
        fireEvent.change(input, { target: { value: 'test query' } });
        
        expect(mockOnChange).toHaveBeenCalledWith('test query');
    });

    it('renders with initial value', () => {
        const initialValue = 'initial';
        render(<NewSearch onChange={mockOnChange} value={initialValue} />);
        
        expect(screen.getByRole('textbox')).toHaveValue(initialValue);
    });

    it('calls onClick when the container is clicked', () => {
        render(<NewSearch onClick={mockOnClick} />);
        const searchContainer = screen.getByRole('textbox').closest('div'); // Get the parent Box element

        fireEvent.click(searchContainer);
        expect(mockOnClick).toHaveBeenCalled();
    });
});
