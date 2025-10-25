import { createSlice } from "@reduxjs/toolkit";

export const authDrawerSlice = createSlice({
  name: "authDrawer",
  initialState: {
    isOpen: false,
    activeTab: "signin",
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setIsOpen, setActiveTab } = authDrawerSlice.actions;
export default authDrawerSlice.reducer;
