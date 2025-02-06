import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadSettingsFromLocalStorage, saveSettingsToLocalStorage } from '../../utils/userSettingsUtils';

export const allowedBackgroundColors: string[] = [
  '#ffffff', '#87ceeb', '#00bfff', '#0751d8', '#90ee90',
  '#008000', '#ffffe0', '#ffff00', '#ffa500', '#ff0000',
  '#ff69b4', '#800080', '#e6e6fa'
];

export const allowedBarColor: string[] = [
  '#ffffff', '#87ceeb', '#00bfff', '#0751d8', '#90ee90',
  '#008000', '#ffffe0', '#ffff00', '#ffa500', '#ff0000',
  '#ff69b4', '#800080', '#e6e6fa'
];

export const allowedTextColors: string[] = [
  '#000000', '#333333', '#666666', '#0000ff', '#008000',
  '#800080', '#ff0000', '#ffa500', '#800000', '#008080'
];

export const allowedFontFamilies: string[] = [
  'Arial, sans-serif',
  '"Times New Roman", serif',
  '"Courier New", monospace',
  'Georgia, serif',
  'Verdana, sans-serif',
  '"Trebuchet MS", sans-serif',
  '"Lucida Console", monospace',
  '"Comic Sans MS", cursive',
  'Impact, sans-serif',
  'Tahoma, sans-serif'
];

export interface UserSettingsState {
  name: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  BarColor: string;
  textColor: string;
  fontSize: '10px' | '12px' | '16px';
  fontFamily: string;
}

const initialState: UserSettingsState = {
  name: '',
  theme: 'light',
  BarColor: allowedBarColor[3],
  backgroundColor: allowedBarColor[0],
  textColor: allowedTextColors[0],
  fontSize: '12px',
  fontFamily: allowedFontFamilies[0],
};

const loadedSettings: Partial<UserSettingsState> | null = loadSettingsFromLocalStorage();
const initialStateFromStorage: UserSettingsState = loadedSettings
  ? { ...initialState, ...loadedSettings }
  : initialState;

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: initialStateFromStorage,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      saveSettingsToLocalStorage(state);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveSettingsToLocalStorage(state);
    },
    setBackgroundColor(state, action: PayloadAction<string>) {
      if (allowedBackgroundColors.includes(action.payload)) {
        state.backgroundColor = action.payload;
        saveSettingsToLocalStorage(state);
      }
    },
    setBarColor(state, action: PayloadAction<string>) {
      if (allowedBarColor.includes(action.payload)) {
        state.BarColor = action.payload;
        saveSettingsToLocalStorage(state);
      }
    },
    setTextColor(state, action: PayloadAction<string>) {
      if (allowedTextColors.includes(action.payload)) {
        state.textColor = action.payload;
        saveSettingsToLocalStorage(state);
      }
    },
    setFontSize(state, action: PayloadAction<'10px' | '12px' | '16px'>) {
      state.fontSize = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setFontFamily(state, action: PayloadAction<string>) {
      if (allowedFontFamilies.includes(action.payload)) {
        state.fontFamily = action.payload;
        saveSettingsToLocalStorage(state);
      }
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setBackgroundColor,
  setBarColor,
  setTextColor,
  setFontSize,
  setFontFamily
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;