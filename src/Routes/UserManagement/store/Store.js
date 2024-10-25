import { configureStore } from '@reduxjs/toolkit'; 
import { userApi } from '../Reducers/apiSlices/Slice'; 
import userReducer from '../Reducers/userSlice'; 

const store = configureStore({
  reducer: {
    // The main reducer object where different slice reducers are combined.
    users: userReducer, // Adding the user slice reducer to manage user-related state.
    [userApi.reducerPath]: userApi.reducer, // Adding the API slice reducer using its generated path.
  },
  
  middleware: (getDefaultMiddleware) =>
    // Configuring middleware for the store. RTK provides some default middleware.
    getDefaultMiddleware().concat(userApi.middleware), // Adding the middleware for the API slice to the default middleware.
});

export default store;
