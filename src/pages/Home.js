
import React, {useState, useEffect} from 'react'

import { Box, Button, Container, Grid, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import HomeLogo from '../assets/images/logo/HomeLogo.JPG'
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import StockDetailsCard from './StockDetailsCard';

import { useSelector, useDispatch } from 'react-redux'
import { addToStockDetailsList } from '../reducerSlice/StockDataSlice'
import { setSnackBar } from '../reducerSlice/SnackbarSlice'

const getFreshModel = () => ({
    searchSymbol: ""    
})

export default function Home() {
    const dispatch = useDispatch()
    const [stockDetailsList, setStockDetailsList]  = useState([])
    const [loading, setLoading] = React.useState(false);
    const reduxStockDetailsList = useSelector((state) => state.stockData.stockDetailsList)

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        
        if(reduxStockDetailsList && reduxStockDetailsList?.length) {
            setStockDetailsList(reduxStockDetailsList);  
        }
    }, [])

    const addToLocalStockDetailsList = (data) => {
        var existingItemIndex = stockDetailsList.findIndex(item => item.symbol == data.symbol)

        if (existingItemIndex > -1) { 
            const newArray = [...stockDetailsList];
            newArray[existingItemIndex] = { ...newArray[existingItemIndex], ...data };
            setStockDetailsList(newArray);            
        } else {
            setStockDetailsList([...stockDetailsList, data]);            
        }

        if(data && data?.symbol) {
            dispatch(addToStockDetailsList(data))
        }

        values.searchSymbol = "";
        
    }

    const onSymbolSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            fetchDetails(values.searchSymbol)
        }        
    }

    const fetchDetails = (serchSymbol, update=false) => {
        setLoading(true);
        const snackbarSuccessMessage = update ? "Stock Details Updated" : "Stock Details Found"
        const snackbarErrorMessage = update ? "Error updating Stock Details" : "Stock Details not Found"
       return createAPIEndpoint(ENDPOINTS.stockCurrentDetails)
            .fetchByStockSymbol(serchSymbol)
            .then(res => {
                addToLocalStockDetailsList({...res.data})
                dispatch(setSnackBar({
                    message: snackbarSuccessMessage,
                    open: true,
                    type: "success",
                  }))
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                dispatch(setSnackBar({
                    message: snackbarErrorMessage,
                    open: true,
                    type: "error",
                  }))
            })
    }

    const onUpdateClick = e => {
        fetchDetails(e, true)
    }

    const validate = () => {
        let temp = {}
        temp.searchSymbol = values.searchSymbol != "" ? "" : "Please enter stock symbol to search."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    return (
        <Container>
            <form noValidate onSubmit={onSymbolSubmit}>
                <Grid container sx={{mt: 2, borderBottom: 2}} spacing={2}>
                    <Grid item xl={2} lg={2} md={3} xs={12}>
                        <img
                        src={HomeLogo}
                        alt={HomeLogo}
                        loading="lazy"
                        style={{width: "100%", height: "55%"}}
                        />
                    </Grid>
                    <Grid item xl={8} lg={8} md={8} xs={12}>
                        <TextField
                            label="Search for stock Symbol"
                            name="searchSymbol"
                            placeholder="Search for stock Symbol"
                            value={values.searchSymbol}
                            onChange={handleInputChange}
                            variant="outlined"  
                            sx={{width: "100%"}}       
                            {...(errors.searchSymbol && { error: true, helperText: errors.searchSymbol })}            
                        />
                    </Grid>
                    <Grid item xl={2} lg={2} md={3} xs={12}>
                          <LoadingButton
                            type="submit"
                            size="large"
                            loading={loading}
                            loadingIndicator="Loading…"
                            variant="contained"
                            sx={{width:"90%", height: "55%"}}
                            > Search
                        </LoadingButton>
                    </Grid>
                </Grid>

                <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        
                        }}
                    >
                    {(stockDetailsList?.length) ? (
                        stockDetailsList.map((stockDetail, index) => {
                               return( <StockDetailsCard key={index}
                                     stockDetail={stockDetail}
                                     onUpdateClick={onUpdateClick}
                                     cardType="Large"
                                />)
                            
                        })
                        
                    ) : (
                        <></>
                    )}
                </Box>
            </form>
        </Container>
    )
}
