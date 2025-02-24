import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pagesReducer from './slices/pagesSlice';
import settingsReducer from './slices/userSettingsSlice';
import nodeReducer from './slices/nodeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: pagesReducer,
    settings: settingsReducer,
    nodes: nodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'nodes/loadNodesFromServer/fulfilled',
          'nodes/saveNodesToServer/fulfilled',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
