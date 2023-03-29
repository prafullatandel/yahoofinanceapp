import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackBar } from '../../reducerSlice/SnackbarSlice.js'


const SnackbarNotify = () => {
  const snackbarMessage = useSelector((state) => state.snackbarData.snackbarMessage)
  const snackbarOpen = useSelector((state) => state.snackbarData.snackbarOpen)
  const snackbarType = useSelector((state) => state.snackbarData.snackbarType)

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackBar({ open: false, message: '', type: snackbarType }));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        sx={{minWidth: "400px"}}
        elevation={6}
        variant="filled"
        severity={snackbarType === '' ? 'info' : snackbarType}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotify;
