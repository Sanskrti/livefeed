import { createSlice } from '@reduxjs/toolkit';
import {
  axiosClient,
  userListEndpoint,
  fetchAllowedActions,
  fetchAllowedPages
} from '../../../api/axiosClient';


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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserList: (state, action) => {
        
      state.userList = action.payload;
    }
  },
});


export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosClient.get(userListEndpoint);
    dispatch(setUserList(response.data));
    dispatch(setError(''));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export const loadAllowedPages = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const allowedPagesData = await fetchAllowedPages();
    dispatch(setAllowedPages(allowedPagesData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export const loadAllowedActions = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const allowedActionsData = await fetchAllowedActions();
    dispatch(setAllowedActions(allowedActionsData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  selectUser,
  clearSelectedUser,
  setAllowedPages,
  setAllowedActions,
  setLoading,
  setError,
  setUserList,
} = userSlice.actions;


export default userSlice.reducer;
