import { apiGet, apiPatch, apiPost } from "@/lib/utils";
import { AppDispatch } from "..";
import { startLoading } from "../reducers/user";
import { z } from "zod";
import {
  createMembershipSchema,
  updateMembershipSchema,
} from "@codernex/schema";
import {
  createMembershipError,
  createMembershipSucces,
  fetchMembershipsError,
  fetchMembershipsSuccess,
  updateMembershipErr,
  updateMembershipSuccess,
} from "../reducers/membership";
import toast from "react-hot-toast";
import { IMembership } from "@codernex/types";

export const createMembership =
  (data: z.infer<typeof createMembershipSchema>) => (dispatch: AppDispatch) => {
    dispatch(startLoading());

    apiPost("/membership", data)
      .then((res) => {
        toast.success("Membership created successfully");
        dispatch(createMembershipSucces(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(createMembershipError());
      });
  };

export const fetchMembership = () => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  apiGet<IMembership[]>("/membership")
    .then((res) => {
      dispatch(fetchMembershipsSuccess(res.data));
    })
    .catch((_err) => {
      dispatch(fetchMembershipsError());
    });
};

export const updateMembership =
  ({
    id,
    data,
  }: {
    id: string;
    data: z.infer<typeof updateMembershipSchema>;
  }) =>
  (dispatch: AppDispatch) => {
    dispatch(startLoading());
    apiPatch(`/membership/${id}`, data)
      .then((res) => {
        dispatch(updateMembershipSuccess(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(updateMembershipErr());
      });
  };
