import { BaseResponseType } from "common/types";
import { instance } from "common/api/api";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist: function (title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolist) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.id}`, { title: arg.title });
  },
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTodolist = {
  id: string;
  title: string;
};
