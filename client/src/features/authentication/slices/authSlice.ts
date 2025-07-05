import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthStateType } from "../types/auth.type";
import type { UserType } from "@/types/api.type";

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
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserType; accessToken: string }>
    ) => {
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
});
export default authSlice.reducer;
export const { setCredentials, clearAuth, setLoading } = authSlice.actions;
