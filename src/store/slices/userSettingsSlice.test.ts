import { describe, it, expect, vi, beforeEach } from 'vitest';
import userSettingsReducer, {
    setTheme,
    setFontSize,
    setFontFamily,
    initializeUserSettings,
    allowedFontFamilies,
} from './userSettingsSlice';
import { saveSettingsToLocalStorage, loadSettingsFromLocalStorage } from '../../utils/userSettingsUtils';

// Mocking the utilities
vi.mock('../../utils/userSettingsUtils', () => ({
    saveSettingsToLocalStorage: vi.fn(),
    loadSettingsFromLocalStorage: vi.fn(() => null) // Mocking to return null for initial state
}));

const getDefaultState = () => ({
    theme: 'light',
    language: 'en',
    fontSize: 16,
    barColor: "#0751D8",
    backgroundColor: "#FFF",
    textColor: "#000",
    fontFamily: allowedFontFamilies[0],
});

describe('userSettingsSlice', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test
        localStorage.clear(); // Clear local storage before each test
    });

    it('should handle initial state', () => {
        expect(userSettingsReducer(undefined, { type: 'unknown' })).toEqual(getDefaultState());
    });


    it('should not allow invalid theme values', () => {
        const initialState = getDefaultState();
        const actual = userSettingsReducer(initialState, setTheme('invalid' as unknown as Theme));
        expect(actual.theme).toBe(initialState.theme);
        expect(saveSettingsToLocalStorage).not.toHaveBeenCalled();
    });

    it('should not allow invalid font sizes', () => {
        const initialState = getDefaultState();
        const actual = userSettingsReducer(initialState, setFontSize(-1));
        expect(actual.fontSize).toBe(initialState.fontSize);
        expect(saveSettingsToLocalStorage).not.toHaveBeenCalled();

        const actual2 = userSettingsReducer(initialState, setFontSize(25));
        expect(actual2.fontSize).toBe(initialState.fontSize);
        expect(saveSettingsToLocalStorage).not.toHaveBeenCalled();
    });

    it('should not allow invalid font family', () => {
        const initialState = getDefaultState();
        const actual = userSettingsReducer(initialState, setFontFamily('invalid-font-family'));
        expect(actual.fontFamily).toBe(initialState.fontFamily);
        expect(saveSettingsToLocalStorage).not.toHaveBeenCalled();
    });

    it('should initialize user settings with saved font family', () => {
        // Simulate loading from local storage
        const savedFontFamily = 'Arial, sans-serif';
        localStorage.setItem('app-font-family', savedFontFamily);
        vi.mocked(loadSettingsFromLocalStorage).mockReturnValueOnce({ fontFamily: savedFontFamily });

        const state = userSettingsReducer(undefined, initializeUserSettings());
        expect(state.fontFamily).toBe(savedFontFamily);
        expect(document.documentElement.style.getPropertyValue('--app-font-family')).toBe(savedFontFamily);
    });
});
