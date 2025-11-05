import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/api';

export interface User {
  id: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    id: number;
    roleName: string;
    roleCode: string;
  };
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  };
}

// Async thunks using real API
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    return await authApi.login(credentials);
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials) => {
    return await authApi.register(credentials);
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    return await authApi.getCurrentUser();
  }
);

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.data.user;
            state.token = action.payload.data.accessToken;
            state.isAuthenticated = true;
            state.error = null;
          })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.data.user;
            state.token = action.payload.data.accessToken;
            state.isAuthenticated = true;
            state.error = null;
          })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
        state.isAuthenticated = false;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { setLoading, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;
