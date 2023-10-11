import { IUser } from "@codernex/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error?: string | undefined;
}

const initialState: UserState = {
  isLoading: false,
  users: [],
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchUsersError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { startLoading, fetchUsersError, fetchUsersSuccess } =
  userSlice.actions;
