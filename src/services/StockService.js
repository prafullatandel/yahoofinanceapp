import { createAPIEndpoint, ENDPOINTS, FetchAsyncData } from '../api';

const GetDefaultDateListForLastYear = async (startDate, endDate) => {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
    while (currentDate <= endDate) {
        dates.push({date : currentDate })
        currentDate = addDays.call(currentDate, 1)
    }
    return dates
}


function formatToLocalDate(inputDate) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }

export const FormatStockHistoricalDataForLineChart = async (historicDataList, stockDetails) => {
    if(!historicDataList || !historicDataList?.length) {
        var startDate = (new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
        var endDate = new Date()
        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        historicDataList = await GetDefaultDateListForLastYear(startDate, endDate)
    }
    if(historicDataList?.length) {
        if(stockDetails && stockDetails?.historicalData?.length) {
            var chartData = await Promise.all( historicDataList.map((record) => {
                var hdRecord = stockDetails?.historicalData.find(i => (new Date(i.date)).toLocaleDateString() == record.date.toLocaleDateString())
                var newProp = stockDetails.symbol
                return hdRecord ? ({...record, displayDate: formatToLocalDate(record.date),[newProp] : hdRecord.close }) : {...record, displayDate: formatToLocalDate(record.date), [newProp] : null};

            })
            ).then(r => r)

            chartData = chartData.filter((value) => value != null);
            
            return chartData
        }
    }    
}

export const PrepareHistoricalChartData = async (stockSymbol) => {
    return await FetchStockHistoricalData(stockSymbol);
}


export  const FetchStockHistoricalData = async (stockSymbol) => {
    try {
         var res = await FetchAsyncData(ENDPOINTS.stockHistoricalData, stockSymbol)
         if(res && res.status === 200) {
             return res.data;
         } else {
             return "error";
         }
                
    } catch (error) {
      return "error";   
    }    
}

export const CreateStockDetails = async (stockSymbol, stockName) => {
    try {
        var newRecord = {
            "Symbol": stockSymbol,
            "Name": stockName
          }
        var res = await createAPIEndpoint(ENDPOINTS.stockDetails)
                            .post(newRecord);
                            
        if(res && res.status === 200) {
            return res.data;
        } else {
            return "error";
        }
               
   } catch (error) {
     return "error";   
   }   
}