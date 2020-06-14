import React, { Fragment, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import WatchList from "../watchlist/Watchlist";
import TopMovers from "../TopMovers";
import News from "../news/News";

import WatchlistContext from "../../context/watchlist/watchlistContext";
import NewsContext from "../../context/news/newsContext";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const watchlistContext = useContext(WatchlistContext);
  const newsContext = useContext(NewsContext);
  const authContext = useContext(AuthContext);

  const { setCryptos, loading, getWatchlist } = watchlistContext;
  const { getNews, newsLoading } = newsContext;
  const { getUser, user } = authContext;

  //fetch all crypto prices and add to state with useEffect
  useEffect(() => {
    if (user === null) {
      getUser();
    }

    getWatchlist();
    setCryptos();
    getNews();
  }, []);

  return (
    <Fragment>
      <div
        className="container-fluid pl-4 pr-4  w-100 h-90"
        id="home-container"
        style={{ marginTop: "35px", overflowY: "auto" }}
      >
        <div
          className="text-white d-none d-md-block"
          style={{ paddingLeft: "30px", paddingRight: "40px" }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
            <i className="fas fa-money-check-alt"></i>
          </span>
          <span className="mb-4" style={{ fontSize: "1.5rem" }}>
            <strong>Watchlist</strong>
          </span>
          <WatchList />
        </div>
        <div className="text-white  d-md-none" style={{ paddingRight: "40px" }}>
          <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
            <i className="fas fa-money-check-alt"></i>
          </span>
          <span className="mb-4" style={{ fontSize: "1.5rem" }}>
            <strong>Watchlist</strong>
          </span>
          <WatchList />
        </div>

        <div
          className="text-white d-none d-md-block"
          style={{
            paddingLeft: "30px",
            paddingRight: "40px",
            marginTop: "25px",
          }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
            <i className="far fa-arrow-alt-circle-up"></i>
          </span>
          <span className="mb-4" style={{ fontSize: "1.5rem" }}>
            <strong>Top Movers</strong>
          </span>
          <TopMovers />
        </div>
        <div className="text-white  d-md-none" style={{ paddingRight: "40px" }}>
          <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
            <i className="far fa-arrow-alt-circle-up"></i>
          </span>
          <span className="mb-4" style={{ fontSize: "1.5rem" }}>
            <strong>Top Movers</strong>
          </span>
          <TopMovers />
        </div>

        <div
          className="text-white d-none d-md-block"
          style={{
            paddingLeft: "30px",
            paddingRight: "40px",
            marginTop: "30px",
          }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
            <i className="far fa-newspaper"></i>
          </span>
          <span className="mb-4 " style={{ fontSize: "1.5rem" }}>
            <span>
              <strong>Latest News</strong>
            </span>
            <p style={{ fontSize: "0.8rem", marginLeft: "55px" }}>
              <Link to="/news"> View all news</Link>
            </p>
          </span>
          <News />
        </div>
        <div className="text-white  d-md-none" style={{ paddingRight: "40px" }}>
          <span style={{ fontSize: "1.5rem", marginRight: "20px" }}>
            <i className="far fa-newspaper"></i>
          </span>
          <span className="mb-4" style={{ fontSize: "1.5rem" }}>
            <strong>Latest News</strong>
          </span>
          <News />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
