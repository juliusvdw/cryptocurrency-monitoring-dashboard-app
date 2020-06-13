import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import AutchContext from "../../context/auth/authContext";

const CoinPage = (props) => {
  const authContext = useContext(AutchContext);

  const { user, getUser } = authContext;

  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      getUser();
    }
  }, []);

  return (
    <div
      className="container-fluid pl-4 pr-4  w-100 h-90"
      id="home-container"
      style={{ marginTop: "35px", overflowY: "auto" }}
    >
      This is the {`${props.match.params.id}`} Page
    </div>
  );
};

export default CoinPage;
