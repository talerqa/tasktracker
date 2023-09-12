import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app.slice";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearCaptcha, clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captcha: "",
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
      })
      .addCase(getCaptcha.fulfilled, (state, action) => {
        state.captcha = action.payload.captcha;
      })
      .addCase(clearCaptcha, (state, action) => {
        state.captcha = "";
      });
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.login(arg);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else if (res.data.resultCode === ResultCode.Captcha) {
    dispatch(getCaptcha());
    return rejectWithValue({ data: res.data, showGlobalError: true });
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true });
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    dispatch(clearCaptcha());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(null);
  }
});

const getCaptcha = createAppAsyncThunk<{ captcha: string }, void>("auth/captcha", async (_, thunkAPI) => {
  const res = await authAPI.getCaptcha();
  return { captcha: res.data.url };
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return { isLoggedIn: false };
    }
  } catch (e) {
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  }
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
