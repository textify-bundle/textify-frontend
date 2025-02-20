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

export interface UserSettingsState {
  backgroundColor: string;
  barColor: string;
  textColor: string;
  fontSize: '10px' | '12px' | '16px';
  fontFamily: string;
}

const initialState: UserSettingsState = {
  barColor: "#0751D8",
  backgroundColor: "#FFF",
  textColor: "#000",
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
    setFontSize(state, action: PayloadAction<'10px' | '12px' | '16px'>) {
      state.fontSize = action.payload;
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
  setBackgroundColor,
  setBarColor,
  setTextColor,
  setFontSize,
  setFontFamily,
  initializeUserSettings
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;