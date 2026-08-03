import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser, IUserAccountSummary } from '../types';

const baseUrl = import.meta.env.VITE_API_URL;

export interface IUserWriteRequest {
    name: string;
    auth0Id: string;
    age: number | null;
    gender: string | null;
    height: number | null;
    weight: number | null;
    goal: string | null;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['UserSummary'],
    endpoints: (builder) => ({
        getUserSummary: builder.query<IUserAccountSummary, void>({
            query: () => `/user-summary/me`,
            serializeQueryArgs: () => 'getUserSummary',
            providesTags: ['UserSummary'],
        }),

        createUser: builder.mutation<IUser, IUserWriteRequest>({
            query: (userData) => ({
                url: '/users',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['UserSummary'],
        }),

        updateUser: builder.mutation<IUser, IUserWriteRequest>({
            query: (userData) => ({
                url: '/users/me',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['UserSummary'],
        }),
    }),
});

export const {
    useGetUserSummaryQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
} = userApi;