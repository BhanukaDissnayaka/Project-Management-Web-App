import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthPayloadType, AuthStateType } from "../types/auth.type";
import { authApi } from "../api/auth.api";

const initialState: AuthStateType = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayloadType>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      }
    );
  },
});
export default authSlice.reducer;
export const { setCredentials, clearAuth, setLoading } = authSlice.actions;
