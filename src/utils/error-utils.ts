import {setError, SetErrorType, setStatus, SetStatusType} from '../app/appReducer';
import {Dispatch} from 'redux';
import {ResponseType} from  './../api/todolists-api'

export const handleServerAppError = <D>(dispatch: ErrorUtilsDispatchType, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setError(data.messages[0]))
  } else {
    dispatch(setError('Some error occurred'))
  }
  dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: string) => {
  dispatch(setError(error))
  dispatch(setStatus('failed'))
}

 type ErrorUtilsDispatchType = Dispatch<SetErrorType | SetStatusType>
