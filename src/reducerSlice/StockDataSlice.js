import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    stockDetailsList: [],
    chartCompareList: [],
    stockHistoricalDataList: []
  }

const stockDataSlice = createSlice({
    name: 'stocksData',
    initialState,
    reducers: {
        addToStockDetailsList(state, action) {
          const stockDetails = action.payload
          
          var existingItemIndex = state.stockDetailsList.findIndex(item => item.symbol == stockDetails.symbol)

        if (existingItemIndex > -1) { 
            const newArray = [...(state.stockDetailsList)];
            newArray[existingItemIndex] = { ...newArray[existingItemIndex], ...stockDetails };
            state.stockDetailsList = [...newArray];            
        } else {
            state.stockDetailsList = [...(state.stockDetailsList), stockDetails];            
        }

        },
        deleteFromStockDetailsList(state, action) {
            state.chartCompareList = state.chartCompareList.filter(e => e !== action.payload)            
        },
        addToStockCompareList(state, action) {
            const stockSymbol = action.payload
            var existingItemIndex = state.chartCompareList.findIndex(item => item == stockSymbol)
            if (existingItemIndex < 0) {
                state.chartCompareList.push(stockSymbol);
            }            
          },
        deleteFromStockCompareList(state, action) {
            const stockSymbol = action.payload
            state.chartCompareList = state.chartCompareList.filter(e => e !== stockSymbol)
        }
    }
})

export const {
    addToStockDetailsList,
    deleteFromStockDetailsList,
    addToStockCompareList,
    deleteFromStockCompareList
  } = stockDataSlice.actions
  
export default stockDataSlice.reducer