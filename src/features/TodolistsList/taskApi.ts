import { BaseResponseType } from "common/types";
import { instance } from "common/api/api";
import {
  AddTaskArgThunk,
  GetTasksResponse,
  RemoveTaskArgThunk,
  TaskType,
  UpdateTaskArgThunk,
} from "features/TodolistsList/taskApi.types";

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskArgThunk) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: AddTaskArgThunk) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    });
  },
  updateTask(arg: UpdateTaskArgThunk) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, arg.model);
  },
};
