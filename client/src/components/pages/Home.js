import React, { Fragment, useEffect, useContext, useState } from "react";

import { Link } from "react-router-dom";

import WatchList from "../watchlist/Watchlist";
import TopMovers from "../TopMovers";
import News from "../news/News";

import WatchlistContext from "../../context/watchlist/watchlistContext";
import NewsContext from "../../context/news/newsContext";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const [watchlistAlert, setWatchlistAlert] = useState("block");

  const watchlistContext = useContext(WatchlistContext);
  const newsContext = useContext(NewsContext);
  const authContext = useContext(AuthContext);

  const { setCryptos, loading, getWatchlist } = watchlistContext;
  const { getNews, newsLoading } = newsContext;
  const { getUser, user } = authContext;

  //fetch all crypto prices and add to state with useEffect
  //Fetch user on page load
  useEffect(() => {
    if (user === null) {
      getUser();
    }
    getWatchlist();
    setCryptos();
    getNews();
  }, []);

  return (
    <>
      
    </>
  );
};

export default Home;
