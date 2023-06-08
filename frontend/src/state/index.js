import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    mode: "light",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, aciton) => {
            state.user = aciton.payload.user;
            state.token = aciton.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setMode: (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { setLogin, setLogout, setMode } = authSlice.actions;
export default authSlice.reducer;
