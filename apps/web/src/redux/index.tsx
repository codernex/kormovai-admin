import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import user from "./reducers/user";
import membership from "./reducers/membership";
export const store = configureStore({
  reducer: {
    user,
    membership,
  },
  preloadedState: {
    user: {
      isLoading: false,
      users: [],
    },
    membership: {
      isLoading: false,
      memberships: [],
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
