import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthorizationHeader from './AuthorizationHeader';

describe('AuthorizationHeader component', () => {
    it('renders login header when isLogin is false', () => {
        render(
            <AuthorizationHeader isSignUp={false} />
        );

        expect(screen.getByText('Вход в личный кабинет')).toBeInTheDocument();
    });

    it('renders registration header when isLogin is true', () => {
        render(
            <AuthorizationHeader isSignUp={true} />
        );

        expect(screen.getByText('Регистрация')).toBeInTheDocument();
    });
});
