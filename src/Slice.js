import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }), 
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => '/api/users',
    }),
    loadAllowedPages: builder.query({
      query: () => '/api/allowed-Pages',
    }),
    loadAllowedActions: builder.query({
      query: () => '/api/allowed-Actions',
    }),
  }),
});


export const { useFetchUsersQuery, useLoadAllowedPagesQuery, useLoadAllowedActionsQuery } = userApi;
