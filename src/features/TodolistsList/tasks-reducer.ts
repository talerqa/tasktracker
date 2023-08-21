import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType, AppThunk } from "app/store";

import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { appActions } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "features/TodolistsList/todolists-reducer";

const initialState: TasksStateType = {};

const slice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
      removeTask: (state: TasksStateType, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
        const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId);
        if (index !== -1) state[action.payload.todolistId].splice(index, 1);
      },
      addTask: (state: TasksStateType, action: PayloadAction<{ task: TaskType }>) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      },
      updateTask: (state: TasksStateType, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
        const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId);
        if (index !== -1) {
          state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], ...action.payload.model };
        }
      },
      setTasks: (state: TasksStateType, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
        state[action.payload.todolistId] = action.payload.tasks;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(todolistsActions.addTodolist, (state, action) => {
          state[action.payload.todolist.id] = [];
        })
        .addCase(todolistsActions.removeTodolist, (state, action) => {
          delete state[action.payload.id];
        })
        .addCase(todolistsActions.setTodolists, (state, action) => {
          action.payload.todolists.forEach((tl) => {
            state[tl.id] = [];
          });
        });
    }
  })
;

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(tasksActions.setTasks({tasks, todolistId}));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};
export const removeTaskTC = (taskId: string, todolistId: string) : AppThunk => (dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
    const action = tasksActions.removeTask({ taskId, todolistId });
    dispatch(action);
  });
};
export const addTaskTC =
  (title: string, todolistId: string) =>
    (dispatch: Dispatch) => {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      todolistsAPI
        .createTask(todolistId, title)
        .then((res) => {
          if (res.data.resultCode === 0) {
            const task = res.data.data.item;
            const action = tasksActions.addTask({ task });
            dispatch(action);
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    };
export const updateTaskTC =
  (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) : AppThunk =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const state = getState();
      const task = state.tasks[todolistId].find((t) => t.id === taskId);
      if (!task) {
        //throw new Error("task not found in the state");
        console.warn("task not found in the state");
        return;
      }

      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...model
      };

      todolistsAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            const action = tasksActions.updateTask({taskId, model, todolistId});
            dispatch(action);
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};


