import React, { useReducer, useEffect } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import {collection, doc, getDoc} from 'firebase/firestore'
import { auth, firestore } from "../../config/firebaseConfig";

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
  CLEAR_WATCHLIST_COINS,
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

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log(user)
        //Find user watchlist when user is logged in and set to watchlist state        
        const docRef = doc(firestore, "users", `${user.uid}`);
        const docSnap = await getDoc(docRef);
        const userData= docSnap.data()

        console.log(userData)

        dispatch({ type: GET_WATCHLIST_COINS, payload: userData.watchlist });

       

      } else {
        dispatch({type:CLEAR_WATCHLIST_COINS})
      }
    })
  }, [])

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


  const setCryptos = async (loadingID) => {
    setLoading(loadingID);
    try {
      const res1 = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250`
      );
      const res2 = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false'        );
      const data1 = await res1.data;
      const data2 = await res2.data;

      const data = [...data1, ...data2]

      console.log(data)

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
        watchlistAdd,
        watchlistDelete,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistState;
