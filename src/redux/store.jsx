import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import mediaReducer from './mediaSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        video:mediaReducer
    },
});