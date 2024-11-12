import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import settingsReducer from './slices/userSettingsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  

export default store;
