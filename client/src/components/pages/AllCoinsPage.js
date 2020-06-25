import React, { useEffect, useContext, Fragment } from "react";

import WatchlistContext from "../../context/watchlist/watchlistContext";
import AuthContext from "../../context/auth/authContext";

import AllCoins from "../allCoins/AllCoins";

const AllCoinsPage = () => {
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);

  const { cryptos, setCryptos } = watchlistContext;
  const { getUser, user } = authContext;

  //get and set (refresh) crypto prices on the load of the page
  useEffect(() => {
    if (user === null) {
      getUser();
    }

    setCryptos();
  }, []);

  return (
    <Fragment>
      <div
        className="container-fluid pl-4 pr-4  w-100 h-90"
        id="home-container"
        style={{ marginTop: "35px", overflowY: "auto" }}
      >
        <div
          className="text-white d-none d-md-block"
          style={{ paddingLeft: "60px", paddingRight: "40px" }}
        >
          <span
            className=""
            style={{ fontSize: "1.5rem", paddingLeft: "50px" }}
          >
            <strong>Top Coins by Market Cap</strong>
          </span>
        </div>
        <div
          className="d-none d-md-block"
          style={{ paddingLeft: "130px", paddingRight: "80px" }}
        >
          <AllCoins />
        </div>
        <div className="d-block d-md-none" style={{ paddingLeft: "15px" }}>
          <span className="" style={{ fontSize: "1.3rem" }}>
            <strong>Top Coins by Mkt Cap</strong>
          </span>
          <AllCoins />
        </div>
      </div>
    </Fragment>
  );
};

export default AllCoinsPage;
