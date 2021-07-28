import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {GraphUp, XLg} from 'react-bootstrap-icons';


//bring in context
import WatchlistContext from "../../context/watchlist/watchlistContext";
import ChartContext from "../../context/chartwidget/chartContext";
import AuthContext from "../../context/auth/authContext";



const WatchlistItem = (props) => {
  const watchlistContext = useContext(WatchlistContext);
  const chartContext = useContext(ChartContext);
  const authContext = useContext(AuthContext);

  const {
    getCoin,
    setCoinData,
    watchlistCoins,
    cryptos,
    loading,
    watchlistDelete,
  } = watchlistContext;

  const {
    user
  } = authContext;

  const { setHomeChart} = chartContext;


  let { price, high, low, percentChange, symbol, image } = props.coinData;

  //modify the data for display purposes
  let percentColour;
  percentChange > 0
    ? (percentColour = "#4e9d66")
    : (percentColour = "#F14848");
  percentChange > 0
    ? (percentChange = percentChange.toString().slice(0, 4))
    : (percentChange = percentChange.toString().slice(1, 5));

  price = price.toString().slice(0, 7);

  let id = props.coinId.replace(
    props.coinId.charAt(0),
    props.coinId.charAt(0).toUpperCase()
  );

  //Handle setHomeChart function, only run if it is not delete button clicked
  const handleSetHomeChart = (e, symbol) => {
    if(e.target.classList.contains('delete-icon')) {
      return
    } else {
      setHomeChart(`${symbol.toUpperCase()}USD`)

    }
  }

  return (
    <>
              <div className = 'watchlist-item-container' style = {itemContainerStyle} onClick = {(e) => handleSetHomeChart(e,symbol)}>

                <div className = 'coin-id-container' style = {coinIdStyle}>
                <span className = 'watchlist-img pl-3'> <img src = {`${image}`} style = {imageStyle}></img> </span> <span className = 'pl-3' >{id}</span> <span style = {symbolStyle}><strong>{symbol.toUpperCase()}</strong></span>
                <span style = {graphStyle} className = 'icon-container'> <Link to = {`/chart/${symbol}usd`}><GraphUp className = 'graph-icon'/></Link></span>
                </div>

                <div className = 'coin-price-container' style = {infoStyle}>
                  <span >$ {price}</span>
                </div>

                <div className = 'coin-price-container' style = {infoStyle}>
                  <span >$ {high}</span>
                </div>

                <div className = 'coin-price-container' style = {infoStyle}>
                  <span style = {{color: `${percentColour}`, fontWeight:'bold'}}>{percentChange} %</span>
                </div>
              
               { user != null &&<div className = 'delete-icon-container'><span className = 'mr-4'><XLg className = 'delete-icon' style = {deleteStyle} onClick = {() => watchlistDelete(id)}/></span></div> }
              </div>
            
         </>
    
  );
};

const itemContainerStyle = {
  display: 'flex',
  height: '80px',
  borderBottom: '1px solid #F0F0F0',
  alignItems:'center',
  color: '#021E69'
}

const imageStyle = {
  height:'40px',
  width :'40px'
}

const coinIdStyle = {
  fontWeight:'450',
  flex: '2'
}

const infoStyle = {
  fontSize: '14px',
  paddingLeft : '70px',
  flex : '1'
}

const symbolStyle = {
  fontSize:'12px',
  color:'#A5A5A5',
  marginLeft :'10px'
}

const graphStyle = {
  paddingLeft:'30px',
  color:'#374FC9',
  fontSize:'18px'
}

const deleteStyle = {
  color: '#A5A5A5'
}

export default WatchlistItem;

// <div
// className="card  "
// id="watchlist-card"
// style={{
//   borderRadius: "5px",
//   backgroundColor: "#2D2D2D",
//   marginBottom: "20px",
// }}
// >
{/* <div className="card-body">
  <div className="row  mx-auto" style={{ marginBottom: "22px" }}>
    <span style={{ maxHeight: "20px", maxWidth: "20px" }}>
      <img className="img-fluid d-none d-lg-block" src={`${image}`} />
    </span>
    <span
      style={{
        fontSize: "1.3rem",
        fontWeight: "bold",
        paddingLeft: "15px",
      }}
    >
      {id}
    </span>

    <span
      className="ml-auto"
      style={{
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: percentColour,
      }}
    >
      {`${percentChange}%`}
    </span>
  </div>
  <div
    className="row w-90 mx-auto"
    style={{ fontSize: "0.8rem", borderBottom: "1px solid #5f5f5f" }}
  >
    <span className="pb-1"> Daily low:</span>
    <span className="ml-auto">$ {low}</span>
  </div>
  <div
    className="row w-90 mx-auto"
    style={{ fontSize: "0.8rem", borderBottom: "1px solid #5f5f5f" }}
  >
    <span className="pt-1 pb-1"> Daily High:</span>
    <span className="ml-auto pt-1">$ {high}</span>
  </div>
  <div className="row w-90 mx-auto" style={{ fontSize: "0.8rem" }}>
    {" "}
    <Link to="#">
      <span
        className="btn btn-outline-danger mt-3  card-btn mr-1"
        style={{
          height: "30px",
          width: "45px",
          fontSize: "0.7rem",
          color: "white",
          visibility: "hidden",
          borderWidth: "1.2px",
        }}
        onClick={() => watchlistDelete(id)}
      >
        <strong>
          <i className="fas fa-trash"></i>
        </strong>
      </span>
    </Link>
    <Link to={`/chart/${symbol}usd`}>
      <span
        className="btn btn-outline-primary mt-3  card-btn"
        style={{
          height: "30px",
          width: "70px",
          fontSize: "0.7rem",
          color: "white",
          visibility: "hidden",
          borderWidth: "1.2px",
        }}
      >
        <strong>Chart</strong>
      </span> */}

