import React, {useState, useEffect} from 'react'
import { LineChart, Line,  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
    Box, 
    Paper, 
    Grid,
 } from '@mui/material';
import Center from '../components/Center';
import {FetchStockHistoricalData, FormatStockHistoricalDataForLineChart} from '../services/StockService';
import { useSelector, useDispatch } from 'react-redux'
import StockDetailsCard from './StockDetailsCard';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { addToStockDetailsList } from '../reducerSlice/StockDataSlice'
import MaskLoader from '../components/loaders/MaskLoader'

const FecthData = async (compareStockSymbolList, setLoading) => {
    setLoading(true);
   var data =  await Promise.all(compareStockSymbolList.map((stockSymbol) => {
        return FetchStockHistoricalData(stockSymbol).then(async (hdata) => {
                var newData = await FormatStockHistoricalDataForLineChart(null, hdata);
                return newData;
            })
    })).then(r => r)

    var finalData = []
    if(data && data?.length) {
        var i =0;
        var j =0;
        finalData = [...data[0]]
        for (i=1; i<data.length; i++) {
            for (j=0; j<data[i].length; j++) {
                finalData[j] = {...finalData[j], ...data[i][j]}
            }
        }
        setLoading(false);
        return finalData;
    } else {
        setLoading(false);
    }
};

function Charts() {
    const [stockHistoricalDataList, setStockHistoricalDataList]  = useState([])
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const reduxStockCompareList = useSelector((state) => state.stockData.chartCompareList)
    const reduxStockDetailsList = useSelector((state) => state.stockData.stockDetailsList)

    useEffect(() => {
        FecthData(reduxStockCompareList, setLoading).then((result) => {
            setStockHistoricalDataList(result);
        });        
    }, [reduxStockCompareList])

   

      function RandomLineColour() {
       var color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        return color;
      }

      const onUpdateClick = serchSymbol => {
        createAPIEndpoint(ENDPOINTS.stockCurrentDetails)
            .fetchByStockSymbol(serchSymbol)
            .then(res => {
                dispatch(addToStockDetailsList({...res.data}))
            })
            .catch(error => {
                // console.log(error)
            })
    }

    return (
            <React.Fragment>
                {(loading) && (
                    <MaskLoader/>
                )}
                <Grid container sx={{mt:5}}>
                    <Grid item xl={3} lg={3} md={3} xs={3}  spacing={1} sx={{ overflowY: "auto", overflowX : "hidden", maxHeight: "650px" }}>
                        
                        {(reduxStockDetailsList?.length) ? (
                            reduxStockDetailsList.map((stockDetails, index) => {
                            return (<StockDetailsCard key={index}
                                stockDetail={stockDetails}
                                onUpdateClick={onUpdateClick}
                                cardType="small"
                        />)
                            })
                        ) : (<></>)}
                        
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} xs={9} sx={{p:1}}>
                        <Paper sx={{width: "850px", height: "600px"}} elevation={5}>
                            {(stockHistoricalDataList && stockHistoricalDataList?.length) ? (
                                <ResponsiveContainer width='100%'>
                                    <LineChart data={stockHistoricalDataList}>
                                        { reduxStockCompareList.map((stockSymbol, index) =>{
                                            return <Line connectNulls type="monotone" dataKey={stockSymbol} stroke={RandomLineColour()} dot={false} /> 
                                        })}
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                                        <XAxis dataKey="displayDate" /> 
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : ("")}
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>    
    )
}

export default Charts