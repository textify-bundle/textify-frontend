import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadSettingsFromLocalStorage, saveSettingsToLocalStorage } from '../../utils/userSettingsUtils';

interface UserSettingsState {
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const initialState: UserSettingsState = {
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
  fontSize: 'medium',
};

const loadedSettings = loadSettingsFromLocalStorage();
const initialStateFromStorage: UserSettingsState = loadedSettings || initialState;

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: initialStateFromStorage,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      saveSettingsToLocalStorage(state);
    },
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
      saveSettingsToLocalStorage(state);
    },
    setFontSize(state, action: PayloadAction<'small' | 'medium' | 'large'>) {
      state.fontSize = action.payload;
      saveSettingsToLocalStorage(state);
    },
  },
});

export const { setTheme, setLanguage, toggleNotifications, setFontSize } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
