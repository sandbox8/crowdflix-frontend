import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  display_name: string | null;
  profile_picture_url: string | null;
  firebase_uid: string;
  role: string;
  wallet_address: string | null;
  is_ready_to_buy: boolean;
  is_ready_to_sell: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
