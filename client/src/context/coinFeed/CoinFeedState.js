import React, { useReducer } from "react";
import axios from "axios";

import CoinFeedContext from "./coinFeedContext";
import CoinFeedReducer from "./coinFeedReducer";

import {
  SET_COIN_ARTICLES,
  SET_COIN_STATS,
  SET_LOADING,
  CLEAR_LOADING,
} from "../Types";

const CoinFeedState = (props) => {
  const initialState = {
    news: null,
    stats: null,
    statsLoading: false,
    newsLoading: false,
  };

  const [state, dispatch] = useReducer(CoinFeedReducer, initialState);

  const getCoinFeed = async (id) => {
    setLoading();
    try {
      //fetch news articles for coin
      const newsRes = await axios.get(
        `https://cryptocontrol.io/api/v1/public/news/coin/${id}?latest=true&key=eaab98db0c6387dda93def19b44f3035`
      );
      //fetch statistics and info for current coin
      const statsRes = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );

      const articles = await newsRes.data.slice(0, 11);
      const stats = await statsRes.data;

      dispatch({ type: SET_COIN_ARTICLES, payload: articles });
      dispatch({ type: SET_COIN_STATS, payload: stats });
      clearLoading();
    } catch (err) {
      console.log(err);
    }
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const clearLoading = () => {
    dispatch({ type: CLEAR_LOADING });
  };

  return (
    <CoinFeedContext.Provider
      value={{
        news: state.news,
        stats: state.stats,
        newsLoading: state.newsLoading,
        statsLoading: state.statsLoading,
        getCoinFeed,
      }}
    >
      {props.children}
    </CoinFeedContext.Provider>
  );
};

export default CoinFeedState;
