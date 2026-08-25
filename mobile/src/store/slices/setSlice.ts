import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
const initialState = {
        id: null as number | null,
        muscleGroupId: 1 as number | null,
        exerciseId: 1 as number | null,
        weight: 0 as number | null,
        reps: null as number | null,
    };


const setSlice = createSlice({
  name: "set",
  initialState, 
    reducers: {
        setSetId(state, action: PayloadAction<number | null>) {
            state.id = action.payload;
        },
        setSetMuscleGroup(state, action: PayloadAction<number | null>) {
            console.log("Setting muscle group ID to:", action.payload);
            state.muscleGroupId = action.payload;
        },
        setSetExerciseId(state, action: PayloadAction<number | null>) {
            state.exerciseId = action.payload;
        },
        setSetWeight(state, action: PayloadAction<number | null>) {
            state.weight = action.payload;
        },
        setSetReps(state, action: PayloadAction<number | null>) {
            state.reps = action.payload;
        },
        resetSet() {
            return initialState;
        },
    }
   
})
export const { setSetId, setSetMuscleGroup, setSetExerciseId, setSetWeight, setSetReps, resetSet } = 
    setSlice.actions;
export default setSlice.reducer;