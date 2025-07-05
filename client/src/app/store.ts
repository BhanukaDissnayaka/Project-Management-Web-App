import { baseApi } from "@/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
