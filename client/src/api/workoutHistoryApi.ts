import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {type Workout } from '../types'

const baseUrl = import.meta.env.VITE_API_URL
export const workoutHistoryApi = createApi({
    reducerPath: 'workoutHistoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['WorkoutHistory'],
    endpoints: (builder) => ({
        getWorkouts: builder.query<Workout[], void>({
            query: () => '/workouts',
            providesTags: ['WorkoutHistory']
        }),
        setWorkouts: builder.mutation<void, Workout[]>({
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