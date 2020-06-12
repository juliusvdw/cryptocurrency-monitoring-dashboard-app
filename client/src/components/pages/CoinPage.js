import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CoinPage = (props) => {
  const location = useLocation();

  console.log(props.match.params.id);

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
