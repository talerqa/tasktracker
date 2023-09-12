import { BaseResponseType } from "common/types/common.types";
import axios from "axios";
import { instance } from "common/api/common.api";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
  },
  getCaptcha() {
    return axios.get<{ url: string }>("https://social-network.samuraijs.com/api/1.0/security/get-captcha-url", {
      withCredentials: true,
      headers: {
        "API-KEY": "1cdd9f77-c60e-4af5-b194-659e4ebd5d41",
      },
    });
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
