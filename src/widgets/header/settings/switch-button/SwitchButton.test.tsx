import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SwitchButton from './SwitchButton'; // Adjust the import path as necessary

describe('SwitchButton', () => {
    it('should render with default state', () => {
        render(<SwitchButton />);
        
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement).toBeInTheDocument();
        expect(switchElement).not.toBeChecked(); // Default unchecked state
    });

    it('should toggle the switch when clicked', () => {
        render(<SwitchButton />);
        
        const switchElement = screen.getByRole('checkbox');
        fireEvent.click(switchElement);
        
        expect(switchElement).toBeChecked(); // After click, it should be checked
    });

    it('should call onToggle with the correct value', () => {
        const onToggleMock = vi.fn();
        render(<SwitchButton onToggle={onToggleMock} />);
        
        const switchElement = screen.getByRole('checkbox');
        fireEvent.click(switchElement);
        
        expect(onToggleMock).toHaveBeenCalledWith(true); // First toggle should call with true
        
        fireEvent.click(switchElement);
        
        expect(onToggleMock).toHaveBeenCalledWith(false); // Second toggle should call with false
    });

    it('should update state when checkedProp changes', () => {
        const { rerender } = render(<SwitchButton checkedProp={false} />);
        
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement).not.toBeChecked(); // Initially unchecked
        
        rerender(<SwitchButton checkedProp={true} />);
        
        expect(switchElement).toBeChecked(); // After rerender, it should be checked
    });

    it('should add active class to switch block when checked', () => {
        const { container } = render(<SwitchButton />);
        
        const switchBlock = container.querySelector('.switch-block');
        expect(switchBlock).not.toHaveClass('active'); // Initially not active
        
        const switchElement = screen.getByRole('checkbox');
        fireEvent.click(switchElement);
        
        expect(switchBlock).toHaveClass('active'); // Should be active after toggle
    });

    it('should remove active class from switch block when unchecked', async () => {
        const { container } = render(<SwitchButton />);
        
        const switchBlock = container.querySelector('.switch-block');
        expect(switchBlock).not.toHaveClass('active'); // Initially not active
        
        const switchElement = screen.getByRole('checkbox');
        fireEvent.click(switchElement);
        
        expect(switchBlock).toHaveClass('active'); // Should be active after toggle
        
        fireEvent.click(switchElement);
        
        // Use waitFor to ensure we wait for any state updates
        await waitFor(() => {
            expect(switchBlock).not.toHaveClass('active'); // Should not be active after toggle
        });
    });
});
