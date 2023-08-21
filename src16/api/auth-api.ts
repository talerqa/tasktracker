import axios, { AxiosResponse } from "axios";
import { ResponseType, TodolistType } from "./todolists-api";
import { LoginType } from "../features/login/Login";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "5fc11a34-7258-4926-8c00-91db4f940cfd",
  },
});

type UserDataType = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  login(data: LoginType) {
    return instance.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      LoginType
    >("auth/login", data);
  },
  me() {
    return instance.get<ResponseType<UserDataType>>("auth/me");
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
