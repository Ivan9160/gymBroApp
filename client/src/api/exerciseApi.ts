import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type ExerciseGroup, type Exercise } from '../types'

const baseUrl = import.meta.env.VITE_API_URL
export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Exercises', 'ExerciseGroups'],
    endpoints: (builder) => ({
        getExercises: builder.query<Exercise[], void>({
            query: () => '/exercise',
            providesTags: ['Exercises']
        }),
        getExerciseGroups: builder.query<ExerciseGroup[], void>({
            query: () => '/exercise-groups',
            providesTags: ['ExerciseGroups']
        }),
    })
})

export const {useGetExercisesQuery, useGetExerciseGroupsQuery} = exerciseApi