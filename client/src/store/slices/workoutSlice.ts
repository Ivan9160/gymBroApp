import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Set } from "../../types";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
        id: null as number | null,
        startTime: null as string | null,

        sets: [] as Set[],
    },
    reducers: {
        setWorkoutId(state, action: PayloadAction<number | null>) {
            state.id = action.payload;
        },
        setWorkoutStartTime(state, action: PayloadAction<string | null>) {
            state.startTime = action.payload;
        },
    
        setWorkoutSets(state, action: PayloadAction<Set[]>) {
            state.sets = action.payload;
        }
    }
   
})
export const { setWorkoutId, setWorkoutStartTime, setWorkoutSets } = 
    workoutSlice.actions;
export default workoutSlice.reducer;