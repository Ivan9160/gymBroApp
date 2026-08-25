import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser, IUserAccountSummary } from '../types';
import { getStoredAccessToken } from '../hooks/useAnonymousAuth';


export interface IUserWriteRequest {
    name: string;
    age: number | null;
    gender: string | null;
    height: number | null;
    weight: number | null;
    goal: string | null;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL ,
        prepareHeaders: async (headers) => {
            const token = await getStoredAccessToken();
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
        }),

        updateUser: builder.mutation<IUser, IUserWriteRequest>({
            query: (userData) => ({
                url: '/users/me',
                method: 'PATCH',
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