import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import AutchContext from "../../context/auth/authContext";
import CoinFeedContext from "../../context/coinFeed/coinFeedContext";

const CoinPage = (props) => {
  const authContext = useContext(AutchContext);
  const coinFeedContext = useContext(CoinFeedContext);

  const { user, getUser } = authContext;
  const { getCoinFeed } = coinFeedContext;

  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      getUser();
    }

    getCoinFeed(props.match.params.id);
  }, []);

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
        This is the {`${props.match.params.id}`} Page
      </div>
    </div>
  );
};

export default CoinPage;
