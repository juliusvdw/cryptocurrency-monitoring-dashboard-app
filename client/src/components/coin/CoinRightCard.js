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


        return (
            <>
            <div style = {headingStyle}> <h6>Price Change Percentage</h6></div>
            <div style = {rowStyle}><span style = {labelStyle}>24H Change</span> <span style = {percentStyle} className = 'ml-auto'> {price_change_percentage_24h}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>7D Change</span><span style = {percentStyle} className = 'ml-auto'>{price_change_percentage_7d}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>14D Change</span><span style = {percentStyle} className = 'ml-auto'>{price_change_percentage_14d}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>30D Change</span><span style = {percentStyle} className = 'ml-auto'>{price_change_percentage_30d}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>1Y Change</span> <span style = {percentStyle} className = 'ml-auto'> {price_change_percentage_1y}</span></div>

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



const percentStyle = {

}

export default CoinRightCard