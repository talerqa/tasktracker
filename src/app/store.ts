import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "features/TodolistsList/model/tasks/tasks.slice";
import { todolistsSlice } from "features/TodolistsList/model/todolists/todolists.slice";
import { appSlice } from "app/app.slice";
import { authSlice } from "features/auth/model/auth.slice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
