import React, { useEffect, useContext } from "react";

import News from "../news/News";

import NewsContext from "../../context/news/newsContext";
import WatchlistContext from "../../context/watchlist/watchlistContext";
import AuthContext from "../../context/auth/authContext";

const NewsPage = () => {
  const newsContext = useContext(NewsContext);
  const watchlistContext = useContext(WatchlistContext);
  const authContext = useContext(AuthContext);

  const { getNews } = newsContext;
  const { cryptos, setCryptos, loading } = watchlistContext;
  const { user, getUser } = authContext;

  useEffect(() => {
    if (user === null) {
      getUser();
    }
    if (cryptos.length < 1) {
      setCryptos();
    }
    getNews();
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
          paddingLeft: "85px",
          paddingRight: "40px",
          marginTop: "30px",
        }}
      >
        <span style={{ fontSize: "1.7rem", marginRight: "20px" }}>
          <i className="far fa-newspaper"></i>
        </span>
        <span className="mb-4" style={{ fontSize: "1.8rem" }}>
          <strong>Latest News</strong>
        </span>
        <News />
      </div>
      <div className="text-white  d-md-none" style={{ paddingRight: "40px" }}>
        <span style={{ fontSize: "1.7rem", marginRight: "20px" }}>
          <i className="far fa-newspaper"></i>
        </span>
        <span className="mb-4" style={{ fontSize: "1.8rem" }}>
          <strong>Latest News</strong>
        </span>
        <News />
      </div>
    </div>
  );
};

export default NewsPage;
