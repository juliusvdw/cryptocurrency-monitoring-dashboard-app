import React, { useEffect, useContext, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import TradingViewWidget, { Themes, BarStyles, } from "react-tradingview-widget";


import AutchContext from "../../context/auth/authContext";
import CoinFeedContext from "../../context/coinFeed/coinFeedContext";
import WatchlistContext from "../../context/watchlist/watchlistContext";

import CoinLeftCard from "../coin/CoinLeftCard";
import CoinMiddleCard from "../coin/CoinMiddleCard";
import CoinRightCard from "../coin/CoinRightCard";

const CoinPage = (props) => {
  const authContext = useContext(AutchContext);
  const coinFeedContext = useContext(CoinFeedContext);
  const watchlistContext = useContext(WatchlistContext);

  const { user, getUser } = authContext;
  const { getCoinFeed } = coinFeedContext;
  const { cryptos, watchlistAdd } = watchlistContext;

  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      getUser();
    }
    //Make the coin id lower case then fetch data
    const id = props.match.params.id;
    getCoinFeed(id.toLowerCase());
  }, []);

  //Access the current coin from the cryptos array
  const coinIndex = cryptos.findIndex((coin) => {
    const currentCoin = props.match.params.id;
    return coin.id === currentCoin.toLowerCase();
  });

  const currentCoin = cryptos[coinIndex];

  //declare variables to use once currentCoin has loaded

  let percentColour;
  let percentChange;
  let price;
  let id;
  let symbol;
  let image;

  //modify the data for display purposes if currentCoin has loaded

  if (currentCoin !== undefined) {
    price = currentCoin.current_price;
    percentChange = currentCoin.price_change_percentage_24h;
    id = currentCoin.id;
    symbol = currentCoin.symbol;
    image = currentCoin.image;

    //Replace first id letter with capital
    id = id.replace(id.charAt(0), id.charAt(0).toUpperCase())

    percentChange > 0
      ? (percentColour = "lightgreen")
      : (percentColour = "#F14848");

    percentChange > 0
      ? (percentChange = percentChange.toString().slice(0, 4))
      : (percentChange = percentChange.toString().slice(1, 5));

    price.toString().length === 1
      ? (price = `${price},00`)
      : (price = price.toString().slice(0, 7));
  }

  return (
    <div className = 'container-fluid '>

    <div className = 'row coin-top-cards-row px-4 py-3'>
      <div className = 'col-lg-4 col-md-6'>
        <div className = 'coin-top-card' style = {topCardStyle}>
          <CoinLeftCard />
        </div>
      </div>
      <div className = 'col-lg-4 col-md-6'>
        <div className = 'coin-top-card' style = {topCardStyle}>
          <CoinMiddleCard />
        </div>

      </div>
     
      <div className = 'col-lg-4'>
      <div className = 'coin-top-card coin-percent-card' style = {topCardStyle}>
        <CoinRightCard />

        </div>
         </div>

    </div>

    <div className = 'row home-botttom-chart-row'>
      <div className = 'col-lg-12'>
        <div className = 'coin-bottom-card' style = {bottomCardStyle}>
        <TradingViewWidget
          symbol={`${symbol}usd`}
          theme={Themes.LIGHT}
          locale="en"
          style = {BarStyles.AREA}
          autosize
    />
        </div>
      </div>
    </div>
  </div>

  );
};

const topCardStyle = {
  height: '350px',
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '30px',
  overflowY : 'auto',
}

const bottomCardStyle = {
  backgroundColor:'white',
  borderRadius:'15px',
  height:'370px',
  marginRight: '25px',
  marginLeft:'25px'

}







export default CoinPage;

{/* <div
      className="container-fluid pl-4 pr-4  w-100 h-90"
      id="home-container"
      style={{ marginTop: "35px", overflowY: "auto" }}
    >
      <div
        className="text-white "
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          marginTop: "30px",
        }}
      >
        <div className="row">
          <div className="col-lg-6 offset-md-1 d-flex flex-row">
            {currentCoin && (
              <>
                <img
                  className="img-fluid d-none d-md-block"
                  src={currentCoin && `${currentCoin.image}`}
                  style={{ maxHeight: "100px", maxWidth: "150px" }}
                />

                <div className="my-auto pl-4">
                  <p style={{ fontSize: "2.5rem" }} className="mb-0">
                    {id.replace(id.charAt(0), id.charAt(0).toUpperCase())}
                  </p>
                  <div className="d-flex flex-row">
                    <h1 style={{ fontSize: "1.5rem" }} className="pt-1">
                      $ {price}
                    </h1>
                    <span
                      className="my-auto pl-4"
                      style={{ fontSize: "1.5rem", color: percentColour }}
                    >
                      <strong>{percentChange} % </strong>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-lg-5 offset-md-1 d-flex flex-row">
            <div className=" mt-4">
              {user && (
                <div
                  className="btn btn-outline-success mx-2 text-white"
                  style={{ fontSize: "13.5px" }}
                  onClick={() => watchlistAdd(id)}
                >
                  <strong> Add To Watchlist</strong>
                </div>
              )}
              <Link to={`/chart/${symbol}usd`}>
                <div
                  className="btn btn-outline-primary mx-2 text-white"
                  style={{ fontSize: "13.5px" }}
                >
                  <strong>View Chart</strong>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row text-white " style={{ marginTop: "30px" }}>
          <div className="col-lg-9 col-md-8 col-sm-12 offset-md-1 ">
            <CoinStats className="mx-auto" />
          </div>
        </div>
        <div className="row text-white " style={{ marginTop: "5px" }}>
          <div className="col-lg-9 col-md-8  col-sm-12 offset-md-1 ">
            <CoinInfo />
          </div>
        </div>
      </div>
    </div> */}
