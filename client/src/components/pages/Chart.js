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
    <>
      <div className="d-none d-md-block w-100" style={{ paddingLeft: "65px" }}>
        <TradingViewWidget
          symbol={coin}
          theme={Themes.DARK}
          locale="en"
          autosize
        />
      </div>

      <div className="d-md-none w-100">
        <TradingViewWidget
          symbol={coin}
          theme={Themes.DARK}
          locale="en"
          autosize
        />
      </div>
    </>
  );
};

export default Chart;
