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
  WATCHLIST_ADD,
  WATCHLIST_DELETE,
} from "../Types";
import watchlistContext from "./watchlistContext";

const WatchlistState = (props) => {
  const initialState = {
    loading: null,
    cryptos: [],
    watchlist: [
      { id: "bitcoin" },
      { id: "ethereum" },
      { id: "tether" },
      { id: "ripple" },
      { id: "litecoin" },
      { id: "dash" },
      { id: "eos" },
      { id: "cardano" },
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

  const getWatchlist = async () => {
    try {
      const res = await axios.get("/watchlist");

      
      const watchlist = await res.data.watchlist;
      console.log(watchlist);
      dispatch({ type: GET_WATCHLIST_COINS, payload: watchlist });
    } catch (err) {
      console.log(err);
    }
  };

  const setCryptos = async (loadingID) => {
    setLoading(loadingID);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250`
      );
      const data = await res.data;

      dispatch({ type: SET_CRYPTOS, payload: data });
    } catch (err) {
      console.log(err);
    }
      setTimeout(() => {
        clearLoading()
      }, 1000);
    ;
  };

  const watchlistAdd = async (id) => {
    try {
      const res = await axios({
        method: "put",
        data: { coinId: id },
        url: "/watchlist",
      });
      const watchlist = await res.data.watchlist;

      dispatch({ type: WATCHLIST_ADD, payload: watchlist });
    } catch (err) {
      console.log(err);
    }
  };

  const watchlistDelete = async (id) => {
    try {
      const res = await axios({
        method: "delete",
        data: { coinId: id },
        url: "/watchlist",
      });
      const watchlist = await res.data.watchlist;

      id = id.toLowerCase();

      dispatch({ type: WATCHLIST_DELETE, payload: id });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const setLoading = (loadingID) => {
    dispatch({ type: "SET_LOADING",payload:loadingID });
  };

  const clearLoading = () => {
    dispatch({ type: "CLEAR_LOADING" });
  };

  return (
    <WatchlistContext.Provider
      value={{
        loading: state.loading,
        watchlist: state.watchlist,
        cryptos: state.cryptos,
        getCoin,
        setCryptos,
        getWatchlist,
        watchlistAdd,
        watchlistDelete,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistState;
