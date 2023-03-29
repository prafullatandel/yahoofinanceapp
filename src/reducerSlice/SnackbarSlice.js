import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    snackbarMessage: '',
    snackbarOpen: false,
    snackbarType: '',
  }


  const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackBar(state, action) {
            const data = action.payload
            state.snackbarMessage = data.message;
            state.snackbarOpen = data.open;
            state.snackbarType = data.type;
        }
    }
})

export const {
    setSnackBar
  } = snackbarSlice.actions
  
export default snackbarSlice.reducer