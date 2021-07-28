import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import {GraphUp, PlusCircle, ArrowUpShort, ArrowDownShort} from 'react-bootstrap-icons';

import CoinFeedContext from "../../context/coinFeed/coinFeedContext";
import AuthContext from "../../context/auth/authContext";
import WatchlistContext from "../../context/watchlist/watchlistContext";

const CoinStats = () => {

  //Bring in auth context to determine user
  const authContext = useContext(AuthContext);
  const {user} = authContext;

  //Bring in watchlist context to add coin to watchlist
  const watchlistContext = useContext(WatchlistContext);
  const {watchlistAdd} = watchlistContext;

  //Bring in coin stats from coinfeed context
  const coinFeedContext = useContext(CoinFeedContext);
  const { stats } = coinFeedContext;

  //Declare output var to store what will be output
  let statsOutput;

  //Determine wheter the stats or loading will be displayed based on the state of coin stats
  if (!stats) {
    statsOutput = (
      <div className="row " style={{ marginTop: "80px", height: "200px" }}>
        <div
          className="spinner-border text-primary mx-auto"
          role="status"
          style={{ width: "3.5rem", height: "3.5rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {

    //Destructure coin data from stats context for easier access
    const { market_data } = stats;
    const {
      current_price, 
    } = market_data;

    let percentChange = market_data.price_change_percentage_24h_in_currency.usd;

   const {
     symbol,
     id
   } = stats;

   const image = stats.image.small;

   

   //Determine which arrow to display based on price change percentage 
  let arrow; 
  percentChange > 0 
  ? arrow = <ArrowUpShort />
  : arrow = <ArrowDownShort />

    //modify the data for display purposes, percentColor + price length
  let percentColour;
  percentChange > 0
    ? (percentColour = "#4e9d66")
    : (percentColour = "#F14848");
  percentChange > 0
    ? (percentChange = percentChange.toString().slice(0, 4))
    : (percentChange = percentChange.toString().slice(1, 5));

  const price = current_price.usd.toString().slice(0, 7);

  

    //Output content if coin stats have loaded
    statsOutput = (
      <>
       <div  style = {topRowStyle}>
            <img src = {`${image}`} style = {imageStyle} />
            <span className = 'pl-3' style = {mainTextStyle}>{id.replace(id.charAt(0), id.charAt(0).toUpperCase())}</span>
            <span className = 'mt-1' style = {symbolStyle}>{`(${symbol.toUpperCase()})`}</span>

            <span className = 'ml-4' style = {graphIconStyle}><Link to = {`/chart/${symbol}usd`}><GraphUp className = 'icon'/> </ Link></span>
           { user != null && <span className = 'ml-auto' style = {addIconStyle}><PlusCircle className = 'icon' onClick = {() => watchlistAdd(id)}/></span>}
      </div>

      <div style = {priceBoxStyle}>
         <div style = {priceStyle} >$ {price}</div>
         <div style = {{ color: percentColour}}  className = 'mt-3'><span style = {arrowStyle}>{arrow}</span> {percentChange} %</div>
      </div>
      </>
    );
  }

  return (
    <div>
      {statsOutput}
    </div>
  );
};

const topRowStyle = {
  display:'flex',
  alignItems:'center'
}

const imageStyle = {
  height:'45px',
  width:'45px'
}

const symbolStyle = {
  fontSize:'12px',
  color:'#A5A5A5',
  marginLeft :'10px',
  fontWeight:'bold'
}

const mainTextStyle = {
  color:'#021E69',
  fontSize:'22px',
  fontWeight:'450'
}

const priceStyle = {
  textAlign:'center',
  color:'#021E69'
}

const priceBoxStyle = {
  height:'200px',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
  marginTop:'20px',
  fontSize:'46px',
  fontWeight: '450'
}

const graphIconStyle = {
  color:'#374FC9',
  fontSize:'18px'
}

const addIconStyle = {
  color:'#374FC9',
  fontSize:'18px'
}

const arrowStyle = {
  fontSize:'42px'
}




export default CoinStats;


{/* <div className = 'd-flex ' style = {cardFlexRow}>
            <img src = {`${image}`} style = {imageStyle} />
            <span className = 'pl-3' style = {cardMainText}>{id}</span>
            <span className = 'mt-1' style = {symbolStyle}>{`(${symbol.toUpperCase()})`}</span>
          </div> */}