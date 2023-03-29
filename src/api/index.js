import axios from 'axios'

export const BASE_URL = 'https://localhost:7215/api/';

export const ENDPOINTS = {
    stockDetails: 'YahooFinanceStocksAPI',
    stockCurrentDetails: 'YahooFinanceStocksAPI/GetCurrentStockDetails/?stockSymbol=',
    stockHistoricalData: 'YahooFinanceStocksAPI/GetStockHistoricalData/?stockSymbol='
}

const authDetails = { auth: {
    username: process.env.REACT_APP_API_USERID,
    password: process.env.REACT_APP_API_PASSWORD
  }}

export const createAPIEndpoint =  (endpoint) => {

    let url = BASE_URL + endpoint ;
    return {
        fetchByStockSymbol: async (stockSymbol) => axios.get(url + stockSymbol, authDetails),
        post: async (newRecord) => await axios.post(url, newRecord, authDetails)
    }
}

export const FetchAsyncData = async (endpoint, param) => {

    let url = BASE_URL + endpoint ;
    const response = await axios.get(
        url + param,
        authDetails
	);
    return response
}