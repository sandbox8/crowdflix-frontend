import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authDrawerReducer from "./slices/authDrawerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    authDrawer: authDrawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
