import { 
    Card, 
    CardHeader,
    CardContent, 
    Typography, 
    Box, 
    Tooltip,
    IconButton, } from '@mui/material';
import React, {useEffect} from 'react'
import UpdateIcon from '@mui/icons-material/Update';
import AddchartIcon from '@mui/icons-material/Addchart';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useSelector, useDispatch } from 'react-redux'
import { addToStockCompareList, deleteFromStockCompareList } from '../reducerSlice/StockDataSlice'
import {PrepareHistoricalChartData, CreateStockDetails} from '../services/StockService';
import { setSnackBar } from '../reducerSlice/SnackbarSlice'

import "../styles/stockDetailsCard.css"


export default function StockDetailsCard(params) {
    const {stockDetail, onUpdateClick, cardType} = params;
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const reduxStockCompareList = useSelector((state) => state.stockData.chartCompareList)

    const StockPropertiesToDisplay = {
        "regularMarketPreviousClose" : "Previous Close",
        "regularMarketOpen" : "Open",
        "regularMarketDayLow": "Low",
        "regularMarketDayHigh": "High",
        "regularMarketPrice" : "Price",
        "regularMarketVolume" : "Volume",
        "regularMarketChange" : "Change",
        "regularMarketChangePercent" : "Change Percentage"
    }

    const ConditionalTextColourClass = ["regularMarketChange", "regularMarketChangePercent"];

    const onAddToCompareClick = async(stockSymbol, longName) => {
        dispatch(addToStockCompareList(stockSymbol))

        CreateStockDetails(stockSymbol, longName).then(async (res) => {
            await PrepareHistoricalChartData(stockSymbol).then(() =>{
                dispatch(setSnackBar({
                    message: stockSymbol +" Stock Historical Data fetched and ready for Comparision.",
                    open: true,
                    type: "success",
                  }))
            })
        })
    }

    const onRemoveFromCompareClick = (stockSymbol) => {
        dispatch(deleteFromStockCompareList(stockSymbol))
        dispatch(setSnackBar({
            message: stockSymbol + " Stock Removed from Charts for comparision.",
            open: true,
            type: "success",
          }))
    }

    useEffect(() => {
        
    }, [reduxStockCompareList])

    return (
        <React.Fragment>
        {(cardType == "Large") ? (
            <Card sx={{ width: 300, m:2 }}>
                <CardHeader
                    sx={{minHeight: "120px", backgroundColor: "lightBlue"}}
                    action={
                        <Box sx={{width: "50px", }}>
                        <Tooltip title="Update">
                        <IconButton 
                            aria-label="Update" 
                            onClick={() => {
                                onUpdateClick(stockDetail.symbol);
                            }}>
                        <UpdateIcon  />
                        </IconButton>
                        </Tooltip>

                        {reduxStockCompareList.includes(stockDetail.symbol) ? (
                            <Tooltip title="Remove From Compare">
                            <IconButton 
                                aria-label="Remove From Chart" 
                                onClick={() => {
                                    onRemoveFromCompareClick(stockDetail.symbol);
                                }}>
                            <CancelPresentationIcon  />
                            </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Add To Compare">
                            <IconButton 
                                aria-label="Chart" 
                                onClick={() => {
                                    onAddToCompareClick(stockDetail.symbol, stockDetail?.longName);
                                }}>
                            <AddchartIcon  />
                            </IconButton>
                            </Tooltip>
                            )
                        } 

                        
                        </Box>
                    }
                    title={(stockDetail?.longName ? stockDetail?.longName : "N/A")}
                    titleTypographyProps={{variant:'h6' }}
                    subheader={(new Date()).toDateString()}
                />
                <CardContent sx={{mt: "0px",pt: "0px"}}>
                    {(Object.entries(StockPropertiesToDisplay).map((item, index) => {
                            return (<Box
                                key={index}
                                sx={{ display: 'flex',mt:1, bgcolor: 'background.paper',borderBottom: 1, borderColor: "lightgray" }}
                            >
                                <Box sx={{ flexGrow: 1,fontWeight: 'medium'}}>{item[1]} :</Box>
                                {/* <Box sx={{fontWeight: 'bold'}}>{stockDetail[item[0]]}</Box> */}
                                <Box>
                                    <Typography 
                                        className={(ConditionalTextColourClass.includes(item[0]) ? (
                                            (stockDetail[item[0]] && parseFloat(stockDetail[item[0]]) > 0) ? 
                                            "green-text" : "red-text"
                                        ) : "")}
                                        sx={{fontWeight: 'bold'}}
                                        >
                                        {stockDetail[item[0]]}
                                    </Typography>
                                </Box>
                            </Box>)
                    })
                    )}
                </CardContent>
            </Card>
        ) : (
            <Card sx={{ width: '95%', m:1, pt:0 }}>
                <CardHeader
                    sx={{minHeight: "60px", backgroundColor: "lightBlue", pt:0, pb:0}}
                    action={
                        <Box sx={{width:"30px"}}>
                            <IconButton 
                                title="update"
                                aria-label="Update" 
                                onClick={() => {
                                    onUpdateClick(stockDetail.symbol);
                                }}>
                                <UpdateIcon  />
                            </IconButton>
                            {reduxStockCompareList.includes(stockDetail.symbol) ? (
                                <Tooltip title="Remove From Compare">
                                <IconButton 
                                    aria-label="Remove From Chart" 
                                    onClick={() => {
                                        onRemoveFromCompareClick(stockDetail.symbol);
                                    }}>
                                <CancelPresentationIcon  />
                                </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Add To Compare">
                                <IconButton 
                                    aria-label="Chart" 
                                    onClick={() => {
                                        onAddToCompareClick(stockDetail.symbol, stockDetail?.longName);
                                    }}>
                                <AddchartIcon  />
                                </IconButton>
                                </Tooltip>
                                )
                            } 
                        </Box>
                        
                    }
                    titleTypographyProps={{variant:'h6' }}
                    title={(stockDetail?.longName)}
                    subheader= {stockDetail?.symbol}
                    subheaderTypographyProps={{fontSize: "16px" }}
                />
                <CardContent sx={{mt: 0,pt: 0, paddingBottom:"px", display: "flex"}}  style={{paddingBottom: "0px"}}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography sx={{fontSize: '14px', fontWeight: "bold", m:0, pt:1}}  className={
                                            (stockDetail?.regularMarketChange && parseFloat(stockDetail?.regularMarketChange) > 0) ? 
                                            "green-text" : "red-text"
                                        }>
                                Price : {stockDetail.regularMarketPrice} 
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{fontSize: '14px', fontWeight: "bold", m:0, pt:1}}>
                               Volume : {stockDetail.regularMarketVolume}
                            </Typography>
                        </Box>
                    
                </CardContent>
            </Card>
        )}
        </React.Fragment>
    )
}
