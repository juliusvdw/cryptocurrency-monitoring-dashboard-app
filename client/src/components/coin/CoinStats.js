import React, { useContext } from "react";

import CoinFeedContext from "../../context/coinFeed/coinFeedContext";

const CoinStats = () => {
  const coinFeedContext = useContext(CoinFeedContext);
  const { news } = coinFeedContext;

  return <div className="jumbotron"></div>;
};

export default CoinStats;
