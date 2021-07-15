import React, { Fragment, useContext, useEffect,useState } from "react";
import {ArrowRepeat, XLg} from 'react-bootstrap-icons';


import WatchListItem from "./WatchlistItem";


import WatchlistContext from "../../context/watchlist/watchlistContext";
import AuthContext from "../../context/auth/authContext";
import { session } from "passport";

const Watchlist = () => {
 
  //Define session storage
  const sessionStorage = window.sessionStorage;


  //Bring in context
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

    //Set session storage firstload to false after 10 secs
    setTimeout(() => {
      sessionStorage.setItem('firstload', 'false')

    },10000)

     let alertClass;

  //Determine alert class based on sessionstorage firstload
  if (sessionStorage.getItem('firstload' ) === 'false') {
    alertClass = 'd-none'
  }else {
    alertClass = 'alert-success'
  }
  
  
  
  //Create watchlist by mapping through watchlist state
  if (loading != 'watchlist' && cryptos.length > 1 && watchlist !== undefined ) {
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
        <div className="w-100 ">
          <WatchListItem
            coinId={coin.id}
            coinData={{ price, high, low, percentChange, symbol, image }}
          />
        </div>
      );
    });

    //Hide alert function onclick
    const hideAlert = () => {
      //select alert box and hide display
      const alert = document.querySelector('#alert');

      alert.style.display='none';
      
    }

    

  // Return Watchlist 
    return (
      <Fragment>
        <div >
          <div className = 'd-flex'>
            <h6 className = 'pl-3' style = {headingStyle}>Watchlist</h6>

               <span id = 'alert-span'>

                { !user && <div className = {alertClass} style = {alertStyle} id = 'alert'>Sign in to modify watchlist <XLg style = {exitStyle} id = 'alert-exit'onClick = {() => hideAlert()}/></div> }
                </span>


            <span className = 'text-right w-100'>
            
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
  height: '40px',
  position: 'absolute',
  zIndex: '999',
  right: '100px',
  borderRadius: '12px',
  padding: '15px',
  fontSize : '12px',
  marginTop:'-10px',
  width: '250px',
  display:'flex',
  alignItems:'center',
  fontWeight:'bold',
  backgroundColor:'#EAEDF7 !important',
  opacity:'0.8'
}

const exitStyle = {
 position: 'absolute',
 right:'10px'
}



export default Watchlist;
