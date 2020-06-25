import React, { useEffect, useContext } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import AuthContext from "../../context/auth/authContext";

const Chart = (props) => {
  const authContext = useContext(AuthContext);

  const { user, getUser } = authContext;

  useEffect(() => {
    if (user === null) {
      getUser();
    }
  }, []);

  //determine which chart to display based on url params
  let coin;
  props.match.params.coin === "default"
    ? (coin = "BTCUSD")
    : (coin = props.match.params.coin);

  return (
    <TradingViewWidget symbol={coin} theme={Themes.DARK} locale="en" autosize />
  );
};

export default Chart;
