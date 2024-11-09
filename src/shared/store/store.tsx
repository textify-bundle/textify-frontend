import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Тип для dispatch

export default store;
