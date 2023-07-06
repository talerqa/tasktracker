import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {useAppDispatch, useAppSelector} from '../../app/store';
import {setError} from '../../app/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
 // const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()
  const error = useAppSelector<string | null>((state) => state.app.error)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }


    dispatch(setError(null))

    // setOpen(false)
  }
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  )
}