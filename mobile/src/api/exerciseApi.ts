import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { type IExerciseGroup, type IExercise } from '../types'

export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL,
        prepareHeaders: async (headers) => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Exercises', 'ExerciseGroups'],
    endpoints: (builder) => ({
        getExercises: builder.query<IExercise[], void>({
            query: () => '/exercises',
            providesTags: ['Exercises']
        }),
        getExerciseGroups: builder.query<IExerciseGroup[], void>({
            query: () => '/exercise-groups',
            providesTags: ['ExerciseGroups']
        }),
    })
})

export const { useGetExercisesQuery, useGetExerciseGroupsQuery } = exerciseApi