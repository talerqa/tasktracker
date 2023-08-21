import { Dispatch } from "redux";
import { authAPI } from "api/todolists-api";
import { authActions } from "features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null;
  // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
  isInitialized: boolean;
};

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false as boolean
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppError: (state: InitialStateType, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state: InitialStateType, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state: InitialStateType, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    }
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export type AppInitialState = ReturnType<typeof slice.getInitialState>;


export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {
    }
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  });
};


