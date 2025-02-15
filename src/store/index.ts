import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pagesReducer from './slices/pagesSlice';
import userSettingsReducer from './slices/userSettingsSlice';
import nodeReducer from './slices/nodeSlice';
import openAISettingsReducer from './slices/openAISettingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: pagesReducer,
    userSettings: userSettingsReducer,
    openAISettings: openAISettingsReducer,
    nodes: nodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
