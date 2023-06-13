import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    mode: "light",
    // MAJI TU BYT TICKETS ? + DODELAT REDUCER
    tickets: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
    },
});

export const { setLogin, setLogout, setMode, setTickets } = authSlice.actions;
export default authSlice.reducer;
