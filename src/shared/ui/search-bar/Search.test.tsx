import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import Search from './Search';

describe('Search Component', () => {
    it('renders with default props', () => {
        render(<Search />);

        const inputElement = screen.getByPlaceholderText('Поиск');
        expect(inputElement).toBeInTheDocument();

        const imageElement = screen.getByAltText('glass');
        expect(imageElement).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const onChangeMock = vi.fn();
        render(<Search onChange={onChangeMock} />);

        const inputElement = screen.getByPlaceholderText('Поиск');
        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(onChangeMock).toHaveBeenCalledWith('test');
    });

    it('calls onClick when container is clicked', () => {
        const onClickMock = vi.fn();
        render(<Search onClick={onClickMock} />);

        const containerElement = screen.getByRole('textbox').closest('.search-container');
        if (containerElement) {
            fireEvent.click(containerElement);
        }

        expect(onClickMock).toHaveBeenCalled();
    });

    it('logs input value when Enter key is pressed', () => {
        const logSpy = vi.spyOn(console, 'log');
        render(<Search />);

        const inputElement = screen.getByPlaceholderText('Поиск');
        fireEvent.keyPress(inputElement, { key: 'Enter', currentTarget: { value: 'test' } });

        expect(logSpy).toHaveBeenCalledWith('test');
        logSpy.mockRestore();
    });

    it('renders with custom props', () => {
        render(<Search placeholder="Custom Placeholder" value="Initial Value" className="custom-class" />);

        const inputElement = screen.getByPlaceholderText('Custom Placeholder');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('Initial Value');

        const containerElement = screen.getByRole('textbox').closest('.search-container');
        expect(containerElement).toHaveClass('custom-class');
    });
});
