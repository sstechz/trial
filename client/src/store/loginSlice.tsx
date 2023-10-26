import { createSlice } from "@reduxjs/toolkit";

// interface LoginState {
//   userName: string ;
//   userId: string ;
//   token: string ;
// }

// const initialState: LoginState = {
//   userName: null,
//   userId: null,
//   token: null,
// };

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userName: "",
    userId: "",
    token: "",
  },
  reducers: {
    getUserName: (state, action) => {
      state.userName = action.payload;
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
        state.token = "";
    },
    destroyLogin: (state) => {
      state.userName = "";
      state.userId = "";
      state.token = "";
    }
  },
});

export const { getUserName, getUserId, getToken, removeToken, destroyLogin } = loginSlice.actions;
export default loginSlice.reducer;
