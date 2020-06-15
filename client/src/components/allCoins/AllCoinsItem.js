import React, { useContext } from "react";
import { Link } from "react-router-dom";

import WatchlistContext from "../../context/watchlist/watchlistContext";

const AllCoinsItem = (props) => {
  const watchlistContext = useContext(WatchlistContext);

  const { watchlistAdd } = watchlistContext;
  const {
    id,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    image,
    symbol,
  } = props.coin;

  return (
    <div
      className="row w-100 pt-3"
      style={{ minHeight: "60px", borderBottom: "1px solid #555555" }}
    >
      <div className="col-lg-3 col-md-4 d-flex flex-row">
        <img
          className=" img-fluid "
          src={`${image}`}
          style={{ height: "25px", width: "25px" }}
        />
        <span className="pl-4">
          <Link
            className="coin-link"
            to={`coin/${id}`}
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            {id.replace(id.charAt(0), id.charAt(0).toUpperCase())}{" "}
          </Link>
        </span>
      </div>

      <div className="col-lg-2 col-md-3">$ {current_price}</div>

      <div
        className="col-lg-1 col-md-2"
        style={{
          color: price_change_percentage_24h > 0 ? "lightgreen" : "#F14848",
        }}
      >
        {price_change_percentage_24h && price_change_percentage_24h < 0
          ? String(price_change_percentage_24h).slice(1, 5)
          : String(price_change_percentage_24h).slice(0, 4)}{" "}
        %
      </div>

      <div className="col-lg-3 col-md-3 d-none d-lg-block">
        $ {total_volume}
      </div>

      <div className="col-lg-2 col-md-2 d-none d-lg-block">$ {market_cap}</div>

      <div className="col-lg-1 col-md-2">
        <span onClick={() => watchlistAdd(id)}>+</span>
      </div>
    </div>
  );
};

export default AllCoinsItem;
