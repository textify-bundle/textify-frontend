import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../api/auth/client';


interface User {
  id: string;
  email: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
  user: User | null;
}

interface UserState {
  user: User | null;
  session: Session | null;
  error: string | null;
}

// Начальное состояние
const initialState: UserState = {
  user: null,
  session: null,
  error: null,
};

// Асинхронные экшены для регистрации, логина и логаута
export const signUp = createAsyncThunk(
  'user/signUp',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw new Error(error.message);
      return { user: data.user, session: data.session };
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw new Error(error.message);
      return { user: data.user, session: data.session };

    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return null; // null для очистки данных о пользователе и сессии
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Слайс Redux с редьюсерами и асинхронными экшенами
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Обработчики для асинхронных экшенов
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.session = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Экспорты экшенов и редьюсера
export const { setUser, setSession, setError } = userSlice.actions;
export default userSlice.reducer;
