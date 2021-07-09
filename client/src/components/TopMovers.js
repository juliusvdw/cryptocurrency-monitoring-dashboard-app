import React, { Fragment, useContext, useEffect } from "react";
import {ArrowRepeat} from 'react-bootstrap-icons';


import WatchlistContext from "../context/watchlist/watchlistContext";


const Watchlist = () => {
  const watchlistContext = useContext(WatchlistContext);
  const {
    watchlistCoins,
    setCoinData,
    getCoin,
    cryptos,
    loading,
    setCryptos
  } = watchlistContext;

  //Create the top movers list by sorting cryptos by price change percentage.
  if (loading != 'topmovers' && cryptos.length > 1) {
    const topMoversList = cryptos.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );

    let finalList = [];

    //Push the top 8 movers to the topMoversList
    for (let i = 0; i < 8; i++) {

      let id = topMoversList[i].id;
      id = id.replace(id.charAt(0), id.charAt(0).toUpperCase());
      const symbol = topMoversList[i].symbol;
      const percentChange = topMoversList[i].price_change_percentage_24h;
      const image = topMoversList[i].image;

      finalList.push({ id, percentChange, symbol, image });
    }

    //Map the finalList and output the formatted data
    const outputList = finalList.map((coin) => {
      return (
        <div className="topmovers-item-container" style = {itemStyle}> 
         
            <div className="mt-2" style = {idStyle}>
              <span className="pt-2 pl-2"> <img  src = {`${coin.image}`} style = {imageStyle} /></span>
              <span className=" pl-3 pt-2 ">{coin.id}</span>
              <span style = {symbolStyle}>
                <span><strong>{coin.symbol.toUpperCase()}</strong> </span>
              </span>
            </div>
            <span className="pt-2 " style={percentStyle}>
              {coin.percentChange.toString().slice(0, 5)}%
            </span>
          
        </div>
      );
    });
    return (
      <div >
        <div className = 'd-flex'>
           <h6 style = {headingStyle} className = 'pl-2'>Top Movers</h6>
            <span className = 'text-right w-100'><ArrowRepeat style = {refreshStyle} className = 'refresh-icon' onClick = {() => setCryptos('topmovers')}/> </span>

        </div>
        {outputList}
      </div>
    );
  } else {
    return (
      <div className="row " style={{ marginTop: "100px" }}>
        <div
          className="spinner-border text-primary mx-auto"
          role="status"
          style={{ width: "3.5rem", height: "3.5rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

const itemStyle = {
  display: 'flex',
  height: '80px',
  borderBottom: '1px solid #F0F0F0',
  alignItems:'center',
  color: '#021E69'
}

const idStyle = {
  flex:'2',
  fontWeight: '450'
}

const symbolStyle = {
  fontSize:'12px',
  marginLeft:'10px',
  color:'#A5A5A5'
}

const percentStyle = {
  color:'#4e9d66',
  flex:'1',
  textAlign:'right',
  fontWeight:'bold',
  fontSize:'14px'
}

const imageStyle = {
  height:'30px',
  width :'30px'
}

const headingStyle = {
  color:'#021E69',
  marginBottom : '0px',
  minWidth:'250px',
}

const refreshStyle = {
  marginLeft:'auto',
  color:'#374FC9',
  fontSize:'20px',
  
}

export default Watchlist;
