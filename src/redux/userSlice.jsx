import {createSlice} from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state,action) => {
            console.log(action.payload)
            state.isLoggedIn = action.payload;
        },
        logout: (state,action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export  const { login, logout } = userSlice.actions;
export default userSlice.reducer;