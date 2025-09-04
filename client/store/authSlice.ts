import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  user?: any;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== 'undefined' && localStorage.getItem('auth_signed_in') === 'true',
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') || undefined : undefined,
  user: typeof window !== 'undefined' ? (() => {
    try { const u = localStorage.getItem('auth_user'); return u ? JSON.parse(u) : undefined; } catch { return undefined; }
  })() : undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ token: string; user: any } | undefined>) {
      state.isAuthenticated = true;
      if (action?.payload) {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
      try {
        localStorage.setItem('auth_signed_in', 'true');
        if (action?.payload?.token) localStorage.setItem('auth_token', action.payload.token);
        if (action?.payload?.user) localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      } catch {}
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      try {
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      } catch {}
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.token = undefined;
      state.user = undefined;
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {}
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      try {
        if (action.payload) localStorage.setItem('auth_signed_in', 'true');
        else localStorage.removeItem('auth_signed_in');
      } catch {}
    },
  },
});

export const { signIn, signOut, setAuthenticated, setUser } = authSlice.actions;
export default authSlice.reducer;


