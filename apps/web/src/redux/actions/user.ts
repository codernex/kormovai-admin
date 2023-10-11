import { apiGet } from "@/lib/utils";
import { AppDispatch } from "..";
import {
  fetchUsersError,
  fetchUsersSuccess,
  startLoading,
} from "../reducers/user";
import { IApiError, IUser } from "@codernex/types";

export const fetchUsers = () => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  apiGet<IUser>("/users")
    .then((res) => {
      dispatch(fetchUsersSuccess(res.data));
    })
    .catch((err: IApiError) => {
      dispatch(fetchUsersError(err.message));
    });
};
