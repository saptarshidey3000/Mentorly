import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    isAuthenticated: !!initialToken,
    user: null, // optional: you can store user info here
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
