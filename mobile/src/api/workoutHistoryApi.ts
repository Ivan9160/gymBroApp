import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IWorkout } from '../types'
import { getStoredAccessToken } from '../hooks/useAnonymousAuth';

export const workoutHistoryApi = createApi({
    reducerPath: 'workoutHistoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL ,
        prepareHeaders: async (headers) => {
            const token = await getStoredAccessToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['WorkoutHistory'],
    endpoints: (builder) => ({
        getWorkouts: builder.query<IWorkout[], void>({
            query: () => '/workouts',
            providesTags: ['WorkoutHistory']
        }),
        setWorkouts: builder.mutation<void, IWorkout[]>({
            query: (workouts) => ({
                url: '/workouts',
                method: 'POST',
                body: workouts
            }),
            invalidatesTags: ['WorkoutHistory']
        })
    })
})

export const {useGetWorkoutsQuery} = workoutHistoryApi