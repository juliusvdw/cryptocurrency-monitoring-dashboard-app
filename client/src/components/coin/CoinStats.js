import React, { useContext } from "react";

import CoinFeedContext from "../../context/coinFeed/coinFeedContext";

const CoinStats = () => {
  const coinFeedContext = useContext(CoinFeedContext);
  const { stats } = coinFeedContext;

  //Declare output var to store what will be output
  let output;

  //Determine wheter the news or loading will be displayed based on the state of news
  if (!stats) {
    output = (
      <div className="row " style={{ marginTop: "80px", height: "200px" }}>
        <div
          className="spinner-border text-primary mx-auto"
          role="status"
          style={{ width: "3.5rem", height: "3.5rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    const { market_data } = stats;
    const {
      market_cap,
      ath,
      total_volume,
      high_24h,
      low_24h,
      atl,
      market_cap_rank,
    } = market_data;
    output = (
      <>
        <div className="row" style={rowStyle}>
          <div className="col">
            <p>Market Cap Rank</p>
          </div>
          <div className="col mx-auto text-center">
            <p className>
              <strong># {market_cap_rank}</strong>
            </p>
          </div>
        </div>

        <div className="row pt-3" style={rowStyle}>
          <div className="col">
            <p>Market Cap </p>
          </div>
          <div className="col mx-auto text-center">
            <p className>
              <strong>$ {market_cap.usd}</strong>
            </p>
          </div>
        </div>

        <div className="row pt-3" style={rowStyle}>
          <div className="col">
            <p>24H Low</p>
          </div>
          <div className="col mx-auto text-center">
            <p className>
              <strong>$ {low_24h.usd}</strong>
            </p>
          </div>
        </div>

        <div className="row pt-3" style={rowStyle}>
          <div className="col">
            <p>24H High</p>
          </div>
          <div className="col mx-auto text-center">
            <p className>
              <strong>$ {high_24h.usd}</strong>
            </p>
          </div>
        </div>

        <div className="row pt-3" style={rowStyle}>
          <div className="col">
            <p>All Time High</p>
          </div>
          <div className="col mx-auto text-center">
            <p className>
              <strong>$ {ath.usd}</strong>
            </p>
          </div>
        </div>

        <div className="row pt-3" style={rowStyle}>
          <div className="col">
            <p>All Time Low</p>
          </div>
          <div className="col mx-auto text-center">
            <p className>
              <strong>$ {atl.usd}</strong>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className="jumbotron pt-4 pb-4 "
      style={{ backgroundColor: "#2D2D2D" }}
    >
      {output}
    </div>
  );
};

const rowStyle = {
  borderBottom: "1px solid #555555",
};

export default CoinStats;
