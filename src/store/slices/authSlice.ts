import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../shared/api/auth/AuthService"; 
import { User, Session } from "@supabase/supabase-js";
interface AuthState {
  user: User | null;
  session: Session | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  lastRefreshTime: number | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
  session: localStorage.getItem("session") ? JSON.parse(localStorage.getItem("session")!) : null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  lastRefreshTime: null,
  error: null,
};

// Логика для входа
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const { data, error } = await AuthService.login(email, password);
    if (error) return rejectWithValue(error.message);

    const { user, session } = data;
    return {
      user,
      session,
      accessToken: session?.access_token,
      refreshToken: session?.refresh_token,
    };
  }
);

// Логика для регистрации
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const { data, error } = await AuthService.registration(email, password);
    if (error) return rejectWithValue(error.message);

    const { user, session } = data;
    return {
      user,
      session,
      accessToken: session?.access_token,
      refreshToken: session?.refresh_token,
    };
  }
);

// Логика для выхода
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const { error } = await AuthService.logout();
    if (error) return rejectWithValue(error.message);

    return {}; // Успешный выход
  }
);

// Восстановление сессии
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { dispatch, rejectWithValue }) => {
    const { data, error } = await AuthService.getSession();
    if (error || !data.session) {
      dispatch(logout());
      return {};
    }

    const { session } = data;
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at <= now) {
      dispatch(logout());
      return rejectWithValue("Session expired");
    }

    const user = session.user;
    return {
      user,
      session,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
);

// Логика для валидации токена
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { session } = (getState() as { auth: AuthState }).auth;

    if (!session || !session.expires_at) {
      dispatch(logout());
      return rejectWithValue("Session expired");
    }

    const now = Math.floor(Date.now() / 1000); 
    if (session.expires_at <= now) {
      dispatch(logout());
      return rejectWithValue("Session expired");
    }
  }
);

// Логика для обновления токенов
const REFRESH_INTERVAL = 60000; 
export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const { lastRefreshTime } = state.auth;

    const now = Date.now();
    if (lastRefreshTime && now - lastRefreshTime < REFRESH_INTERVAL) {
      return rejectWithValue("Запрос на обновление слишком частый");
    }

    const { data, error } = await AuthService.refreshSession();
    if (error || !data.session) {
      return rejectWithValue("Не удалось обновить токены");
    }

    const { session } = data;
    return {
      user: session.user,
      session,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.lastRefreshTime = null;
      localStorage.removeItem("user");
      localStorage.removeItem("session");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.lastRefreshTime = Date.now();

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("session", JSON.stringify(action.payload.session));
        localStorage.setItem("accessToken", action.payload.accessToken || "");
        localStorage.setItem("refreshToken", action.payload.refreshToken || "");
        state.error = null;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(validateToken.rejected, (state) => {
        state.user = null;
        state.session = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.clear();
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("session", JSON.stringify(action.payload.session));
        localStorage.setItem("accessToken", action.payload.accessToken || "");
        localStorage.setItem("refreshToken", action.payload.refreshToken || "");
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.accessToken = action.payload.accessToken || null;
        state.refreshToken = action.payload.refreshToken ?? null;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("session", JSON.stringify(action.payload.session));
        localStorage.setItem("accessToken", action.payload.accessToken || "");
        localStorage.setItem("refreshToken", action.payload.refreshToken || "");
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.session = action.payload.session || null;
        state.accessToken = action.payload.accessToken || null;
        state.refreshToken = action.payload.refreshToken || null;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("session", JSON.stringify(action.payload.session));
        localStorage.setItem("accessToken", action.payload.accessToken || "");
        localStorage.setItem("refreshToken", action.payload.refreshToken || "");
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.lastRefreshTime = null;
        localStorage.removeItem("user");
        localStorage.removeItem("session");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout: logoutAction } = authSlice.actions;
export default authSlice.reducer;
