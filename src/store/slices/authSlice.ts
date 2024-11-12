import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';
import { AuthService } from '../../shared/api/auth/AuthService';

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

interface SupabaseError extends Error {
  statusCode?: number;
  code?: string;
  status?: number;
}

const initialState: UserState = {
  user: null,
  session: null,
  error: null,
};

export const signUp = createAsyncThunk(
  'user/signUp',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await AuthService.registration(credentials.email, credentials.password);
      if (error) throw new Error(error.message);
      return { user: data.user, session: data.session };
    } catch (error) {
      const authError = error as SupabaseError;
      if (authError.message) {
        return rejectWithValue(authError.message); 
      }
      return rejectWithValue('An unexpected error occurred!');
    }
  }
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await AuthService.login(credentials.email, credentials.password);
      if (error) throw new Error(error.message);
      return { user: data.user, session: data.session };
    } catch (error: any) {
      return rejectWithValue(error.message || 'An unexpected error occurred');
    }
  }
);

export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
  try {
    const { error } = await AuthService.logout();
    if (error) throw new Error(error.message);
    return null;  
  } catch (error: any) {
    return rejectWithValue(error.message || 'Logout failed');
  }
});


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
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user as WritableDraft<User | null>;
        state.session = action.payload.session as WritableDraft<Session> | null;
      })
      .addCase(signUp.rejected, (state, action) => {

        state.error = typeof action.payload === 'string' ? action.payload : 'Sign up failed';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user as WritableDraft<User | null>;
        state.session = action.payload.session as WritableDraft<Session> | null;
      })
      .addCase(signIn.rejected, (state, action) => {

        state.error = typeof action.payload === 'string' ? action.payload : 'Sign in failed';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.session = null;
      })
      .addCase(logOut.rejected, (state, action) => {

        state.error = typeof action.payload === 'string' ? action.payload : 'Logout failed';
      });
  },
});

export const { setUser, setSession, setError } = userSlice.actions;
export default userSlice.reducer;
