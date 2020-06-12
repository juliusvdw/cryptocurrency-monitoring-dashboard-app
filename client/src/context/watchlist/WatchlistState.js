import React, { useReducer } from "react";
import axios from "axios";

import WatchlistContext from "./watchlistContext";
import WatchlistReducer from "./watchlistReducer";
import {
  GET_WATCHLIST_COINS,
  SET_COIN_DATA,
  SET_CRYPTOS,
  SET_LOADING,
  CLEAR_LOADING,
} from "../Types";
import watchlistContext from "./watchlistContext";

const WatchlistState = (props) => {
  const initialState = {
    loading: null,
    cryptos: [],
    watchlistCoins: [
      { id: "ethereum" },
      { id: "bitcoin" },
      { id: "ripple" },
      { id: "wanchain" },
      { id: "nem" },
      { id: "dogecoin" },
    ],
  };

  const [state, dispatch] = useReducer(WatchlistReducer, initialState);

  //fetch data for each coin when loading watchlist from coingecko
  const getCoin = async (coin) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}`
      );
      const data = res.data.market_data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const setCryptos = async () => {
    setLoading();
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250`
      );
      const data = res.data;

      dispatch({ type: SET_CRYPTOS, payload: data });
    } catch (err) {
      console.log(err);
    }

    clearLoading();
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearLoading = () => {
    dispatch({ type: "CLEAR_LOADING" });
  };

  return (
    <WatchlistContext.Provider
      value={{
        loading: state.loading,
        watchlistCoins: state.watchlistCoins,
        cryptos: state.cryptos,
        getCoin,
        setCryptos,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistState;
