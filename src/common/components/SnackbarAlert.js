import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const SnackbarAlert = (props) => {
  const { open, onClose, autoHideDuration = null, message, severity = 'info' } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(event, reason) => {
        if (reason !== 'clickaway') onClose(event, reason);
      }}>
      <Alert severity={severity} onClose={(event, reason) => onClose(event, reason)}>
        {message}
      </Alert>
    </Snackbar>)
}
