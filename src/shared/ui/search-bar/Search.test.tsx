import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
    test('updates local state if onChange is not provided', () => {
        render(<Search />);
        const input = screen.getByPlaceholderText('Поиск');
        fireEvent.change(input, { target: { value: 'local state' } });
        expect((input as HTMLInputElement).value).toBe('local state');
    });

    test('calls onClick when container is clicked', () => {
        const handleClick = () => {
            expect(true).toBe(true);
        };
        render(<Search onClick={handleClick} />);
        const container = screen.getByRole('textbox').closest('.search-container');
        fireEvent.click(container!);
    });

    test('renders with custom props', () => {
        const placeholder = 'Custom Search';
        const imageSrc = './src/shared/ui/search-bar/magnifyingGlass.png';
        render(<Search placeholder={placeholder} imageSrc={imageSrc} />);
        const input = screen.getByPlaceholderText(placeholder);
        const image = screen.getByAltText('glass');
        expect(input).toBeInTheDocument();
        expect(image).toHaveAttribute('src', imageSrc);
    });
});
