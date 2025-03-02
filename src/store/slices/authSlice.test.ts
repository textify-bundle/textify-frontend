import { describe, it, expect, beforeEach } from 'vitest';
import authReducer, {
    setUser ,
    clearUser ,
    setSession,
    setTokens,
    setError,
} from './authSlice';

vi.mock('../../shared/api/authorization/AuthorizationService');

const initialState = {
    user: null,
    session: null,
    accessToken: null,
    refreshToken: null,
    lastRefreshTime: null,
    error: null,
  };

describe('authSlice', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setUser ', () => {
        const user = { id: 1, email: 'test@test.com' };
        const actual = authReducer(initialState, setUser (user));
        expect(actual.user).toEqual(user);
        expect(actual.error).toBeNull();
    });

    it('should handle clearUser ', () => {
        const state = {
            ...initialState,
            user: { id: 1, email: 'test@test.com' },
            session: 'test-session',
            accessToken: 'test-access-token',
            refreshToken: 'test-refresh-token',
        };
        const actual = authReducer(state, clearUser ());
        expect(actual).toEqual(initialState);
    });

    it('should handle setSession', () => {
        const session = 'test-session';
        const actual = authReducer(initialState, setSession(session));
        expect(actual.session).toBe(session);
    });

    it('should handle setTokens', () => {
        const tokens = {
            accessToken: 'test-access-token',
            refreshToken: 'test-refresh-token',
        };
        const actual = authReducer(initialState, setTokens(tokens));
        expect(actual.accessToken).toBe(tokens.accessToken);
        expect(actual.refreshToken).toBe(tokens.refreshToken);
    });

    it('should handle setError', () => {
        const error = 'Test error';
        const actual = authReducer(initialState, setError(error));
        expect(actual.error).toBe(error);
    });

    it('should clear error when setting user', () => {
        const state = {
            ...initialState,
            error: 'Previous error',
        };
        const user = { id: 1, email: 'test@test.com' };
        const actual = authReducer(state, setUser (user));
        expect(actual.error).toBeNull();
    });
});
