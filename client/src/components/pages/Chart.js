import React, { useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const Chart = (props) => {
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
