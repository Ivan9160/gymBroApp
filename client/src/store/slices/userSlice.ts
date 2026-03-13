import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
        id: null as number | null,
        name: '',
        auth0Id: '',
        age: null as number | null,
        gender: null as string | null,
        height: null as number | null,
        weight: null as number | null,
        goal: null as string | null,
        role: null as string | null
    },
    reducers: {
        setUserId(state, action: PayloadAction<number | null>) {
            state.id = action.payload;
        },
        setUserRole(state, action: PayloadAction<string>) {
            state.role = action.payload;
        },
        setUserName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setUserAuth0Id(state, action: PayloadAction<string>) {
            state.auth0Id = action.payload;
        },
        setUserAge(state, action: PayloadAction<number | null>) {
            state.age = action.payload;
        },
        setUserGender(state, action: PayloadAction<string | null>) {
            state.gender = action.payload;
        },
        setUserHeight(state, action: PayloadAction<number | null>) {
            state.height = action.payload;
        },
        setUserWeight(state, action: PayloadAction<number | null>) {
            state.weight = action.payload;
        },
        setUserGoal(state, action: PayloadAction<string | null>) {
            state.goal = action.payload;
        }
    }
   
})
export const { setUserId, setUserRole, setUserName, setUserAuth0Id, setUserAge, setUserGender, setUserHeight, setUserWeight, setUserGoal } = 
    userSlice.actions;
export default userSlice.reducer;