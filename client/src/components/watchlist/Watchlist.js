import React, { Fragment, useContext, useEffect } from "react";

import WatchListItem from "./WatchlistItem";

import WatchlistContext from "../../context/watchlist/watchlistContext";

const Watchlist = () => {
  const watchlistContext = useContext(WatchlistContext);
  const {
    watchlistCoins,
    setCoinData,
    getCoin,
    cryptos,
    loading,
  } = watchlistContext;

  if (!loading && cryptos.length > 1) {
    //Map watchlist state to create watchlist list with watchlistItems
    const watchList = watchlistCoins.map((coin) => {
      //find index of this coin we will be accessing
      const index = cryptos.findIndex((crypto) => crypto.id === coin.id);

      //pull data for specific coin from cryptos array
      let price = cryptos[index].current_price;
      let high = cryptos[index].high_24h;
      let low = cryptos[index].low_24h;
      let percentChange = cryptos[index].price_change_percentage_24h;
      let symbol = cryptos[index].symbol;
      return (
        <div className="col-lg-3 col-md-5">
          <WatchListItem
            coinId={coin.id}
            coinData={{ price, high, low, percentChange, symbol }}
          />
        </div>
      );
    });

    return (
      <Fragment>
        <div className="row " style={{ marginTop: "30px" }}>
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

export default Watchlist;
