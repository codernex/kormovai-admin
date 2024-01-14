import { IMembership } from "@codernex/types";
import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

interface IState {
  memberships: IMembership[];
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
  memberships: [],
};

const membershipSlice = createSlice({
  initialState,
  name: "membership",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    fetchMembershipsSuccess: (state, action) => {
      state.isLoading = false;
      state.memberships = action.payload;
    },
    fetchMembershipsError: (state) => {
      state.isLoading = false;
    },
    createMembershipSucces: (state, action) => {
      state.isLoading = false;
      state.memberships.push(action.payload);
    },
    createMembershipError: (state) => {
      state.isLoading = false;
    },
    updateMembershipSuccess: (state, action) => {
      state.isLoading = false;
      state.memberships = state.memberships.map((membership) => {
        return membership.id === action.payload.id
          ? action.payload
          : membership;
      });
    },
    updateMembershipErr: (state) => {
      state.isLoading = false;
    },
  },
});

export default membershipSlice.reducer;

export const {
  createMembershipError,
  createMembershipSucces,
  fetchMembershipsError,
  fetchMembershipsSuccess,
  startLoading,
  updateMembershipSuccess,
  updateMembershipErr,
} = membershipSlice.actions;
