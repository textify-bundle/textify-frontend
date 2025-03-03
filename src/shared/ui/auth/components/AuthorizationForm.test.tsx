import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthorizationForm from './AuthorizationForm';

describe('AuthorizationForm component', () => {
    const mockHandleAuth = vi.fn();
    const initialFormData = { email: '', password: '' };

    beforeEach(() => {
        mockHandleAuth.mockClear();
    });

    it('renders login form', () => {
        render(<AuthorizationForm 
            formData={initialFormData} 
            setFormData={vi.fn()} 
            isSignUp={false} 
            isLoading={false} 
            handleAuth={mockHandleAuth} 
            error={null} 
        />);
        
        expect(screen.getByLabelText(/Почта/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
    });

    it('handles form submission', () => {
        render(<AuthorizationForm 
            formData={{ email: 'test@example.com', password: 'password123' }} 
            setFormData={vi.fn()} 
            isSignUp={false} 
            isLoading={false} 
            handleAuth={mockHandleAuth} 
            error={null} 
        />);
        
        const submitButton = screen.getByRole('button', { name: /Войти/i });
        fireEvent.click(submitButton);

        expect(mockHandleAuth).toHaveBeenCalled();
    });

    it('shows isLoading state', () => {
        render(<AuthorizationForm 
            formData={initialFormData} 
            setFormData={vi.fn()} 
            isSignUp={false} 
            isLoading={true} 
            handleAuth={mockHandleAuth} 
            error={null} 
        />);
        
        expect(screen.queryByRole('button', { name: /Войти/i })).not.toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Check for CircularProgress
    });

    it('shows error message', () => {
        const errorMessage = 'Неверные учетные данные'; // Example error message in Russian
        render(<AuthorizationForm 
            formData={initialFormData} 
            setFormData={vi.fn()} 
            isSignUp={false} 
            isLoading={false} 
            handleAuth={mockHandleAuth} 
            error={errorMessage} 
        />);
        
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
});
