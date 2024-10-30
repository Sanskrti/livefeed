import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Reducers/userSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export default store;
