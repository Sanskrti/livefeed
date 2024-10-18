import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../../api/axiosClient';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosClient.get('/api/users');
  return response.data;
});

export const fetchAllowedPages = createAsyncThunk('users/fetchAllowedPages', async () => {
  const response = await axiosClient.get('/api/allowed-pages');
  return response.data;
});

export const fetchAllowedActions = createAsyncThunk('users/fetchAllowedActions', async () => {
  const response = await axiosClient.get('/api/allowed-actions');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    selectedUser: null,
    allowedPages: [],
    allowedActions: [],
    loading: false,
    error: '',
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setAllowedPages: (state, action) => {
      state.allowedPages = action.payload;
    },
    setAllowedActions: (state, action) => {
      state.allowedActions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllowedPages.fulfilled, (state, action) => {
        state.allowedPages = action.payload;
      })
      .addCase(fetchAllowedActions.fulfilled, (state, action) => {
        state.allowedActions = action.payload;
      });
  },
});

export const {
  selectUser,
  clearSelectedUser,
  setAllowedPages,
  setAllowedActions,
} = userSlice.actions;

export default userSlice.reducer;
