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
        
        {allCoinsList}
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
