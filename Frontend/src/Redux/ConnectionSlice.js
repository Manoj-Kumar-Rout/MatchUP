import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },

    removeUser: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
