import React, { Fragment, useContext, useEffect } from "react";

import WatchlistContext from "../context/watchlist/watchlistContext";

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
    const topMoversList = cryptos.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );

    let finalList = [];

    for (let i = 0; i < 8; i++) {
      let id = topMoversList[i].id;
      id = id.replace(id.charAt(0), id.charAt(0).toUpperCase());
      const symbol = topMoversList[i].symbol;
      const percentChange = topMoversList[i].price_change_percentage_24h;

      finalList.push({ id, percentChange, symbol });
    }

    const outputList = finalList.map((coin) => {
      return (
        <div className="col-lg-3 col-md-6 ">
          <div
            className="card d-flex flex-row  mb-2 pr-4 pl-4 movers-card "
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              minHeight: "45px",
              borderRadius: "5px",
              backgroundColor: "#2D2D2D",
            }}
          >
            <div className="mt-2">
              <span className="pt-2 ">{coin.id}</span>
              <p style={{ fontSize: "0.65rem", fontWeight: "normal" }}>
                {coin.symbol.toUpperCase()}
              </p>
            </div>
            <span className="ml-auto pt-2" style={{ color: "lightgreen" }}>
              {coin.percentChange.toString().slice(0, 5)}%
            </span>
          </div>
        </div>
      );
    });
    return (
      <div className="row" style={{ marginTop: "30px" }}>
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

export default Watchlist;
