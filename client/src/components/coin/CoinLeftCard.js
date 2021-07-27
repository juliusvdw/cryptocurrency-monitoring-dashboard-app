import React, { useContext } from "react";

import CoinFeedContext from "../../context/coinFeed/coinFeedContext";

const CoinStats = () => {

  //Bring in coin stats from coinfeed context
  const coinFeedContext = useContext(CoinFeedContext);
  const { stats } = coinFeedContext;

  //Declare output var to store what will be output
  let statsOutput;

  //Determine wheter the stats or loading will be displayed based on the state of coin stats
  if (!stats) {
    statsOutput = (
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

    //Destructure coin data from stats context for easier access
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

    //Output content if coin stats have loaded
    statsOutput = (
      <>
        
      </>
    );
  }

  return (
    <div>
      {statsOutput}
    </div>
  );
};



export default CoinStats;
