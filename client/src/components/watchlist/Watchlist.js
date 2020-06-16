import React, { Fragment, useContext, useEffect } from "react";

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
  } = watchlistContext;

  if (!loading && cryptos.length > 1 && watchlist !== undefined) {
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
        <div className="col-lg-3 col-md-5">
          <WatchListItem
            coinId={coin.id}
            coinData={{ price, high, low, percentChange, symbol, image }}
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
