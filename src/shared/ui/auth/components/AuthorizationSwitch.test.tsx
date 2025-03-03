import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import AuthorizationSwitch from './AuthorizationSwitch';

const theme = createTheme();

describe('AuthorizationSwitch component', () => {
    it('renders login switch when isLogin is false', () => {
        const handleSwitch = vi.fn();
        render(
            <ThemeProvider theme={theme}>
                <AuthorizationSwitch 
                    isSignUp={false} 
                    toggleMode={handleSwitch} 
                />
            </ThemeProvider>
        );

        expect(screen.getByText('Еще нет аккаунта?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();

        const switchButton = screen.getByRole('button', { name: 'Зарегистрироваться' });
        fireEvent.click(switchButton);
        expect(handleSwitch).toHaveBeenCalled();
    });

    it('renders registration switch when isLogin is true', () => {
        const handleSwitch = vi.fn();
        render(
            <ThemeProvider theme={theme}>
                <AuthorizationSwitch 
                    isSignUp={true} 
                    toggleMode={handleSwitch} 
                />
            </ThemeProvider>
        );

        expect(screen.getByText('Уже есть аккаунт?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();

        const switchButton = screen.getByRole('button', { name: 'Войти' });
        fireEvent.click(switchButton);
        expect(handleSwitch).toHaveBeenCalled();
    });
});
