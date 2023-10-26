import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        user: {},
    },
    reducers: {
        getUrl: (state, action) => {
            state.url = action.payload;
        },
        getUser : (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { getUrl, getUser } = homeSlice.actions;

export default homeSlice.reducer;