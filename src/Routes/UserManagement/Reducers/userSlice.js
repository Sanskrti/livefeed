import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  allowedPages: [],
  error: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const users = [
        { username: 'sans', password: 'sans123', allowedPages: ['admin-panel', 'dashboard', 'live-feed'] },
        { username: 'user', password: 'user123', allowedPages: ['dashboard', 'live-feed'] },
      ];
      const foundUser = users.find(user => user.username === username && user.password === password);
      if (foundUser) {
        state.isAuthenticated = true;
        state.user = foundUser.username;
        state.allowedPages = foundUser.allowedPages;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.allowedPages = [];
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.allowedPages = [];
      state.error = null;
    },
    selectUser: (state, action) => {
      state.user = action.payload;
    },
    clearSelectedUser: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, selectUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
