import { configureStore } from '@reduxjs/toolkit'

import stockDataReducer from './reducerSlice/StockDataSlice'
import snackbarReducer from './reducerSlice/SnackbarSlice'


const store = configureStore({
  reducer: {
    stockData: stockDataReducer,
    snackbarData: snackbarReducer
  },
})

export default store