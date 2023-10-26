import { createSlice } from "@reduxjs/toolkit";

export const registeredSlice = createSlice({
  name: "registered",
  initialState: {
    Badminton: "",
    Cricket: "",
    Basketball: "",
    Football: "",
    Table_Tennis: "",
  },
  reducers: {
    getBadminton: (state, action) => {
      state.Badminton = action.payload;
    },
    getBasketball: (state, action) => {
      state.Basketball = action.payload;
    },
    getCricket: (state, action) => {
      state.Cricket = action.payload;
    },
    getFootball: (state, action) => {
      state.Football = action.payload;
    },
    getTable_Tennis: (state, action) => {
      state.Table_Tennis = action.payload;
    },
    destroyRegistered: (state) => {
      state.Badminton = "";
      state.Cricket = "";
      state.Basketball = "";
      state.Football = "";
      state.Table_Tennis = "";
    }
  },
});

export const {
  getBadminton,
  getBasketball,
  getCricket,
  getFootball,
  getTable_Tennis,
  destroyRegistered,
} = registeredSlice.actions;
export default registeredSlice.reducer;
