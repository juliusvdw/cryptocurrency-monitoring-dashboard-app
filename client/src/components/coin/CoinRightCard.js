import React, {useContext} from 'react'

import CoinFeedContext from '../../context/coinFeed/coinFeedContext';

const CoinRightCard = () => {

    const coinFeedContext = useContext(CoinFeedContext)
    const {stats} = coinFeedContext;

    if(stats) {

        //Destructure market data from stats for easier access
        const {market_data} = stats;
         const {
            price_change_percentage_1y,
            price_change_percentage_24h,
            price_change_percentage_1h,
            price_change_percentage_7d,
            price_change_percentage_14d,
            price_change_percentage_30d
         } = market_data

         //Rename variables for easier access
         const oneYearChange =  price_change_percentage_1y,
               dailyChange = price_change_percentage_24h,
               weeklyChange = price_change_percentage_7d,
               twoWeekChange = price_change_percentage_14d,
               monthlyChange = price_change_percentage_30d

         //Classify classes to determine the color of the percentage displayed
         const styleUp = {
             color:'green',
             fontSize:'15px',
             fontWeight:'450'
         }
         const styleDown = {
             color:'red',
             fontSize:'15px',
             fontWeight:'450'
         }
         


        return (
            <>
            <div style = {headingStyle}> <h6>Price Change Percentage</h6></div>
            <div style = {rowStyle}><span style = {labelStyle}>24H Change</span> <span style = {dailyChange > 0 ? styleUp : styleDown} className = 'ml-auto'> {dailyChange.toString().slice(0,5)} %</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>7D Change</span><span style = {weeklyChange > 0 ? styleUp : styleDown} className = 'ml-auto'>{weeklyChange.toString().slice(0,5)} %</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>14D Change</span><span style = {twoWeekChange > 0 ? styleUp : styleDown} className = 'ml-auto'>{twoWeekChange.toString().slice(0,5)} %</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>30D Change</span><span style = {monthlyChange > 0 ? styleUp : styleDown} className = 'ml-auto'>{monthlyChange.toString().slice(0,5)} %</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>1Y Change</span> <span style = {oneYearChange > 0 ? styleUp : styleDown} className = 'ml-auto'> {oneYearChange.toString().slice(0,5)} %</span></div>

            </>
        )
    } else {
        return (
            <> 
            Loading
            </>
        )
    }
}

const headingStyle = {
    marginTop:'10px',
    marginBottom:'15px',
    color : '#021e69',
    fontWeight:'450',
    fontSize:'15px'
   }
   
   const rowStyle = {
       height:'47px',
       borderBottom: '1px solid #F0F0F0',
       display :'flex',
       alignItems:'center'
   
   }
   
   const labelStyle = {
       color : '#021e69',
       fontSize: ' 14px',
       opacity:'0.7'
   }




export default CoinRightCard