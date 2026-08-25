import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ISet } from "../../types";

const initialState = {
        id: null as number | null,
        startTime: null as string | null,
        sets: [] as ISet[],
    };

const workoutSlice = createSlice({
  name: "workout",
  initialState,
    reducers: {
        setWorkoutId(state, action: PayloadAction<number | null>) {
            state.id = action.payload;
        },
        setWorkoutStartTime(state, action: PayloadAction<string | null>) {
            state.startTime = action.payload;
        },
    
        setWorkoutSets(state, action: PayloadAction<ISet[]>) {
            state.sets = action.payload;
        },
        resetWorkout() {
            return initialState;
        }
    }
    
   
})
export const { setWorkoutId, setWorkoutStartTime, setWorkoutSets, resetWorkout } = 
    workoutSlice.actions;
export default workoutSlice.reducer;