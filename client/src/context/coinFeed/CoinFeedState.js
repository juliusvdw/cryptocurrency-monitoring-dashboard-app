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
      //fetch statistics and info for current coin
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const stats = await res.data;
      console.log(stats);

      dispatch({ type: SET_COIN_STATS, payload: stats });
      clearLoading();
    } catch (err) {
      console.log(err.message);
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
