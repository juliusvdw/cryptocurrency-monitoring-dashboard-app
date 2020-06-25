import React, { useContext } from "react";

import WatchlistContext from "../../context/watchlist/watchlistContext";

import AllCoinsItem from "./AllCoinsItem";

const AllCoins = () => {
  const watchlistContext = useContext(WatchlistContext);
  const { loading, cryptos } = watchlistContext;

  //conditionally return either Allcoins or Loading
  if (!loading && cryptos.length > 1) {
    //create Allcoins list by mapping AllCOinsItems
    const allCoinsList = cryptos.map((coin) => {
      return <AllCoinsItem coin={coin} />;
    });

    return (
      <>
        <div
          className="row"
          style={{
            borderBottom: "1px solid #555555",
            height: "60px",
            marginTop: "30px",
          }}
        >
          <div className="col-lg-3 col-md-4">
            <p className="pt-4 pl-3">Coin</p>
          </div>

          <div className="col-lg-2 col-md-3 d-none d-md-block">
            <p className="pt-4">Price</p>
          </div>

          <div className="col-lg-1 col-md-2 d-none d-md-block">
            <p className="pt-4">24h</p>
          </div>

          <div className="col-lg-3 col-md-2 d-none d-lg-block">
            <p className="pt-4"> Volume</p>
          </div>

          <div className="col-lg-3 col-md-2 d-none d-lg-block">
            <p className="pt-4">Mkt Cap</p>
          </div>
        </div>
        <div className="row">{allCoinsList}</div>{" "}
      </>
    );
  } else {
    return (
      <div className="row " style={{ marginTop: "200px", height: "250px" }}>
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

export default AllCoins;
