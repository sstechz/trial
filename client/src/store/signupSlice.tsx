import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    name: "",
    email: "",
    branch: "",
    s_id: "",
    password: "",
  },
  reducers: {
    getName: (state, action) => {
      state.name = action.payload;
    },
    getEmail: (state, action) => {
      state.email = action.payload;
    },
    getBranch: (state, action) => {
      state.branch = action.payload;
    },
    getId: (state, action) => {
      state.s_id = action.payload;
    },
    getPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { getName, getEmail, getBranch, getId, getPassword } =
  signupSlice.actions;
export default signupSlice.reducer;
