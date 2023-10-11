import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { IApiError, IApiResponse } from "@codernex/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((data: InternalAxiosRequestConfig<unknown>) => {
  data.headers.Authorization = "Bearer " + localStorage.getItem("auth");
  return data;
});

export const apiGet = async <T>(url: string) => {
  return new Promise<IApiResponse<T>>(
    (resolve, reject: (error: IApiError) => void) => {
      api
        .get<IApiResponse<T>>(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err: AxiosError<IApiResponse<IApiError>>) => {
          if (err?.response?.data?.error) {
            reject(err.response.data.error);
          }
        });
    }
  );
};
