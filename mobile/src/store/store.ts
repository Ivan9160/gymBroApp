import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer from "./slices/userSlice";
import workoutReducer from "./slices/workoutSlice";
import setReducer from "./slices/setSlice";
import { exerciseApi } from "../api/exerciseApi";
import { workoutHistoryApi } from "../api/workoutHistoryApi";
import { userApi } from "../api/userApi";

const rootReducer = combineReducers({
  user: userReducer,
  workout: workoutReducer,
  set: setReducer,
  [userApi.reducerPath]: userApi.reducer,
  [exerciseApi.reducerPath]: exerciseApi.reducer,
  [workoutHistoryApi.reducerPath]: workoutHistoryApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: [
        "user",
        "workout",
        "set",
    ] satisfies Array<keyof RootState>,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }).concat(
      exerciseApi.middleware,
      workoutHistoryApi.middleware,
      userApi.middleware
    ),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;