import React, {useContext} from 'react';

//Bring in Context
import CoinFeedContext from '../../context/coinFeed/coinFeedContext'

const CoinMiddleCard = () => {

    const coinFeedContext = useContext(CoinFeedContext)
     const {stats} = coinFeedContext;
    

    if(stats) {

        //Destructure market data from stats for easier access
        const {market_data} = stats;
         const {
            market_cap,
            ath,
            total_volume,
            high_24h,
            low_24h,
            atl,
            market_cap_rank,
         } = market_data


        return (
            <>
            <div style = {headingStyle}> <h6>Overview</h6></div>
            <div style = {rowStyle}><span style = {labelStyle}>Market Cap Rank</span> <span style = {valueStyle} className = 'ml-auto'> # {market_cap_rank}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>Low 24H</span><span style = {valueStyle} className = 'ml-auto'>$ {low_24h.usd}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>24h High</span><span style = {valueStyle} className = 'ml-auto'>$ {high_24h.usd}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>All Time High</span><span style = {valueStyle} className = 'ml-auto'>$ {ath.usd}</span></div>
            <div style = {rowStyle}><span style = {labelStyle}>All Time Low</span><span style = {valueStyle} className = 'ml-auto'>$ {atl.usd}</span></div>
            
            </>
        )
    } else {
        return (
            
                <div className="row " style={{ marginTop: "80px", height: "200px" }}>
                  <div
                    className="spinner-border text-primary mx-auto"
                    role="status"
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
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

const valueStyle = {
    marginRight:'15px',
    color:'#021E69',
    fontWeight:'450',
    fontSize:'15px'
}


export default CoinMiddleCard;