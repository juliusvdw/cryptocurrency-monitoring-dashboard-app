import React, { useEffect, useContext } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import AuthContext from "../../context/auth/authContext";

const Chart = (props) => {
  const authContext = useContext(AuthContext);

  const { user, getUser } = authContext;



  //determine which chart to display based on url params
  let coin;
  props.match.params.coin === "default"
    ? (coin = "BTCUSD")
    : (coin = props.match.params.coin);

  return (
    <>
      <div style = {containerStyle}>
        <TradingViewWidget
          symbol={coin}
          theme={Themes.LIGHT}
          locale="en"
          autosize
        />
      </div>

      
    </>
  );
};

const containerStyle = {
  height:'calc(100vh - 85px)',
  width:'97%',
  margin: ' 15px auto'
}

export default Chart;
