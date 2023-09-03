import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import { authAPI, LoginParamsType } from "features/auth/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils";
import { BaseResponseType } from "common/types";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

// thunks

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: null | BaseResponseType }>(
  "auth/login",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(arg);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        handleServerAppError(res.data, dispatch, isShowAppError);
        return rejectWithValue(res.data);
      }
    });
  }
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/logout", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      dispatch(appActions.setAppStatus({ status: "failed" }));
      return rejectWithValue(null);
    }
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  "app/initialized",
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    return thunkTryCatch(thunkApi, async () => {
      const res = await authAPI.me();
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true };
      } else {
        //handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    }).finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    });
  }
);

export const authReducer = slice.reducer;
export const authThunks = { login, logout, initializeApp };
