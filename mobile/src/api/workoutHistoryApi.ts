import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IWorkout } from '../types'
import { getStoredAccessToken } from '../hooks/useAnonymousAuth';



interface GetWorkoutsParams {
    page: number;
    limit: number;
}

interface GetWorkoutsResult {
    workouts: IWorkout[];
    hasNextPage: boolean;
}

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
        getWorkouts: builder.query<GetWorkoutsResult, GetWorkoutsParams>({
            query: ({page, limit}) => ({
                url: '/workouts',
                params:{
                    page,
                    limit
                    
                }
            }),

            transformResponse: (response: IWorkout[], meta) => ({
                workouts: response,
                hasNextPage: meta?.response?.headers.get('X-Has-Next-Page') === 'true'
            }),
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