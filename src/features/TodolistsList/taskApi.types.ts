import { TaskPriorities, TaskStatuses } from "common/utils/enums/enums";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.reducer";

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type AddTaskArgThunk = { todolistId: string; title: string };
export type UpdateTaskArgThunk = { todolistId: string; taskId: string; model: UpdateDomainTaskModelType };
export type RemoveTaskArgThunk = { todolistId: string; taskId: string };
