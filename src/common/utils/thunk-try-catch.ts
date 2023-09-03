import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types";

/**
 * A utility function that encapsulates common try-catch logic for asynchronous Redux thunk actions.
 *
 * @template T - The expected result type of the asynchronous logic.
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>} thunkAPI - The thunkAPI object provided by Redux Toolkit.
 * @param {() => Promise<T>} logic - A function that performs the asynchronous logic and returns a Promise.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - A Promise containing the result of the logic or a rejectWithValue action.
 */

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
