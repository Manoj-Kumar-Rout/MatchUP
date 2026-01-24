import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  Name: User,
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const{addUser}=userSlice.actions;
export default userSlice.reducer;
