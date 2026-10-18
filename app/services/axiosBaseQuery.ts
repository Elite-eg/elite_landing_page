import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import ApiService from "./ApiService";
import { ApiResponse } from "../../lib/types";

type AxiosQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export type AxiosBaseQueryError = {
  status: number;
  data: unknown;
};

const axiosBaseQuery =
  (): BaseQueryFn<AxiosQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const res = await ApiService.request({
        url,
        method,
        data,
        params,
        headers,
      });

      const body = res.data as ApiResponse<unknown>;

      if (body.statusCode < 400) {
        return { data: body };
      }

      if (body.statusCode === 408 && typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return {
        error: {
          status: body.statusCode,
          data: body,
        },
      };
    } catch (err) {
      const axiosErr = err as AxiosBaseQueryError;

      return {
        error: {
          status: axiosErr.status ?? "NETWORK_ERROR",
          data: axiosErr.data ?? "",
        },
      };
    }
  };

export default axiosBaseQuery;
