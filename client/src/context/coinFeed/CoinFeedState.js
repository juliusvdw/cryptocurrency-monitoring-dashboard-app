import React, { useReducer } from "react";
import axios from "axios";

import CoinFeedContext from "./coinFeedContext";
import CoinFeedReducer from "./coinFeedReducer";

import { SET_COIN_ARTICLES } from "../Types";

const CoinFeedState = (props) => {
  const initialState = {
    news: null,
    stats: null,
    statsLoading: false,
    newsLoading: false,
  };

  const [state, dispatch] = useReducer(CoinFeedReducer, initialState);

  const getCoinFeed = async (id) => {
    try {
      const res = await axios.get(
        `https://cryptocontrol.io/api/v1/public/news/coin/${id}?latest=true&key=eaab98db0c6387dda93def19b44f3035`
      );

      const articles = res.data.slice(0, 11);

      dispatch({ type: SET_COIN_ARTICLES, payload: articles });
    } catch (err) {
      console.log(err);
    }
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
