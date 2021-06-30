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
      
        
        
      
    </Fragment>
  );
};

export default AllCoinsPage;
