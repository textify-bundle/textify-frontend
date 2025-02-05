import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pagesReducer from './slices/pagesSlice';
import settingsReducer from './slices/userSettingsSlice';
import blocksReducer from './slices/blockSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: pagesReducer,
    settings: settingsReducer,
    blocks: blocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
