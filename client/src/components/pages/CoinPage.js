import React, { useEffect, useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";

import AutchContext from "../../context/auth/authContext";
import CoinFeedContext from "../../context/coinFeed/coinFeedContext";
import WatchlistContext from "../../context/watchlist/watchlistContext";

const CoinPage = (props) => {
  const authContext = useContext(AutchContext);
  const coinFeedContext = useContext(CoinFeedContext);
  const watchlistContext = useContext(WatchlistContext);

  const { user, getUser } = authContext;
  const { getCoinFeed } = coinFeedContext;
  const { cryptos } = watchlistContext;

  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      getUser();
    }

    getCoinFeed(props.match.params.id);
  }, []);

  //Access the current coin from the cryptos array
  const coinIndex = cryptos.findIndex((coin) => {
    const currentCoin = props.match.params.id;
    return coin.id === currentCoin.toLowerCase();
  });

  const currentCoin = cryptos[coinIndex];
  console.log(currentCoin);

  //modify coinData to be displayed

  return (
    <div
      className="container-fluid pl-4 pr-4  w-100 h-90"
      id="home-container"
      style={{ marginTop: "35px", overflowY: "auto" }}
    >
      <div
        className="text-white d-none d-md-block"
        style={{
          paddingLeft: "30px",
          paddingRight: "40px",
          marginTop: "30px",
        }}
      >
        <div className="row">
          <div className="col-lg-5 offset-lg-1 d-flex flex-row">
            {currentCoin && (
              <>
                <img
                  className="img-fluid"
                  src={`${currentCoin.image}`}
                  style={{ maxHeight: "150px", maxWidth: "150px" }}
                />

                <div className="my-auto pl-4">
                  <h1 style={{ fontSize: "3.5rem" }} className="mb-0">
                    {currentCoin.id}
                  </h1>
                  <div className="d-flex flex-row">
                    <h1 style={{ fontSize: "2.5rem" }} className="pt-1">
                      $ {currentCoin.current_price}
                    </h1>
                    <span
                      className="my-auto pl-4"
                      style={{ fontSize: "2.5rem" }}
                    >
                      {currentCoin.price_change_percentage_24h}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-lg-5 "></div>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
