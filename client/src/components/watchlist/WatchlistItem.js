import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//bring in context
import WatchlistContext from "../../context/watchlist/watchlistContext";

const WatchlistItem = (props) => {
  const watchlistContext = useContext(WatchlistContext);
  const {
    getCoin,
    setCoinData,
    watchlistCoins,
    cryptos,
    loading,
  } = watchlistContext;

  let { price, high, low, percentChange, symbol } = props.coinData;

  //modify the data for display purposes
  let percentColour;
  percentChange > 0
    ? (percentColour = "lightgreen")
    : (percentColour = "#F14848");
  percentChange > 0
    ? (percentChange = percentChange.toString().slice(0, 4))
    : (percentChange = percentChange.toString().slice(1, 5));

  price = price.toString().slice(0, 7);

  let id = props.coinId.replace(
    props.coinId.charAt(0),
    props.coinId.charAt(0).toUpperCase()
  );

  console.log(cryptos[0]);

  return (
    <Link
      to={`/coin/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="card  "
        id="watchlist-card"
        style={{
          borderRadius: "5px",
          backgroundColor: "#2D2D2D",
          marginBottom: "20px",
        }}
      >
        <div className="card-body">
          <div className="row  mx-auto" style={{ marginBottom: "22px" }}>
            <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{id}</span>
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
            <span className="ml-auto">{low}</span>
          </div>
          <div
            className="row w-90 mx-auto"
            style={{ fontSize: "0.8rem", borderBottom: "1px solid #5f5f5f" }}
          >
            <span className="pt-1 pb-1"> Daily High:</span>
            <span className="ml-auto pt-1">{high}</span>
          </div>
          <div className="row w-90 mx-auto" style={{ fontSize: "0.8rem" }}>
            {" "}
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
            >
              <strong>
                <i className="fas fa-trash"></i>
              </strong>
            </span>
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
              </span>
            </Link>
            <span className="ml-auto pt-3">
              <strong style={{ fontSize: "1.2rem" }}>$ {price}</strong>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WatchlistItem;
