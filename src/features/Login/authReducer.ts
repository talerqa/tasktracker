import {Dispatch} from 'redux'
import {
  SetAppErrorActionType,
  SetAppInitializeActionType,
  setAppInitializedAC,
  setAppStatusAC,
  SetAppStatusActionType
} from '../../app/app-reducer'
import {LoginType} from './Login';
import {authAPI} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {

  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }

  } catch (e) {
    const error = e as { message: string }
    handleServerNetworkError(error, dispatch)
  }

}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {

  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    const error = e as { message: string }
    handleServerNetworkError(error, dispatch)
  } finally {
    dispatch(setAppInitializedAC(true))
  }

}

export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    const error = e as { message: string }
    handleServerNetworkError(error, dispatch)
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType | SetAppInitializeActionType
