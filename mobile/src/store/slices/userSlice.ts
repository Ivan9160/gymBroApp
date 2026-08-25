import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser, IProficiency, ISoreness } from '../../types';
import { userApi } from '../../api/userApi';

interface UserState {
    id: number | null;
    name: string;
    role: string | null;
    age: number | null;
    gender: string | null;
    height: number | null;
    weight: number | null;
    goal: string | null;
    proficiency: IProficiency[];
    soreness: ISoreness[];
}

const initialState: UserState = {
    id: null,
    name: '',
    role: null,
    age: null,
    gender: null,
    height: null,
    weight: null,
    goal: null,
    proficiency: [],
    soreness: [],
};

function applyUser(state: UserState, user: IUser) {
    state.id = user.id;
    state.name = user.name;
    state.role = user.role;
    state.age = user.userProfile?.age ?? null;
    state.gender = user.userProfile?.gender ?? null;
    state.height = user.userProfile?.height ?? null;
    state.weight = user.userProfile?.weight ?? null;
    state.goal = user.userProfile?.goal ?? null;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.name = action.payload;
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
        },
        resetUser() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.getUserSummary.matchFulfilled, (state, action) => {
            applyUser(state, action.payload.user);
            state.proficiency = action.payload.proficiency;
            state.soreness = action.payload.soreness;
        });
        builder.addMatcher(userApi.endpoints.createUser.matchFulfilled, (state, action) => {
            applyUser(state, action.payload);
        });
        builder.addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, action) => {
            applyUser(state, action.payload);
        });
        
    },
});

export const {
    setUserName,
    setUserAge,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserGoal,
    resetUser,
} = userSlice.actions;

export default userSlice.reducer;