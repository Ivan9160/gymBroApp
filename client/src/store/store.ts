import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import workoutReducer from "./slices/workoutSlice";
import setReducer from "./slices/setSlice";
import { exerciseApi } from "../api/exerciseApi";



const loadFromLocalStorage = () =>{
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined;
        return JSON.parse(serializedState);

    }
    catch(error)
    {
        console.error("Error loading state from localStorage:", error);
        return undefined;
    }
}

const localStorageMiddleware = (store:any) => (next:any) => (action:any) => {
    const result = next(action);
    const state = store.getState();
    const stateToSave = {
        user: state.user,
        workout: state.workout,
        set: state.set,
    }
    localStorage.setItem('state', JSON.stringify(stateToSave));
    return result;
}

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    set: setReducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadFromLocalStorage(),

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(exerciseApi.middleware, localStorageMiddleware),
}); 



export type RootState = ReturnType<typeof store.getState>;
export type ApiDispatch = typeof store.dispatch;