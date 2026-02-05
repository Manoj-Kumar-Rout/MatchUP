import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    users: [],
    currentIndex: 0,
    loading: false,
  },
  reducers: {
    setFeedUsers: (state, action) => {
      state.users = action.payload;
      state.currentIndex = 0;
      state.loading = false;
    },
    nextCard: (state) => {
      state.currentIndex += 1;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    resetFeed: (state) => {
      state.users = [];
      state.currentIndex = 0;
    },
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const {
  setFeedUsers,
  nextCard,
  setLoading,
  resetFeed,
  removeUserFromFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
