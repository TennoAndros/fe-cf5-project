import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  removeUserByUsername,
  updateUser,
} from "../../api/api";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Payload:", action.payload);
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUserByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.currentUser?.username === action.meta.arg) {
          state.currentUser = null;
        }
      })
      .addCase(removeUserByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
