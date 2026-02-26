import { configureStore } from "@reduxjs/toolkit";

import {
    setUserId, 
    setUserEmail, 
    setUserName, 
    setUserAuth0Id, 
    setUserAge, 
    setUserGender, 
    setUserHeight, 
    setUserWeight, 
    setUserGoal 

} from "./slices/userSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
}); 

export {
    store, 
    setUserId, 
    setUserEmail, 
    setUserName, 
    setUserAuth0Id, 
    setUserAge, 
    setUserGender, 
    setUserHeight, 
    setUserWeight, 
    setUserGoal 
};