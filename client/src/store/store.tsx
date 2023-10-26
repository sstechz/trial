import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import registeredSlice from "./registeredSlice";
import signupSlice from "./signupSlice";
import homeSlice from "./homeSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signupSlice,
    registered: registeredSlice,
    home: homeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;