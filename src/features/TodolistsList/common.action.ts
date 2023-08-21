import { createAction } from "@reduxjs/toolkit";
import { TodolistDomainType } from "features/TodolistsList/todolists-reducer";
import { TasksStateType } from "features/TodolistsList/tasks-reducer";

export type clearTaskAndTodolists = {
  tasks: TasksStateType
  todolists: TodolistDomainType[]
}

export const clearTaskAndTodolists = createAction<clearTaskAndTodolists>('common/clear-todolist-tasks')