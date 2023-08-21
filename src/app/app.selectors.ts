import { AppRootStateType } from "app/store";


export const statusSelector = (state: AppRootStateType) => state.app.status
export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn
export const isInitializedSelector = (state: AppRootStateType) =>  state.app.isInitialized

export const todolistsSelector = (state: AppRootStateType) => state.todolists
export const tasksSelector = (state: AppRootStateType) => state.tasks