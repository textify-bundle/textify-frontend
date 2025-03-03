import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadSettingsFromLocalStorage, saveSettingsToLocalStorage } from '../../utils/userSettingsUtils';

export const allowedFontFamilies: string[] = [
  'Arial, sans-serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Georgia, serif',
  'Verdana, sans-serif',
  'Trebuchet MS, sans-serif',
  'Lucida Console, monospace',
  'Comic Sans MS, cursive',
  'Impact, sans-serif',
  'Tahoma, sans-serif',
  'Varela Round, sans-serif', 
  'Open Sans, sans-serif', 
  'Roboto, sans-serif'
];

interface UserSettingsState {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
  fontSize: number;
  backgroundColor: string;
  barColor: string;
  textColor: string;
  fontFamily: string;
}

const initialState: UserSettingsState = {
  theme: 'light',
  language: 'en',
  fontSize: 16,
  barColor: "#0751D8",
  backgroundColor: "#FFF",
  textColor: "#000",
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
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      if (action.payload === 'light' || action.payload === 'dark') {
        state.theme = action.payload;
        saveSettingsToLocalStorage(state);
      }
    },
    setLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.language = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      if (action.payload >= 12 && action.payload <= 24) {
        state.fontSize = action.payload;
        saveSettingsToLocalStorage(state);
      }
    },
    setBackgroundColor(state, action: PayloadAction<string>) {
      state.backgroundColor = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setBarColor(state, action: PayloadAction<string>) {
      state.barColor = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setTextColor(state, action: PayloadAction<string>) {
      state.textColor = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      if (allowedFontFamilies.includes(action.payload)) {
        state.fontFamily = action.payload;
        
        if (typeof window !== 'undefined') {
          document.documentElement.style.setProperty(
            '--app-font-family', 
            action.payload
          );

          document.body.style.fontFamily = action.payload;
          
          localStorage.setItem('app-font-family', action.payload);
        }
        
        saveSettingsToLocalStorage(state);
      }
    },
    resetSettings: (state) => {
      state.theme = initialState.theme;
      state.language = initialState.language;
      state.fontSize = initialState.fontSize;
      state.backgroundColor = initialState.backgroundColor;
      state.barColor = initialState.barColor;
      state.textColor = initialState.textColor;
      state.fontFamily = initialState.fontFamily;
      saveSettingsToLocalStorage(state);
    },
    initializeUserSettings: (state) => {
      const savedFont = localStorage.getItem('app-font-family');
      if (savedFont && allowedFontFamilies.includes(savedFont)) {
        state.fontFamily = savedFont;
        
        if (typeof window !== 'undefined') {
          document.documentElement.style.setProperty(
            '--app-font-family', 
            savedFont
          );
        }
      }
    }
  },
});

export const {
  setTheme,
  setLanguage,
  setFontSize,
  setBackgroundColor,
  setBarColor,
  setTextColor,
  setFontFamily,
  resetSettings,
  initializeUserSettings
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;