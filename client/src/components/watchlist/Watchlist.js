import React, { Fragment, useContext, useEffect } from "react";
import {ArrowRepeat} from 'react-bootstrap-icons';


import WatchListItem from "./WatchlistItem";


import WatchlistContext from "../../context/watchlist/watchlistContext";
import AuthContext from "../../context/auth/authContext";

const Watchlist = () => {
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const {
    watchlist,
    setCoinData,
    getCoin,
    cryptos, 
    loading,
    getWatchlist,
    setCryptos,
  } = watchlistContext;

  if (loading != 'watchlist' && cryptos.length > 1 && watchlist !== undefined) {
    //Map watchlist state to create watchlist list with watchlistItems
    const watchList = watchlist.map((coin) => {
      //find index of this coin we will be accessing
      const index = cryptos.findIndex((crypto) => crypto.id === coin.id);

      //pull data for specific coin from cryptos array
      let price = cryptos[index].current_price;
      let high = cryptos[index].high_24h;
      let low = cryptos[index].low_24h;
      let percentChange = cryptos[index].price_change_percentage_24h;
      let symbol = cryptos[index].symbol;
      let image = cryptos[index].image;
      return (
        <div className="w-100 mt-2">
          <WatchListItem
            coinId={coin.id}
            coinData={{ price, high, low, percentChange, symbol, image }}
          />
        </div>
      );
    });

  // Return Watchlist 
    return (
      <Fragment>
        <div >
          <div className = 'd-flex'>
            <h6 className = 'pl-3' style = {headingStyle}>Watchlist</h6>
            <span className = 'text-right w-100'>
            { !user && <div className = 'alert-success ' style = {alertStyle}>Sign in to modify watchlist</div> }
              <ArrowRepeat style = {refreshStyle} className = 'refresh-icon' onClick = {() => setCryptos('watchlist')}/> </span>
             
              </div>

          {watchList}
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="row " style={{ marginTop: "120px", height: "250px" }}>
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

const headingStyle = {
  color:'#021E69',
  marginBottom : '0px'
}


const refreshStyle = {
  marginLeft:'auto',
  color:'#374FC9',
  fontSize:'20px'
}

const alertStyle = {
  margin: '0px auto',
  textAlign: 'left',
  height: '35px',
  position: 'absolute',
  zIndex: '999',
  marginLeft: '40px',
  borderRadius: '12px',
  padding: '10px',
  fontSize : '12px',
  marginTop:'-10px',
  width: '250px',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontWeight:'bold',
  backgroundColor:'#EAEDF7 !important',
  opacity:'0.8'
}



export default Watchlist;
