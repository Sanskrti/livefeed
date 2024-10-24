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
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/api/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: updatedUser,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useLoadAllowedPagesQuery,
  useLoadAllowedActionsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
